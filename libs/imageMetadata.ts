// ref https://easonchang.com/posts/post-custom-image
import path from "path";
import { getPlaiceholder } from "plaiceholder"
import { visit } from "unist-util-visit"
// @ts-ignore
import type { Node } from "unist-util-visit"
import fs from "node:fs/promises"
import { removeCwdUrl } from './removeRepeatUrl'
import https from 'https'


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

/**
 * Filters only use relative paths start with './' from the public folder.
 */
function filterRelativeImageNode(node: ImageNode): boolean {
  return node.properties.src.startsWith("./")
}

function downloadImage(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks: Buffer[] = []
      res.on('data', (chunk) => {
        chunks.push(chunk)
      })
      res.on('end', () => {
        const buffer = Buffer.concat(chunks)
        resolve(buffer)
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}

/**
 * Adds the image's `height` and `width` to it's properties.
 */
async function addMetadata(node: ImageNode): Promise<void> {

  let buffer: Buffer
  if (node.properties.src.startsWith('http')){

    buffer = await downloadImage(node.properties.src)

  } else {

    const absoluteNodeSrc = path.join(process.cwd(), "public", node.properties.src)
    buffer = await fs.readFile(absoluteNodeSrc)

  }


  try{

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
        if (filterRelativeImageNode(node)){
          const src = node.properties.src as string
          const fileName = src.replace('./', '')

          node.properties.src = `${removeCwdUrl(file.path)}/${fileName}`
          imgNodes.push(node)
        } else {
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

