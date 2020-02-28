const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const port = 80
const baseUrl = 'https://api.banhji.com/payment/v1/bills/'

app.get('/bills/:billId', async (req, res) => {
    const id = req.params.billId
    const appid = req.headers.appid
    console.log('start end')
    const params = {
        url: `${baseUrl}${id}`,
        method: 'get',
        headers: {
            'appid': appid
        }
    }
    try {
        const result = await axios(params)
        res.json(result.data)
    } catch (e) {
        res.json(e)
    }
})

app.post('/bills/:billId/payment', async (req, res) => {
    const id = req.params.billId
    const appid = req.headers.appid
    const params = {
        url: `${baseUrl}${id}/payment`,
        method: 'post',
        headers: {
            'appid': appid
        },
        data: {
            data: req.body
        }
    }
    try {
        const result = await axios(params)
        res.json(result.data)
    } catch (e) {
        res.json(e)
    }
})

app.listen(port, () => console.log(`Server is running at port ${port}`))
