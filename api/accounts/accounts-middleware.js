const Accounts = require('./accounts-model')

exports.checkAccountPayload = async (req, res, next) => {
  try {
    const { name, budget } = req.body;
    if (!name){ 
      next({ status: 400, message: 'check account params' })
    } else if (!budget){
      next({ status: 400, message: 'check account params' })
    } 
    else {
      next();
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  console.log('middleware: checkAccountNameUnique')
}

exports.checkAccountId = async (req, res, next) => {
  console.log('middleware: checkAccountId')
  try {
    const validId = await Accounts.getById(req.params.id);
    if(validId){
      req.account = validId
      next();
    } else {
      next({ status: 404, message: 'account not found' })
    }
  } catch (err) {
    next(err);
  }
}
