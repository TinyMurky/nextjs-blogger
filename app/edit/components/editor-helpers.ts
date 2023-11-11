import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
// import type { EditorView } from 'codemirror'
import { EditorView } from 'codemirror'
import type { Transaction } from '@codemirror/state'
export function createCheckMousePosition (setter:(value: React.SetStateAction<boolean>) => void) {
  return (e: MouseEvent) => {
      const { clientX, clientY } = e
      const thresholdY = 400 
      const thresholdX = 1000 
      const nearBottom = window.innerHeight - clientY < thresholdY;
      const nearLeft = clientX < thresholdX
      
      if (nearBottom && nearLeft) {
        setter(true)
      } else {
        setter(false)
      }
    }
  }

export async function saveBlogOnClicked(blogName: string, doc: string, router:AppRouterInstance | null = null,redirectHref: string | null = null) {
  const res = await fetch(`/api/blogs/${blogName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(doc)
  })

  if (!res.ok){
    window.alert('Blog saving has failed!aaaaa')
    return
  }

  const { message } = await res.json()
  window.alert(message)

  if (router && redirectHref) {
    router.prefetch(redirectHref)
    router.push(redirectHref)
  }
  return
}

export function debounce<F extends (...args: any[]) => any>(func: F, wait: number): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function(this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this
    const later = () => {
      timeoutId = null;
      func.apply(context, args)
    }

    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(later, wait)
  } as F
}

// function handleInsertImg (view: EditorView, from: number, to: number, text: string, insert: () => Transaction) {
//   // ref: https://codemirror.net/docs/ref/#view.EditorView^inputHandler
//   console.log({ view, from, to, insert })
//   if (insert === ']') {
//     console.log('] found')
//     if (view.state.doc.sliceString(from - 1, to) === '[') {
//       const tr = view.state.update({
//         changes: [
//           { from, insert: ' ] ' }
//         ]
//       }, {
//         scrollIntoView: true
//       })
//       view.dispatch(tr)
//       return true
//     }
//     return false
//   } else {
//     return false
//   }
// }

