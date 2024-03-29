"use client"

import { useState } from "react"
import Search from "@/app/components/Search/Search"
import ResultView from "@/app/components/Search/ResultView"
import { SearchResult } from "@/app/components/Search/Search"

const SearchComponent = () => {
  const [results, setResults] = useState<SearchResult[]>([])

  return (
    <div>
      <Search setResults={setResults} />
      <ResultView
        results={results}
        onAddToPlaylist={(item: {
          songTitle: string
          bandName: string
          thumbnailUrl: string
          videoId: string
          channelTitle: string
        }) => {
          throw new Error("Function not implemented.")
        }}
      />
    </div>
  )
}

export default SearchComponent
