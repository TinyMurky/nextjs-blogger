'use client'
import React, { useCallback, useEffect } from 'react'
import { EditorState } from '@codemirror/state'
import useCodeMirror from './use-codemirror'

type Props = {
  initialDoc: string,
  onChange: (doc: string) => void,
  uploadImgUrl: string
}

export default function Editor({ initialDoc, onChange, uploadImgUrl }: Props) {
  const handleChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange]
  )
  const [refContainer, insertTextAtCursor ,editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange
  })

  // 插入圖片
  useEffect(() => {
    if (uploadImgUrl) {
      insertTextAtCursor(uploadImgUrl)
    }
  }, [uploadImgUrl, insertTextAtCursor])


  useEffect(() => {
    if (editorView) {
      // Do nothing for now

    } else {
      // loading editor
    }
  }, [editorView])

  return <div className='w-1/2 h-full flex-grow-0 flex-shrink-0' ref={refContainer}></div>
}

