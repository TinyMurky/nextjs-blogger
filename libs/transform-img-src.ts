import { visit } from 'unist-util-visit'
import { removeCwdUrl } from './removeRepeatUrl'

export default function transformImgSrc(fileFolder: string) {
  return (tree: any, file: any) => {
    // 找到img元素，然後更改它的src屬性
    fileFolder = removeCwdUrl(file.path)
    visit(tree, 'element', node => {
      if (node.tagName === 'img') {
        const src = node.properties.src as string
        const fileName = src.replace('./', '')
        node.properties.src = `${fileFolder}/${fileName}`
      }
    })
  }
}
