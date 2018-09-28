const config = {
  url: 'localhost:7777'
}

async function getDatabase () {
  let lists = []
  let data = await fetch(config.url + '/nDos/mysql/Database')
  data = await data.json()
  data.forEach(v => lists.push({ name: v.Database }))
  return lists
}

async function getTable (db) {
  let lists = []
  let data = await fetch(config.url + '/nDos/mysql/' + db + '/getTable')
  data = await data.json()
  data.forEach(v => lists.push({ name: v.table_name }))
  return lists
}

async function getData (db, table, options) {
  let query = '?v=1.0'
  Reflect.ownKeys(options).forEach(v => { query += '&' + v + '=' + options[v] })
  let data = await fetch(config.url + '/nDos/mysql/' + db + '/' + table + '/getData' + query)
  data = await data.json()
  return data
}

export default {
  getDatabase, getTable, getData
}
