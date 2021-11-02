const db = require('../../data/db-config.js');

// OPTION 1 - BETTER FOR TROUBLESHOOTING
async function getAll () {
  // const result = await db.raw('SELECT * FROM accounts;')
  // const result = await db.select('*').from('accounts')
  const result = await db('accounts');
  return result;
}
// OPTION 2 - CLEAN
// const getAll = () => {
//   return db('accounts')
// }

// OPTION 1 - GET BY ID
// async function getById (id) {
//   // const result = await db.select('*').from('accounts').where('id', id).first()
//   // const result = await db.select('*').from('accounts').where({ id })
//   const result = await db('accounts').where('id', id).first()
//   return result;
// }

// OPTION 2 - GET BY ID
const getById = (id) => {
  // return db('accounts').where('id', id).first();
  return db('accounts').where({ id }).first();
}

async function create (account) {
  // INSERT into accounts (name, budget) VALUES ('biggy', 999);
  const result = await db('account').insert(account);
  console.log(result);
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
