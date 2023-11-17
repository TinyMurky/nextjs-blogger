// Without a defined matcher, this one line applies next-auth 
// to the entire project
export { default } from "next-auth/middleware"

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// 只擋住blog的編輯中頁面
// edit由於沒有用category擋住所以要手動擋
export const config = { matcher: ["/blogs/edit"] }