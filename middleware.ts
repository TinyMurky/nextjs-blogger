import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
// Without a defined matcher, this one line applies next-auth 
// to the entire project
export { default } from "next-auth/middleware"

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// 只擋住blog的編輯中頁面
// edit只有playground不用登入
export const config = {
  matcher: [
    "/blogs/edit/:path*",
    '/edit/insight/:path*',
    '/edit/edit/:path*',
    '/edit/tech/:path*',] }


// 任何未登入都導回root

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });
	if (!token && process.env.NEXTAUTH_URL) {
		return NextResponse.redirect(process.env.NEXTAUTH_URL);
  }
}	