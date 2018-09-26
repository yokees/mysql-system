const config = {
  url: 'http://123.59.14.177:7777'
}

async function getDatabase () {
  let data = await fetch(config.url + '/nDos/mysql/Database')
  data = await data.json()
  return data
}

async function getTable (db) {
  let data = await fetch(config.url + '/nDos/mysql/' + db + '/getTable ')
  data = await data.json()
  return data
}

async function getData (db, table) {
  let data = await fetch(config.url + '/nDos/mysql/' + db + '/' + table + '/getData ')
  data = await data.json()
  return data
}

export default {
  getDatabase, getTable, getData
}
