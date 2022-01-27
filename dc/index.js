let Client = require('./createConnection');

(async() => {
  let client = new Client()
  await client.login('token anjg')
  client.on('ready', function(){
    console.log('connect')
  })
  client.on('MESSAGE_CREATE', async(msg) => {
    console.log(msg)
  })
})()