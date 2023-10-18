import { visit } from 'unist-util-visit'
import path from 'path';

// 用substring直接切掉cwd的長度(加public)
// 因為圖片要從public拿
// 會只能要從/public直接向下
function removeOverlap(targetPath:string) {
    const cwd = path.join(process.cwd(), 'public')
    if (targetPath.startsWith(cwd)) {
        return targetPath.substring(cwd.length)
    }
    return targetPath;
}

export default function transformImgSrc(fileFolder:string) {
  fileFolder = removeOverlap(fileFolder)
  return function () { // 閉包, 讓我可以先傳一個值給transformImgSrc, 再丟給pipline
    return (tree: any) => {
      // 找到paragraph => 找到 image => 把usl 換成public 向下的 blog
      visit(tree, 'paragraph', node => {
        const image = node.children.find((child: { type: string}) => child.type === 'image')

        if (image) {
          const fileName = image.url.replace('./', '')
          image.url = `${fileFolder}/${fileName}`
        }
      })
    }
  }
}