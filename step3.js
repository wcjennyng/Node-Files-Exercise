const fs = require('fs')
const axios = require('axios')

//Write to file if needed, else print

function handleOut(out, text) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function (err) {
            if (err) {
                console.error(`Couldn't write to ${out}. ${err}`)
                process.exit(1)
            }
        })
    } else {
        console.log(`${text}`)
    }
}

//Read file at path and print it out
function cat(path, out) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`${path} not found. ${err}`)
            process.exit(1)
        }
        handleOut(out, `${data}`)
    })
}

//Read page at URL and print it out
async function webCat(url, out) {
    try {
        let res = await axios.get(url)
        handleOut(out, res.data)
    } catch (err) {
        console.error(`${url} not found. ${err}`)
        process.exit(1)
    }
}

let path, out;

if (process.argv[2] === '--out') {
    out = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2]
}

if (path.includes('http')) {
    webCat(path, out)
} else {
    cat(path, out)
}