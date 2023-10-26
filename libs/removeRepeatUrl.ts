import path from "path"
// 用substring直接切掉cwd的長度(加public)
// 因為圖片要從public拿
// 會只能要從/public直接向下
export function removeCwdUrl(targetPath:string):string {
    const cwd = path.join(process.cwd(), 'public')
    if (targetPath.startsWith(cwd)) {
        const targetDir = path.dirname(targetPath) //因為回傳path最後會接到一個奇怪的mdxfile所以先刪除
        return targetDir.substring(cwd.length)
    }
    return targetPath
}

export function replaceDotFolder(originPath:string, blogUrl:string) :string {
  // only for List Blog
  if(originPath.startsWith('./')){
    const urlArray = blogUrl.split('/');
    urlArray.pop();
    return path.join('/', ...urlArray, originPath.slice(1))
  }else{
    return originPath
  }

}