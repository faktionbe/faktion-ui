# Microsoft SSO

## Installation

The recipe includes 3 files:

- **microsoft.strategy.ts:** when the microsoft.guard is hit when accessing an endpoint, the microsoft.strategy is used to authorize & authenticate a user.
- **microsoft.guard.ts:** hit by an endpoint. If unauthorized, this will trigger the microsoft.strategy and redirects a user to the microsoft login page.
- **microsoft.dto.ts:** TS types

## Usage

When all files are pulled from the registry, you still need to 'apply' them. This happens in your `auth.controller`, if you're using the faktion-kickstarter.

Snippet of changes you need to apply:

### auth.controller

```ts
export class AuthController {
...
  @Get('microsoft')
  @UseGuards(MicrosoftGuard)
  @ApiOperation({
    operationId: 'microsoftAuth',
    summary: 'Initiate Microsoft OAuth authentication',
  })
  async microsoftAuth() {
    // The guard will handle the redirect to Microsoft
  }

  @Get('microsoft/callback')
  @UseGuards(MicrosoftGuard)
  @ApiOperation({
    operationId: 'microsoftCallback',
    summary: 'Handle Microsoft OAuth callback',
  })
  async microsoftCallback(@Res() res: Response, @User() user: IUser) {
    this.authService.redirect(user, res);
  }
...
}
```

### auth.service

```ts
export class AuthService {
...
    redirect(user: IUser, response: express.Response) {
        const result = this.login(user);

        const frontendUrl = this.configService.getOrThrow(ServerEnv.FRONTEND_URL);
        const redirectUrl = `${frontendUrl}/auth/login?token=${result.access_token}`;

        response.redirect(redirectUrl);
    }
...
}

```

### Environment variables

- Expand the `.env.example`:

```
# Microsoft entra
MICROSOFT_AUTHORITY_URL=https://login.microsoftonline.com
MICROSOFT_GRAPH_URL=https://graph.microsoft.com
MICROSOFT_CLIENT_ID=*** # received when registering the application on Entra
MICROSOFT_CLIENT_SECRET=*** # received when registering the application on Entra
MICROSOFT_TENANT_ID=*** # received when registering the application on Entra
```

- Expand the `ServerEnv` enum in the shared packages with the variables above
