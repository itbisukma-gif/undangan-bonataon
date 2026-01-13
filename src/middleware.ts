import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Abaikan route internal Next.js, file aset, dan route yang sudah ada
  const isIgnoredPath =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\..*$/.test(pathname) || // Abaikan semua path yang mengandung titik (ekstensi file)
    pathname === '/' ||
    pathname === '/invitation';

  if (isIgnoredPath) {
    return NextResponse.next();
  }

  // Ambil slug: /andi-wijaya → andi-wijaya
  const slug = pathname.substring(1); // Menghapus '/' di awal

  if (slug) {
    const url = request.nextUrl.clone();
    url.pathname = '/invitation';
    url.searchParams.set('to', slug);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Jalankan middleware untuk semua request kecuali yang cocok dengan regex ini
  // Ini adalah optimasi agar middleware tidak berjalan pada file aset statis
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
