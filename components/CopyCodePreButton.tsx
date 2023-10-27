'use client'
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import { GoCopy, GoCheck } from "react-icons/go"
type Props = React.ComponentPropsWithoutRef<"pre">

export default function CopyCodePreButton({children, className, ...props}: Props) {
  const preRef = useRef<HTMLPreElement>(null) // type是Pre的ref
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000)

    return () => clearTimeout(timer) // 刪掉setTimeout
  }, [copied]) 

  const handleClicked = () => {
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


  return (
    <div className='group relative mt-14'>
      <pre {...props} ref={preRef} className={clsx(className)}>
        <div className='absolute w-full -top-8 right-0 dark:bg-gray-700 bg-opacity-50 text-base  py-2 ps-4 rounded-t-md'>
          {codeLanguage}
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
              "rounded-md border bg-transparent p-2 transition ease-in focus:outline-none flex",
              {
                "dark:hover:border-gray-400  dark:border-gray-700 ":!copied,
                "border-green-400": copied,
              }
            )}>
              <GoCopy className={clsx('ease-in transition',
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