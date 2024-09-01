import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verifica se o token está presente nos cookies
  const token = request.cookies.get('token')?.value;

  // Se não houver token, redirecione para a página de login
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se o token estiver presente, permite o acesso à rota
  return NextResponse.next();
}

// Defina as rotas que devem usar o middleware
export const config = {
  matcher: ['/inicio/:path*', '/outra-area-protegida/:path*'],
};
