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
      const newAccount = await Accounts.create({
        name: req.body.name.trim(),
        budget: req.body.budget,
      })
        res.status(201).json(newAccount)
    } catch (err) {
      next(err);
    }
})

router.put('/:id',
  mw.checkAccountId,
  mw.checkAccountPayload, 
  async (req, res, next) => {
    try {
      const updated = await Account.updateById(req.params.id, req.body)
      res.json('update')
    } catch (err) {
      next(err);
    }
});

router.delete('/:id', 
  mw.checkAccountId, 
  async (req, res, next) => {
  try {
    await Accounts.deleteById(req.params.id)
    res.json(req.account);
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
