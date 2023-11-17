import Swal from 'sweetalert2'
export default async function copyToClipBoard(text: string) {
  // https://philstainer.io/blog/copy-code-button-markdown
  // https://easonchang.com/posts/code-copy-button
  try{
    if (!navigator?.clipboard){
      Swal.fire({
        title: 'Blog saving has failed!',
        icon: 'error',
        confirmButtonText: 'So Sadge'
      })
    }
    // 寫進clipboard, navigator.clipboard是一個promise
    text = removeDuplicateNewLine(text)
    await navigator.clipboard.writeText(text)
  }catch(error){
      throw error
  }
}

// Workaround to work with rehype-prism-plus generated Pre blog for copy to clipboard feature
export const removeDuplicateNewLine = (text: string): string => {
  if (!text) return text
  // g不只找一個, m 代表每一行文字都是一組字首字尾
  return text
    .replace(/(\r\n\r\n)/gm, `\r\n`)
    .replace(/(\n\n)/gm, `\n`)
    .replace(/(\r\r)/gm, `\r`)
}
