import path from "path"
// 用substring直接切掉cwd的長度(加public)
// 因為圖片要從public拿
// 會只能要從/public直接向下
export function removeCwdUrl(targetPath:string):string {
    const cwd = path.join(process.cwd(), 'public')
    if (targetPath.startsWith(cwd)) {
        return targetPath.substring(cwd.length)
    }
    return targetPath
}

export function replaceDotFolder(originPath:string, currentFolderPath:string) :string {
  if(originPath.startsWith('./')){
    return removeCwdUrl(path.join(currentFolderPath, originPath.slice(1)))
  }else{
    return originPath
  }

}