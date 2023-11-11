'use client'
import type React from 'react'
import { useEffect, useState, useRef, useCallback } from 'react'
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
): [React.MutableRefObject<T | null>, (text: string) => void,EditorView?,] => {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()
  const { onChange } = props

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
      parent: refContainer.current // codemirror要放在哪個div裡
    })
    setEditorView(view)


    return () => {
      view.destroy()
    }
  }, [refContainer])

  // 用於插入img url
  const insertTextAtCursor = useCallback((text: string) => {
      if (editorView) {
        const transaction = editorView.state.update({
          changes: { from: editorView.state.selection.main.from, insert: `\n\n![](${text})\n\n` }
        })
        editorView.dispatch(transaction);
      }
    }, [ editorView ])

    return [refContainer, insertTextAtCursor, editorView]
  }

export default useCodeMirror
