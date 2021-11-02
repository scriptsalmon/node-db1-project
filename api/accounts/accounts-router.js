const router = require('express').Router()
const Accounts = require('./accounts-model');

router.get('/', async (req, res, next) => {
  try{
    const data = await Accounts.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const validId = await Accounts.getById(req.params.id);
    if(validId){
      res.json(validId);
    } else {
      // res.status(404).json({ message: 'id does not exist' })
      // next();
      next({ status: 404, message: 'account not found' })
    }
  } catch (err) {
    next(err);
  }
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
