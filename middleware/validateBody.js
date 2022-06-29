const validateBody =  (req, res, next) => {
  if(!req.body || !req.body.input) {
    res.status(400).send('Request body is missing');
    return
  } 
  else if (!Array.isArray(req.body.input) || req.body.length === 0 || req.body.length > 5) {
    res.status(400).send('Invalid body');
    return
  }
  next()
}

export default validateBody