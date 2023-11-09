'use client'
import type React from 'react'
import { useEffect, useState, useRef } from 'react'
import { basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { oneDark } from '@codemirror/theme-one-dark'


interface Props {
  initialDoc: string,
  onChange?: (state: EditorState) => void
}

const useCodeMirror = <T extends Element>(
  props: Props
): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()
  const { onChange } = props
  // useEffect(() => {
  //   if (editorView && props.initialDoc !== editorView.state.doc.toString()) {
  //     // 如果初始文档发生变化，更新 CodeMirror 文档
  //     editorView.dispatch({
  //       changes: { from: 0, to: editorView.state.doc.length, insert: props.initialDoc }
  //     })
  //   }
  // }, [props.initialDoc, editorView])

  // console.log("Fuck you", props.initialDoc)
  useEffect(() => {
    if (!refContainer.current) return

    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true
        }),
        oneDark,
        EditorView.lineWrapping,
        EditorView.updateListener.of(update => {
          if (update.changes) {
            onChange && onChange(update.state)
          }
        })
      ]
    })

    const view = new EditorView({
      state: startState,
      parent: refContainer.current
    })
    setEditorView(view)


    return () => {
      view.destroy()
    }
  }, [refContainer])


  return [refContainer, editorView]
}

export default useCodeMirror
