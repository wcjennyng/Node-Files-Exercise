const fs = require('fs')
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(`${path} not found. ${err}`)
            process.exit(1)
        }
        console.log(`${data}`)
    })
}

async function webCat(url) {
    try {
        let res = await axios.get(url)
        console.log(res.data)
    } catch (err) {
        console.error(`${url} not found. ${err}`)
        process.exit(1)
    }
}

let path = process.argv[2]

if (path.includes('http')) {
    webCat(path)
} else {
    cat(path)
}