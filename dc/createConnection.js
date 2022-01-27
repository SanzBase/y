const webSocket = require('ws')
const {EventEmitter} = require('node:events')

module.exports = class Client extends EventEmitter {
  constructor(token){
    super()
    this.token = token;
    this.defaultGateway ='wss://gateway.discord.gg/?v=9&encoding=json'
  }
  async login(token){
    let ws = new webSocket(this.defaultGateway)
    ws.on('open', function() {
      ws.send(JSON.stringify({
        op: 2,
        d: {
          token: !this.token ? token : this.token,
          intents: 513,
          properties: {
            $os: 'linux',
            $browser: 'chrome',
            $device: 'chrome'
          }
        }
      }, null, '\n'))
      this.emit('ready', null)
      console.log(!this.token ? token : this.token)
    })
    ws.on('message', async(msg) => {
      let { t, event, op, d } = JSON.parse(msg)
      switch(op){
        case 10:
          this._refresh(ws, d.heartbeat_interval)
          break;
      }
      this.emit(t, d)
      console.log(d)
    })
  }
  async _refresh(ws, ms){
    return setInterval(function() {
      ws.send(JSON.stringify({op:2,d:null},null,'\n'))
    }, ms)
    console.log(ms)
  }
  
}