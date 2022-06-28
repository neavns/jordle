// import getIndexPositions from '../utils/getIndexPositions.js'
// import getLetterOccurrence from './helpers/getLetterOccurrence.js'
import axios from 'axios'

const _ROWS_ = 6
const _COLS_ = 5
const _WORD_ = 'cross'
let focusedCell
let currentRow = 0
let attempts = {}
let _letterOccurrence_ = {}

const appElement = document.querySelector('#app')

// ###############################################
// Generate & manipulate the DOM
// ###############################################

const generateRows = (rows, cellsPerRow) => {
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div')
    row.id = `row-${i}`
    row.classList.add('row')
    for (let j = 0; j < cellsPerRow; j++) {
      row.appendChild(generateCell(j))
    }
    appElement.appendChild(row)
  }
}

const generateCell = id => {
  const cell = document.createElement('div')
  const input = document.createElement('input')
  cell.classList.add('cell-wrapper')
  input.classList.add('cell-input')
  input.maxLength = 1
  input.type = 'text'
  input.oninput = handleChangeEvent
  input.onfocus = handleFocusEvent
  input.setAttribute('data-id', id)
  cell.appendChild(input)
  return cell
}

const clearCell = id => {
  document.querySelector(`[data-id="${id}"]`).value = ''
}

const disableRow = id => {
  const row = document.querySelector(`#row-${id}`)
  row.classList.add('disabled')
}

const applyStyle = (correctIndexes, wrongPlace) => {
  const row = document.querySelector(`#row-${currentRow}`)
  for (let i = 0; i < _WORD_.length; i++) {
    const cell = row.querySelector(`[data-id="${i}"]`)
    if (correctIndexes.includes(i)) {
      cell.classList.add('correct')
    } else if (wrongPlace.includes(i)) {
      cell.classList.add('exists')
    } else {
      cell.classList.add('filled')
    }
  }
}

// ###############################################
// Define event handlers
// ###############################################

const handleChangeEvent = e => {
  const value = e.target.value

  
  if(attempts[currentRow]) {
    attempts[currentRow][Number(focusedCell)] = value
  } else {
    attempts[currentRow] = [value]
  }
  
  if(value.length === 1) goNextCell(focusedCell)
}

const handleEnterKeyPress = async e => {
  if(e.key !== 'Enter' || !attempts[currentRow] || attempts[currentRow].length < _COLS_) return
  const { correctIndexes = [], wrongPlacedIndexes = [], userWon = false } = await axios.post('/api/verify', { input: attempts[currentRow] })
  // const [correctIndexes, wrongPlacedIndexes] = getIndexPositions(attempts[currentRow], _WORD_, _letterOccurrence_)
  applyStyle(correctIndexes, wrongPlacedIndexes)
  // const winCheck = userGuessedCorrectly(correctIndexes)
  if(userWon) return console.log('That\'s correct. Well done!')
  disableRow(currentRow)
  currentRow++
  setFocusedCell(0)
}

const handleBackspaceKeyPress = e => {
  if (e.key !== 'Backspace') return
  const row = document.querySelector(`#row-${currentRow}`)
  const currentCellValue = row.querySelector(`[data-id="${focusedCell}"]`).value
  if(currentCellValue.length === 0) {
    goPreviousCell(focusedCell)
  } else {
    clearCell(focusedCell)
  }
}

const handleKeyPress = e => {
  switch(e.key) {
    case 'Enter': handleEnterKeyPress(e); break;
    case 'Backspace': handleBackspaceKeyPress(e); break;
    case 'ArrowLeft': goPreviousCell(focusedCell); break;
    case 'ArrowRight': goNextCell(focusedCell); break;
    default: break
  }
}
  
const handleFocusEvent = e => {
  const id = e.target.getAttribute('data-id')
  setFocusedCell(id)
}

// ###############################################
// Modify state
// ###############################################

const setFocusedCell = id => {
  focusedCell = id
  const row = document.querySelector(`#row-${currentRow}`)
  row.querySelector(`[data-id="${id}"]`).focus()
}

// ###############################################
// Helpers
// ###############################################

const goNextCell = id => focusedCell !== (_COLS_ - 1).toString() && setFocusedCell(Number(id) + 1)
const goPreviousCell = id => focusedCell !== '0' && setFocusedCell(Number(id) - 1)
const userGuessedCorrectly = indexes => indexes.length === _WORD_.length


// ###############################################
// Initialise the app
// ###############################################

const init = () => {
  // _letterOccurrence_ = getLetterOccurrence(_WORD_)
  generateRows(_ROWS_, _COLS_)
  document.addEventListener('keydown', handleKeyPress)
}

init()
