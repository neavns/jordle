import cache from "./cache.js";
import getLetterOccurrence from "./getLetterOccurrence.js";
import getTodaysWord from "./getTodaysWord.js";

const init = () => {
  const initialWord = getTodaysWord();
  const letterOccurrence = getLetterOccurrence(initialWord)
  cache.setMany({ word: initialWord, letterOccurrence })
  console.log('initial state of cache', cache)

  // todo start a cron job to update the word every day
}

export default init