'use client'
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"

interface Props {
  search: string
  setSearch:React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBar({ search, setSearch }:Props) {

  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearch("")
  }

  return (
    // onSubmit={e => hanldeSubmit()}然後把滑鼠移動到e上面就可以看到type
    <form className="flex justify-center md:justify-between "
     onSubmit={handleSubmit}
     >
      {/* input要用動態setSearch變換值 */}
      <input 
        type="text"
        value={search}
        onChange={event => setSearch(event.target.value.trim())}
        className="bg-gray-600 focus:bg-opacity-50 outline-none caret-white/90 text-white/90 px-2 py-1 lg:py-2 lg:px-3 w-32 sm:w-40 lg:w-60 text-base lg:text-xl rounded-xl"
        placeholder="Search by Title"
      />
      <button className="hidden lg:inline-flex p-2 text-xl rounded-xl bg-gray-500 bg-opacity-50 hover:bg-opacity-100 ml-2 font-bold">
        🧹
      </button>
    </form>
  )
}
