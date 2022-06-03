const express = require('express')
const app = express()
const port = 8080
const qrcode = require('qrcode-terminal')

//Api WA Start From here
//const { Client, Location, List, Buttons, LocalAuth } = require('./index');
const {Client, LocalAuth} = require("whatsapp-web.js")
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

client.initialize();

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    //console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api', (req, res) => {
  let number = req.query.number
  let pesan = req.query.pesan
  number = number.substring(1)
  number = '62' + number + '@c.us'
  console.log(number)
  client.sendMessage(number, pesan)
  res.send({
    pesan : "Pesan terkirim"
  })
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})