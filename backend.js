let express = require('express');
let app = express();
let cors = require('cors')

app.use(cors())

const csv = require('csv-parser')
const fs = require('fs');
const { type } = require('os');
const results = [];
let resNum = []
let winners = []
let reintegro = []


fs.createReadStream('data/8512.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))

  fs.createReadStream('data/1321.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    resFinal(results)
  })

function resFinal(res) {
    arr = media(res)
    for (let i = 0; i < 6; i++) {
        max = count(arr)
        arr = del(arr, max)
    }
    count(reintegro.sort())
    console.log(winners)
}

function media(res) {
    resNum = []
    for (let i = 0; i < res.length; i++) {
        resNum.push(res[i].n1)
        resNum.push(res[i].n2)
        resNum.push(res[i].n3)
        resNum.push(res[i].n4)
        resNum.push(res[i].n5)
        resNum.push(res[i].n6)
        reintegro.push(res[i].R)
    }

    console.log(reintegro)

    return resNum.sort()
}

function count(arr) {
    cont = 0
    num = arr[0]
    maxCont = 0
    maxNum = ''
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === num) {
            cont += 1
            if (cont > maxCont) {
                maxCont = cont
                maxNum = arr[i]
            }
        }
        else if (arr[i] != num && arr[i] != undefined) {
            cont = 1;
            num = arr[i]
        }
    }
    winners.push(maxNum)
    return maxNum
}

function del(arr, num) {
    return arr.filter(item => (item != num && item != undefined))
}

app.get('/', (req,res) => {
    console.log(winners)
    return res.json({'res': winners})
})

app.listen(4000, () => {
    console.log('Servidor encendido')
})