const fetch = ('node-fetch')
module.exports = {
    name: "gimage",
    alias: ["aigoogle", "gimage"],
    use: "<text>",
    desc: "mencari topik atau sesuatu yang ada di internet",
    type: "newfitur",
    example: "%prefix%commad",
    start: async(naisa, m) => {
    if (!text) throw 'membuat gambar dari AI.\n\nContoh:\n.gimage indonesia in 2500 years'
    await m.reply(`Tunggu Sebentar......`)
    let anu = `https://api.lolhuman.xyz/api/dall-e?apikey=APOLOZEA&text=${text}`
        naisa.sendMessage(from, {image: anu}, { quoted: m})
    },
    isLimit: true
}