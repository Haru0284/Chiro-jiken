const { fetchUrl, sleep } = require("../../lib/Function")

module.exports = {
    name: "asahotak",
    alias: ["aotak"],
    desc: "Entertaiment Asah Otak",
    type: "entertainment",
    start: async(naisa, m) => {
        if (asahotak.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
        let fetch = await fetchUrl(global.api("zenz", "/entertainment/asahotak", {}, "apikey"))
        let result = await fetch.result
        naisa.sendText(m.from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\n\nWaktu : 30s`, m).then(() => {
            asahotak[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
            console.log("Jawaban: " + result.jawaban)
        })
        await sleep(30000)
        if (asahotak.hasOwnProperty(m.sender.split('@')[0])) {
            naisa.sendText(m.from, `Waktu Habis\n\nJawaban:  ${asahotak[m.sender.split('@')[0]]}`, m)
            delete asahotak[m.sender.split('@')[0]]
        }
    }
}