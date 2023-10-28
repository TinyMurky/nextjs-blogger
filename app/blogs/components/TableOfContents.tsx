'use client'
// ref: https://easonchang.com/posts/post-side-toc
import { useEffect, useRef, useState } from 'react'
import clsx from "clsx";
import GithubSlugger from "github-slugger";

// 以下function裡面包了一個callback, callback吃一個setActiveId 為string 的arg
type UseIntersectionObserverType = (setActiveId:(id: string) => void) => void

const useIntersectionObserver:UseIntersectionObserverType = (setActiveId) => {
  // 以下為一個ref, 內容是一個空的object{}, object的key是string, value是IntersectionObserverEntry
  // IntersectionObserverEntry是所有被觀察是否進入螢幕畫面的被觀察element產生的物件
  const headingEntrysRef = useRef<{
    [key: string]: IntersectionObserverEntry
  }>({})

  // setActiveId變動時驅動useEffect, 防止使用ActiveId的無窮迴圈
  //監視 setActiveId 表明，只要這個函數存在（它始終存在）且不變，則 useEffect 便可以正常工作。
  // 所以是call一次一直執行
  useEffect(()=>{

    // 抓出所有的h2 h3 h4標題
    const headingElements = Array.from(
      document.querySelectorAll("article h2, h3")
    )

    // IntersectionObserver 會將觀察element轉成 IntersectionObserverEntry[]放入以下callbac處理
    // 雖然element可能逐個加入，但是Observer會一次看所有已加入的Element, 看他們是不是有進入畫面
    // 在被觀察物件產生變化時，callback會再被呼叫一次
    const callbackForObserver = (headings: IntersectionObserverEntry[]) => {

      // setActiveId更
      headingEntrysRef.current = headings.reduce((map, headingElementEntry) => {

        map[headingElementEntry.target.id] = headingElementEntry

        return map // map就是headingEntrysRef.current
      }, headingEntrysRef.current)

      // 用來選出目前要高亮目錄中的哪一項
      const visibleHeadings: IntersectionObserverEntry[] = []

      // 在現在所有被監聽的物件，將進入螢幕畫面的放入visibleHeading
      Object.keys(headingEntrysRef.current).forEach((key) => {
        const headingElement = headingEntrysRef.current[key]

        if (headingElement.isIntersecting) {
          visibleHeadings.push(headingElement)
        }

      })


      // 取出id，要sort哪個header在畫面最上面
      const getIndexFromId = (id: string) => {
        return headingElements.findIndex((heading) => heading.id === id)
      }

      // 在畫面最上方的要高亮
      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(b.target.id) - getIndexFromId(a.target.id)
        )
        setActiveId(sortedVisibleHeadings[0].target.id)
      }
    
    }// callbackForObsever結束

    // 建立新的observer
    const observer = new IntersectionObserver(callbackForObserver, {
      rootMargin: "0px 0px -70% 0px",
    })

    headingElements.forEach((element) => observer.observe(element))// 全部丟進去observe

    return () => observer.disconnect() // useEffect結束後刪除observer

  }, [setActiveId])
}
type Props = {
  rawBody: string
}

export default function TableOfContents({ rawBody }: Props) {
  // 從Blog json的body. raw物件，藉由mark down 的 ## 來抓 內文標題
  // /^###*?\s/ 表示開頭要是 ##, 後面可以接上無限或0個# (#*的意思) 並延到尾部後，再接一個空白\s
  // 所以是 ## 開始，也就是h2
  const headingLines = rawBody
    .split("\n")
    .filter((line) => line.match(/^###*?\s/))
  
  const headings = headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, "") // 去除前面的井號與空白

    // 用第一個空白找出是多少level
    const level:number = raw.match(/(\s|\u3000)/)?.index || 2 //找到第一個空白

    const slugger = new GithubSlugger()
    return {
      text,
      level,
      id: slugger.slug(text),
    }
  })

  const [activeId, setActiveId] = useState<string>()

  useIntersectionObserver(setActiveId)
  return (
    <div className="mt-10">
      <p className="mb-5 text-lg font-semibold  transition-colors text-gray-200">
        目錄
      </p>
      <div className="flex flex-col items-start justify-start">
        {headings
          .filter(heading => heading.level <= 3)
          .map((heading, index) => {
            const padding = `pl-${(heading.level-2)* 4}`
            return (
              <button
                key={index}
                type="button"
                className={clsx(
                  padding,
                  heading.id === activeId
                    ? "font-medium text-sky-400  hover:text-sky-300"
                    : "font-normal  text-gray-400 hover:text-gray-200",
                  "mb-3 text-left text-sm transition-colors hover:underline"
                )}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(`#${heading.id}`)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                  });
                }}
              >
                {heading.text}
              </button>
            )
        })}

        <button
          type="button"
          className={clsx(
            "mt-2 text-left text-base font-semibold transition-colors text-gray-200  hover:text-gray-100  hover:underline"
          )}
          onClick={(e) => {
            e.preventDefault()
            document.querySelector(`#留言`)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            })
          }}
        >
          前往留言區
        </button>
        
      </div>
    </div>
  )
}