import words from "../static/words.js"
import cache from "./cache.js"

const getTodaysWord = () => {
  const seenWords = cache.get('seenWords')
  const filteredWords = words.filter(w => !seenWords.includes(w))
  const word = filteredWords[Math.floor(Math.random() * filteredWords.length + 1)]
  cache.set('seenWords', [...seenWords, word])
  return word
}

export default getTodaysWord