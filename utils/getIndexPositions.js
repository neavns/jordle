const getIndexPositions = (userInput, word, letterOccurrence) => {
  let indexes = []
  let wrongPlaced = []

  // traverse once to check correct indexes
  for (let i = 0; i < word.length; i++) {
    if (userInput[i] === word[i]) {
      indexes.push(i)
      letterOccurrence[userInput[i]]--
    }
  }

  // traverse the second time to check missplaced letters
  for (let i = 0; i < word.length; i++) {
    if (word.includes(userInput[i]) && letterOccurrence[userInput[i]] > 0) {
      wrongPlaced.push(i)
      letterOccurrence[userInput[i]]--
    }
  }

  return [indexes, wrongPlaced]
}

export default getIndexPositions