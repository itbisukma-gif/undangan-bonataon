import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Abaikan route internal Next.js & file static
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname === '/' ||
    pathname === '/invitation'
  ) {
    return NextResponse.next();
  }

  // Ambil slug: /andi-wijaya → andi-wijaya
  const slug = pathname.replace('/', '');

  const url = request.nextUrl.clone();
  url.pathname = '/invitation';
  url.searchParams.set('to', slug);

  return NextResponse.rewrite(url);
}
