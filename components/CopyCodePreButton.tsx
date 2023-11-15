'use client'
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import { GoCopy, GoCheck } from "react-icons/go"

import copyToClipBoard from '@/libs/copyToClipBoard'

type Props = React.ComponentPropsWithoutRef<"pre">

export default function CopyCodePreButton({children, className, ...props}: Props) {
  const preRef = useRef<HTMLPreElement>(null) // type是Pre的ref
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 800)

    return () => clearTimeout(timer) // 刪掉setTimeout
  }, [copied]) 

  const handleClicked = async () => {
    const codeText = preRef.current?.querySelector('code')?.innerText
    if (codeText){
      // 用ref 抓到pre裡的innerText
      await copyToClipBoard(codeText)
    }
    setCopied(true)
  }

  const classArray:string[] | undefined= className?.split(" ")
  let codeLanguage = 'text'
  if (classArray){
    const languageClass = classArray.filter((cls)=> {
      return cls.startsWith('language-')
      }
    )[0]

    codeLanguage = languageClass.split('-')[1]
  }

  // 最外層的div需要在mt-14上加important，不然有的時候prose會蓋過變成mt-0
  return (
    <div className='group relative !mt-14 block'>
      <pre {...props} ref={preRef} className={clsx(className)}>
        <div className='absolute w-full -top-8 right-0 bg-gray-700 text-base  py-2 ps-4 rounded-t-md'>
          <span className='text-gray-300'>{codeLanguage}</span>
          <div className={
            clsx('absolute top-0 right-1 mt-1 flex gap-2 items-center ',
            {

            })
          }>
            <span className={clsx(
              " text-sm text-green-400 ease-in transition",
              {
                "hidden ":!copied
              }
            )}>
              Copied!
            </span>
            <button onClick={handleClicked} className={clsx(
              "rounded-md border bg-transparent p-2 transition ease-in focus:outline-none flex items-center",
              {
                "hover:border-gray-400  border-gray-700 ":!copied,
                "border-green-400": copied,
              }
            )}>
              <GoCopy className={clsx('ease-in transition text-gray-300',
                  {
                    "hidden": copied
                  }
                )}
              />
              <GoCheck className={clsx("text-green-400 ease-in transition",
                  {
                    "hidden": !copied
                  }
                )}
              />
            </button>
          </div>
        </div>
        {children}
      </pre>
    </div>
  )
}