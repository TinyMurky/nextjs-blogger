// ref https://easonchang.com/posts/post-custom-image
 // restucture img src and get with and hight
import imageSize from "image-size"
import path from "path";
import { getPlaiceholder } from "plaiceholder"
import { visit } from "unist-util-visit"
// @ts-ignore
import type { Node } from "unist-util-visit"
import { promisify } from "util"
import fs from "node:fs/promises"
import { removeCwdUrl } from './removeRepeatUrl'

//use promise
const sizeOf = promisify(imageSize)

// def image interface
interface ImageNode extends Node {
  type: 'element',
  tagName: 'img',
  properties:{
    src: string,
    height?: number,
    width?: number,
    base64?: string
  }
}

// 如果這個isImageNode回傳true ，型態就可以被限縮在ImageNode (is的效果)
function isImageNode(node: Node): node is ImageNode {
  const img = node as ImageNode // 先手動指定是ImageNode type

  // check ImageNode所有需要的值是不是都有了
  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    img.properties &&
    typeof img.properties.src === 'string'
  )
}

/**
 * Filters out non absolute paths from the public folder.
 */
function filterAbsoluteImageNode(node: ImageNode): boolean {
  return node.properties.src.startsWith("/")
}

/**
 * Filters only use relative paths start with './' from the public folder.
 */
function filterRelativeImageNode(node: ImageNode): boolean {
  return node.properties.src.startsWith("./")
}

/**
 * Adds the image's `height` and `width` to it's properties.
 */
async function addMetadata(node: ImageNode): Promise<void> {

  const absoluteNodeSrc = path.join(process.cwd(), "public", node.properties.src)


  try{
    const buffer = await fs.readFile(absoluteNodeSrc)
    const { metadata: { height, width }, base64 } = await getPlaiceholder(buffer, { size: 10 })// 10 is to increase detail (default is 4)


    node.properties.width = width
    node.properties.height = height
    node.properties.base64 = base64
  }catch(error){
    throw Error(`Invalid image with src "${node.properties.src}"`)
  }
}

export default function imageMetadata() {
  return async function transformer(tree: Node, file:any): Promise<Node> {

    const imgNodes: ImageNode[] = []

    visit(tree, 'element', node => {
      if (isImageNode(node)){
        if (filterAbsoluteImageNode(node)){
          imgNodes.push(node)
        }else if (filterRelativeImageNode(node)){
          const src = node.properties.src as string
          const fileName = src.replace('./', '')

          node.properties.src = `${removeCwdUrl(file.path)}/${fileName}`
          imgNodes.push(node)
        }
      }
    })

    for (const node of imgNodes) {
      await addMetadata(node);
    }

    return tree
  }
}


export function transformImgSrc(fileFolder: string) {
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
