import { Router } from 'express';
import validateBody from '../../middleware/validateBody.js';
import getIndexPositions from '../../utils/getIndexPositions.js';
import cache from '../../utils/cache.js';
const router = Router();

router.post('/verify', [validateBody], (req, res) => {
  const { input } = req.body
  const { word, letterOccurrence } = cache.getMany(['word', 'letterOccurrence'])
  const [correctlyPlacedLetterIndexes, wrongPlacedLetterIndexes] = getIndexPositions(input, word, letterOccurrence)
  const response = {
    correctIndexes: correctlyPlacedLetterIndexes,
    wrongPlacedIndexes: wrongPlacedLetterIndexes,
    userWon: correctlyPlacedLetterIndexes.length === word.length
  }
  res.json(response)
})

export default router