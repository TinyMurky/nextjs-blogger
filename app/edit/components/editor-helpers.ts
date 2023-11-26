import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import  DOMPurify from 'dompurify' // 防止xss

// import type { EditorView } from 'codemirror'
import Swal from 'sweetalert2'
export function createCheckMousePosition (setter:(value: React.SetStateAction<boolean>) => void) {
  return (e: MouseEvent) => {
      const { clientX, clientY } = e
      const thresholdY = 400 
      const thresholdX = 3000 
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
  const cleanDoc = DOMPurify.sanitize(doc,  { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] }) // 防止XSS
  const res = await fetch(`/api/blogs/${blogName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cleanDoc)
  })

  if (!res.ok){
    Swal.fire({
      title: 'Blog saving has failed!',
      icon: 'error',
      confirmButtonText: 'So Sadge :('
    })
    return
  }

  const { message } = await res.json()
  Swal.fire({
    title: message,
    icon: 'info',
    confirmButtonText: 'OK'
  })

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


