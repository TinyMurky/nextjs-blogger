'use client'
import type React from 'react'
import { useState, useMemo, useEffect, useCallback } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { createCheckMousePosition } from './editor-helpers'
import { UploadButton } from "@/utils/uploadthings"

type Props = {
  setUploadImgUrl: Dispatch<SetStateAction<string>>,
  saveBlogOnClicked: (blogName: string, doc: string, router:AppRouterInstance | null, redirectHref: string | null) => void,
  blogName: string,
  blogCategory: string,
  doc:string
}
export default function ControlPannel({setUploadImgUrl, saveBlogOnClicked ,blogCategory , blogName, doc}: Props) {
  const router = useRouter()
  const [showControlPanel, setShowControlPanel] = useState(false);

  const checkMousePosition = createCheckMousePosition(setShowControlPanel)

  useEffect(() => {
    window.addEventListener('mousemove', checkMousePosition)

    return () => {
      window.removeEventListener('mousemove', checkMousePosition)
    }
  }, [checkMousePosition])

  return (
    <div className={`z-20 px-4 py-3 flex flex-row justify-around gap-4 items-center m-0 controlPannel fixed ${showControlPanel ? 'inline-flex opacity-100' : 'hidden opacity-0'} bottom-16  right-12 transition-all ease-in rounded bg-gray-600 bg-opacity-50 backdrop-blur-md`}>
      <button className='bg-slate-600 hover:bg-slate-500 text-gray-300 px-4 py-2 m-0 rounded-xl' onClick={() => saveBlogOnClicked(blogName, doc, null, null)}>Save</button>
      <button className='bg-slate-600 hover:bg-slate-500 text-gray-300 px-4 py-2 m-0 rounded-xl' onClick={() => saveBlogOnClicked(blogName, doc, router, `/blogs/${blogCategory}/${blogName}`)}>Finish</button>
      <UploadButton
        className='ut-button:bg-red-500  ut-button:hover:bg-red-400 ut-button:ut-readying:bg-red-500/30 ut-button:ut-uploading:bg-red-500/30 ut-button:ut-uploading:after:bg-red-500'
        appearance={
          {
            // container: StyleField,
            button: "px-4 py-2 m-0 rounded-xl",
            allowedContent: "hidden"
          }
        }
        content={{
          button({ ready }) {
            if (ready) return <div>Add Image</div>;
            return "Uploading..."
          },
          allowedContent({ ready, fileTypes, isUploading }) {
            if (!ready) return "Checking what you allow";
            if (isUploading) return "Seems like stuff is uploading";
            return `Stuff you can upload: ${fileTypes.join(", ")}`;
          },
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          if (res) {
            setUploadImgUrl(res[0].url)
          }
          // alert("Upload Completed")
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  )
}
