const Accounts = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
    const error = { status: 400 }
    const { name, budget } = req.body;
    if (name === undefined || budget === undefined ){ 
      next({ status: 400, message: 'name and budget are required' })
    } else if (typeof name !== 'string'){
      next({ status: 400, message: 'name of account must be a string' })
    } else if (name.trim().length < 4 || name.trim().length > 20){
      next({ status: 400, message: 'name of account must be between 4 and 20 characters'})
    } else if (typeof budget !== 'number' || isNaN(budget)){
      next({ status: 400, message: 'budget must be a number'})
    } else if (budget < 0 || budget > 2147483647 ){
      next({ status: 400, message: 'budget is too big or too smol'})
    } 

    if (error.message) {
      next(error)
    } else {
      next();
    }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await db('accounts').where('name', req.body.name.trim()).first()

    if(existing){
      next({ status: 400, message: "that name is taken" })
    } else { 
      next();
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const validAccount = await Accounts.getById(req.params.id);
    if(validAccount){
      req.account = validAccount
      next();
    } else {
      next({ status: 404, message: 'account not found' })
    }
  } catch (err) {
    next(err);
  }
}
