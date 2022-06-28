import express, { Router } from 'express';
import validateBody from '../../middleware/validateBody';
const router = Router();

router.post('/verify', [validateBody], (req, res) => {
  const { input } = req.body
  
})

export default router