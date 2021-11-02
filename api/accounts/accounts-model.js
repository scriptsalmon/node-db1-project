const db = require('../../data/db-config.js');

// OPTION 1 - BETTER FOR TROUBLESHOOTING
// async function getAll () { //db is an async function, so we have to await
//   const result = db('accounts') // SELECT * FROM accounts
// console.log(result);
//   return result;
// }
// OPTION 2 - CLEAN
const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return 'get wired'
}

const create = account => {
  return 'get wired'
}

const updateById = (id, account) => {
  return 'get wired'
}

const deleteById = id => {
  return 'get wired'
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
