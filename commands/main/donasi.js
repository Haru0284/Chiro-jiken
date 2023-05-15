const fs = require('fs')
const { getBuffer } = require('../../lib/Function')

module.exports = {
  name: "donasi",
  cmd: ['donasi','sewa'],
  category: 'main',
  start: async (naisa, m, { text }) => {
    
    let teks = 'chat owner aja kk!!'

    naisa.sendMessage(m.from, { image: fs.readFileSync('../../media/qris.jpg'), caption: teks, footer: global.footer }, { quoted: m })
  }
}