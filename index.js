const fs = require('fs')
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const https = require('https')

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
}

const app = express()
app.use(bodyParser.json())
const port = 443
const baseUrl = 'https://api.banhji.com/payment/v1/bills/'

app.get('/bills/:billpk', async (req, res) => {
    const pk = req.params.billpk
    const apid = req.headers.appid
    let apiRes = null
    const params = {
        url: `${baseUrl}${pk}`,
        method: 'get',
        headers: {
            'appid': apid
        }
    }
    try {
        const result = await axios(params)
        res.status(result.status)
        res.json(result.data)
    } catch (e) {
        res.status(e.response.status)
        res.json(e.response.data)
    }
})

app.post('/bills/:billpk/payment', async (req, res) => {
    const pk = req.params.billpk
    const appid = req.headers.appid
    const params = {
        url: `${baseUrl}${pk}/payment`,
        method: 'post',
        headers: {
            'appid': appid
        },
        data: req.body
    }

    try {
        const result = await axios(params)
        res.json(result.data)
    } catch (e) {
        res.json(e)
    }
})

app.get('/transactions/:id', async (req, res) => {
    const pk = req.params.id
    const apid = req.headers.appid
    const params = {
        url: `https://api.banhji.com/v1-agent/transactions/${pk}`,
        method: 'get',
        headers: {
            'appid': apid
        }
    }
    try {
        const result = await axios(params)
        res.json(result.data)
    } catch (e) {
        res.json(e)
    }
})

const httpsServer = https.createServer(credentials, app)
httpsServer.listen(port, () => {
    console.log('server is running on 443')
})

// app.listen(port, () => console.log(`Server is running at port ${port}`))
