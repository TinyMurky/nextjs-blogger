'use client' 
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center bg-opacity-0 justify-center z-10'>
      <div className='bg-gray-700 rounded-xl p-10 flex flex-col justify-center items-center'>

      <h1 className='text-2xl mb-4 text-white/90'>Something went Wrong !</h1>
      <h2 className='text-xl mb-4 text-white/90'>Please Don&apos;t Write JSX Or Script Without Code Block Syntex</h2>
      <button
        className='text-white/90 rounded-xl px-4 py-2 bg-red-500'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      </div>
    </div>
  )
}