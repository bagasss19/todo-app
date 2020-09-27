const moment = require('moment')
let date = new Date()

let now = moment(date).format('L')

console.log(now);
module.exports = now