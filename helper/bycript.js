'use strict'

const bcrypt = require('bcrypt')

function encrypt(pass) {
    const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(pass, salt);
}

function compare(pass, hashPass) {
    return bcrypt.compareSync(pass, hashPass);
}

module.exports = {compare , encrypt }