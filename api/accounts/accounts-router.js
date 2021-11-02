const router = require('express').Router()
const Accounts = require('./accounts-model');
const mw = require('./accounts-middleware');

router.get('/',
 async (req, res, next) => {
  try{
    const data = await Accounts.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
})

router.get('/:id', 
  mw.checkAccountId, 
  async (req, res, next) => {
    res.json(req.account);
})

router.post('/',
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await Accounts.create(req.body)
        res.status(201).json(newAccount)
    } catch (err) {
      next(err);
    }
})

router.put('/:id',
  mw.checkAccountPayload,
  mw.checkAccountNameUnique, 
  async (req, res, next) => {
    try {
      res.json('update')
    } catch (err) {
      next(err);
    }
});

router.delete('/:id', 
  mw.checkAccountId, 
  async (req, res, next) => {
  try {
    res.json('delete')
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
