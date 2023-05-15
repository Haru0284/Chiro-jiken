const fetch = ('node-fetch')
const fs = ('fs')
module.exports = {
  name: "openai",
  alias: ["openai", "ai"],
  use: "<text>",
  desc: "mencari topik atau sesuatu yang ada di internet",
  type: "newfitur",
  example: "%prefix%command",
  start: async(naisa, m) => {
    if (!text) throw 'Hay adakah yang bisa saya bantu??'
      await m.reply('Tunggu Sebentar......')
    let anu = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=APOLOZEA&text=${text}&user=user-unique-id`)
    let hasil = await anu.json()
    naisa.sendMessage(from, anu, {image: fs.readFileSync('../../media/naisa.jpeg')}, { qouted: m})
  },
  isLimit: true
}