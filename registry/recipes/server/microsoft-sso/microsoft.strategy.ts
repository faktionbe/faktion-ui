import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { logger } from '@repo/logger';
import { ServerEnv } from '@repo/shared';
import { Strategy } from 'passport-oauth2';

import type { MicrosoftProfile } from '@/modules/auth/models/microsoft.dto';
import { IUser } from '@/modules/common/decorators/user.decorator';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { encrypt } from '@/utils/encrypt';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'microsoft') {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService
  ) {
    super({
      tokenURL: `${configService.getOrThrow(ServerEnv.MICROSOFT_AUTHORITY_URL)}/${configService.getOrThrow(ServerEnv.MICROSOFT_TENANT_ID)}/oauth2/v2.0/token`,
      authorizationURL: `${configService.getOrThrow(ServerEnv.MICROSOFT_AUTHORITY_URL)}/${configService.getOrThrow(ServerEnv.MICROSOFT_TENANT_ID)}/oauth2/v2.0/authorize?prompt=select_account`,
      clientID: configService.getOrThrow(ServerEnv.MICROSOFT_CLIENT_ID),
      clientSecret: configService.getOrThrow(ServerEnv.MICROSOFT_CLIENT_SECRET),
      callbackURL: `${configService.getOrThrow(ServerEnv.BACKEND_URL)}/api/auth/microsoft/callback`,
      scope: ['User.Read', 'openid', 'profile'],
    });
  }
  async validate(accessToken: string): Promise<IUser> {
    try {
      const response = await this.httpService.axiosRef
        .get<MicrosoftProfile>(
          `${this.configService.getOrThrow(ServerEnv.MICROSOFT_GRAPH_URL)}/v1.0/me`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .catch(() => {
          throw new Error('Error contacting Microsoft Graph API');
        });

      const userProfile = response.data;

      const email = (
        userProfile.mail ?? userProfile.userPrincipalName
      ).toLowerCase();

      if (!email) {
        throw new Error('No email found in Microsoft profile');
      }

      const firstName = userProfile.givenName || 'Unknown';
      const lastName = userProfile.surname || 'User';
      // TODO: later when token is used, we should do checks on when to refresh the token, expiration date etc.
      const user = await this.prismaService.user
        .upsert({
          where: { email },
          create: {
            email,
            firstName,
            lastName,
            microsoftOAuth: {
              create: {
                accessToken: encrypt(accessToken),
              },
            },
          },
          update: {
            firstName,
            lastName,
            microsoftOAuth: {
              upsert: {
                create: {
                  accessToken: encrypt(accessToken),
                },
                update: {
                  accessToken: encrypt(accessToken),
                },
              },
            },
          },
          include: {
            microsoftOAuth: true,
          },
        })
        .catch(() => {
          throw new Error(`Could not find user with email: ${email}`);
        });

      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      logger.error('Error in Microsoft strategy', { error });
      throw new UnauthorizedException(
        `Error in Microsoft strategy: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
