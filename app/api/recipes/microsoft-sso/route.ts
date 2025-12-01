import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const markdownPath = path.join(
      process.cwd(),
      'registry',
      'recipes',
      'server',
      'microsoft-sso',
      'MICROSOFT-SSO.MD',
    );
    const md = await fs.readFile(markdownPath, 'utf8');
    return new Response(md, {
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
        'cache-control': 's-maxage=300, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load Microsoft SSO recipe.' },
      { status: 500 },
    );
  }
}


