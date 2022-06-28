const getLetterOccurrence = word => {
  let letterOccurrence = {}
  for (let i = 0; i < word.length; i++) {
    if (letterOccurrence[word[i]]) {
      letterOccurrence[word[i]]++
    } else {
      letterOccurrence[word[i]] = 1
    }
  }
  return letterOccurrence
}

export default getLetterOccurrence