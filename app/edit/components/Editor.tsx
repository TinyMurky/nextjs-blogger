'use client'
import React, { useCallback, useEffect } from 'react'
import { EditorState } from '@codemirror/state'
import useCodeMirror from './use-codemirror'

type Props = {
  initialDoc: string,
  onChange: (doc: string) => void
}

export default function Editor({ initialDoc, onChange }: Props) {
  const handleChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange]
  )
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange
  })

  useEffect(() => {
    if (editorView) {
      // Do nothing for now

    } else {
      // loading editor
    }
  }, [editorView])

  return <div className='w-1/2 h-full flex-grow-0 flex-shrink-0' ref={refContainer}></div>
}

