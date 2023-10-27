// 需要先在rehype rehype-slug plugin
import React from 'react'
import clsx from 'clsx'
import { GoLink } from "react-icons/go"
type Props = React.ComponentPropsWithoutRef< 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' > &
  {Component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"} // props中的component只可以是title

function HeadingWithAncherTag({Component, id ,className, children, ...otherProps}: Props) {
  return (
    //  scroll-mt-20 讓連到anchor tag的時候會往下捲動一點，避免被navbar擋住
    <Component id={id} className={clsx('scroll-mt-20  group flex flex-row gap-3 items-center  justify-start', className)} {...otherProps}>
      <span className=''>{children}</span>
        <a
          href={id && `#${id}`} // 如果id有值的話走後面的 #id 沒有的話就是 id
          className='hidden group-hover:inline-flex text-base   items-center w-8 h-8 dark:text-gray-400 dark:hover:text-gray-200  dark:hover:border-gray-400  dark:border-gray-700 rounded-md border bg-transparent focus:outline-none '
          aria-label="Anchor"
        >
          <GoLink className='mx-auto'/>
        </a>
    </Component>
  )
}

export const AncherTagH1 = (props: React.ComponentPropsWithRef<"h1">) => (
  <HeadingWithAncherTag Component="h1" {...props} />
)
export const AncherTagH2 = (props: React.ComponentPropsWithRef<"h2">) => (
  <HeadingWithAncherTag Component="h2" {...props} />
)
export const AncherTagH3 = (props: React.ComponentPropsWithRef<"h3">) => (
  <HeadingWithAncherTag Component="h3" {...props} />
)
export const AncherTagH4 = (props: React.ComponentPropsWithRef<"h4">) => (
  <HeadingWithAncherTag Component="h4" {...props} />
)
export const AncherTagH5 = (props: React.ComponentPropsWithRef<"h5">) => (
  <HeadingWithAncherTag Component="h5" {...props} />
)
export const AncherTagH6 = (props: React.ComponentPropsWithRef<"h6">) => (
  <HeadingWithAncherTag Component="h6" {...props} />
)