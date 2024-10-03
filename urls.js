const fs = require('fs');
const process = require('process');
const axios = require('axios');
const url = require('url');

function getUrls(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${filename} : ${err}`);
            process.exit(1);
        }
        else {
            const urls = data.split('\n').filter(Boolean);
            getUrlData(urls);
        }
    });
}


function getUrlData(urls) {
    urls.forEach(async (url) => {
        const hostname = new URL(url).hostname;
        const fileName = hostname;
        try {
            const resp = await axios.get(url, { timeout: 5000 });
            writeOnFile(resp.data, fileName)
        } catch (err) {
            console.error(`Couldn't download ${url}: ${err}`);
        }
    });
}


function writeOnFile(data, outputFile) {

    fs.writeFile(outputFile, data, 'utf-8', (err) => {
        if (err) {
            console.error(`Couldn't write ${outputFile} : ${err}`);
        }
        else console.log(`Wrote to ${outputFile}`)
    });
}


getUrls(process.argv[2]);