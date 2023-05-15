const { fetchUrl, sleep } = require("../../lib/Function")

module.exports = {
    name: "tebaklagu2",
    alias: ["tlagu2"],
    desc: "Entertaiment Tebak Lagu 2",
    type: "entertainment",
    start: async(naisa, m) => {
        if (tebaklagu.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
        let result = await fetchUrl(global.api("zenz", "/entertainment/tebaklagu2", {}, "apikey"))
        naisa.sendMessage(m.from, { audio: { url: result.link_song }, mimetype: "audio/mpeg", fileName: "???" }, { quoted: m }).then(() => {
            tebaklagu[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
            console.log("Jawaban: " + result.jawaban)
        })
        await sleep(30000)
        if (tebaklagu.hasOwnProperty(m.sender.split('@')[0])) {
            naisa.sendText(m.from, `Waktu Habis\n\nJawaban:  ${tebaklagu[m.sender.split('@')[0]]}`, m)
            delete tebaklagu[m.sender.split('@')[0]]
        }
    }
}