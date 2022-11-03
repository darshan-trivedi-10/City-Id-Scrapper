const fs = require('fs');
const getId = require('./country').getId;

var cityname = [];
var fileData = JSON.parse(fs.readFileSync('id.json', { encoding: 'utf-8' }));
var lastcitty = JSON.parse(fs.readFileSync('lastcity.json', { encoding: 'utf-8' }));
var newCity = getNextCity(lastcitty['lastcity']);

getNewId();

function getNextCity(lastCity) {
    let isNewCity = false;
    if (lastCity == 'none') {
        isNewCity = true;
    }

    let newCitys = [];
    for (const key in fileData) {
        if (isNewCity) {
            fileData['lastcity'] = key;
            newCitys.push(fileData[key].url);
            cityname.push(key);
        }
        if (isNewCity == false && lastCity == key) {
            isNewCity = true;
        }
    }

    fs.writeFileSync('id.json', JSON.stringify(fileData), function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('changed!')
        }
    })

    return newCitys;
}

async function getNewId() {
    console.log(newCity)
    let idx = 1, size = newCity.length;
    let id = setInterval(() => {
        if (idx == size) {
            clearInterval(id);
        } else {
            getId(newCity[idx])
            let ans = {
                "lastcity": cityname[idx]
            }
            fs.writeFileSync('lastcity.json', JSON.stringify(ans), function (err) {
                console.log(`last city is ${cityname[idx]}`);
            })
        }
        idx++;
    }, 20 * 1000);

}