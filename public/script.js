const _ROWS_ = 6
const _COLS_ = 5
const _WORD_ = 'cross'
let focusedCell
let currentRow = 0
let attempts = {}
let cellsState = {}

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
  const row = document.querySelector(`#row-${currentRow}`)
  row.querySelector(`[data-id="${id}"]`).value = ''
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
  const { correctIndexes = [], wrongPlacedIndexes = [], userWon = false } = await post('/api/verify', { input: attempts[currentRow] }).catch(err => console.log(err))
  console.log(correctIndexes, wrongPlacedIndexes, userWon)
  applyStyle(correctIndexes, wrongPlacedIndexes)
  disableRow(currentRow)
  cellsState[currentRow] = { correctIndexes, wrongPlacedIndexes } 
  storeProgress({  userWon })

  if(userWon) return alert('You WON!!!!!!')
  if(currentRow === _ROWS_ - 1) return
  currentRow++
  setFocusedCell(0)
}

const handleBackspaceKeyPress = e => {
  if (e.key !== 'Backspace' || !focusedCell) return
  console.log(currentRow, focusedCell)
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
    case 'Tab': e.preventDefault(); break;
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

const post = async (url, body) => {
  const response = await fetch(url, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
  return response.json() || {}
}

const storeProgress = (aditionalData) => {
  const progress = {
    currentRow,
    attempts,
    cellsState,
    ...aditionalData
  }
  localStorage.setItem('progress', JSON.stringify(progress))
}

const getStoredProgress = () => {
  const state = localStorage.getItem('progress')
  if (!state) return

  return JSON.parse(state)
}

const loadStoredProgress = progress => {
  attempts = progress.attempts
  cellsState = progress.cellsState

  for (let i = 0; i <= progress.currentRow; i++) {
    // fill in the text boxes
    const row = document.querySelector(`#row-${i}`)
    for (let j = 0; j < _COLS_; j++) {
      row.querySelector(`[data-id="${j}"]`).value = progress.attempts[currentRow][j]
    }

    // apply styling
    const { correctIndexes, wrongPlacedIndexes } = progress.cellsState[i]
    applyStyle(correctIndexes, wrongPlacedIndexes)
    disableRow(currentRow)

    currentRow++
  }

  // if user guessed correctly - disable the remaining rows
  if (progress.userWon) for (let i = currentRow; i < _ROWS_; i++)  disableRow(i)

}

// ###############################################
// Initialise the app
// ###############################################

const init = () => {
  generateRows(_ROWS_, _COLS_)
  const storedProgress = getStoredProgress()
  if(storedProgress) loadStoredProgress(storedProgress)
  document.addEventListener('keydown', handleKeyPress)
}



init()
