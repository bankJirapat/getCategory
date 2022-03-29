const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.json())

const getCategory = async () => {
    let response = await fetch('https://api.publicapis.org/categories')
    console.log("response : ", response)
    let result = await response.json()
    console.log("result : ", result)
    return result.categories
}

const main = async () => {
    const data = await getCategory()
    console.log("data : ", data)
    return data
}

const filterCategory = async (dataAll, filter) => {
    console.log("dataAll : ", dataAll)
    console.log("filter : ", filter)

    let result = intersectionFunction(dataAll, filter)
    console.log("result : ", result)
    return result
}

const intersectionFunction = (array1, array2) => {
    let intersec = array1.filter((e) => {
        return array2.indexOf(e) > -1
    })
    console.log("intersection : ", intersec)
    return intersec
}

app.get('/getCategory', async (req, res) => {
    let category = await main()
    console.log("category : ", category)
    res.send(category)
})

app.get('/filterGetCategory', async (req, res) => {
    let filter = req.body.filter
    console.log(filter)
    let dataAll = await getCategory()
    console.log("dataAll : ", dataAll)
    let result = await filterCategory(dataAll, filter)
    res.send(result)
})

app.listen(port, () => {
    console.log("listening on port " + port)
})