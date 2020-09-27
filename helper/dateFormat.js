function dateFormat(input) {
    let date = new Date(input).getDate()
    let month = new Date(input).getMonth()
    let year = new Date(input).getFullYear()
    
    return `${date}-${month}-${year}`
}

module.exports = dateFormat