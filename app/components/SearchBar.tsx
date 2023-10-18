'use client'
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearch("")
    
    // 這邊寫按下案件後要幹麻
    // router.push(`/${search}/`) // 傳到下一個router root+search
  }

  return (
    // onSubmit={e => hanldeSubmit()}然後把滑鼠移動到e上面就可以看到type
    <form className="flex justify-center md:justify-between "
    onSubmit={handleSubmit}>
      {/* input要用動態setSearch變換值 */}
      <input 
        type="text"
        value={search}
        onChange={event => setSearch(event.target.value)}
        className="bg-white p-2 w-40 lg:w-60 text-xl rounded-xl"
        placeholder="Search"
      />
      <button className="hidden lg:inline-flex p-2 text-xl rounded-xl bg-gray-500 bg-opacity-50 hover:bg-opacity-100 ml-2 font-bold">
        🚀
      </button>
    </form>
  )
}
