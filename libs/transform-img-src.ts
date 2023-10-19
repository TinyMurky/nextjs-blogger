import { visit } from 'unist-util-visit'
import { removeCwdUrl } from './removeRepeatUrl'

export default function transformImgSrc(fileFolder:string) {
  fileFolder = removeCwdUrl(fileFolder)
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