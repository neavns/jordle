/**
 * 
 * @param {*} userInput 
 * @param {*} word - the word to be guessed
 * @param {*} letterOccurrence - the letter occurrence of the word
 * @returns [Array,Array] - two arrays of indexes of letters correctly placed and missplaced
 */
const getIndexPositions = (userInput, word, letterOccurrence) => {
  let correctlyPlacedLetterIndexes = []
  let wrongPlacedLetterIndexes = []
  let letterOccurrenceClone = {...letterOccurrence}

  // traverse once to check correct indexes
  for (let i = 0; i < word.length; i++) {
    if (userInput[i] === word[i]) {
      correctlyPlacedLetterIndexes.push(i)
      letterOccurrenceClone[userInput[i]]--
    }
  }

  // traverse the second time to check missplaced letters
  for (let i = 0; i < word.length; i++) {
    if (word.includes(userInput[i]) && letterOccurrenceClone[userInput[i]] > 0) {
      wrongPlacedLetterIndexes.push(i)
      letterOccurrenceClone[userInput[i]]--
    }
  }

  return [correctlyPlacedLetterIndexes, wrongPlacedLetterIndexes]
}

export default getIndexPositions