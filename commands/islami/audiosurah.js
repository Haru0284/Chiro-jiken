const { fetchUrl, isUrl } = require("../../lib/Function")

module.exports = {
    name: "audiosurah",
    alias: ["surahaudio"],
    use: "<query>",
    desc: "Download Audio From audiosurah",
    type: "islami",
    example: "%prefix%command nomor surah",
    start: async(naisa, m, { text }) => {
        naisa.sendFile(m.from, global.api("zenz", `/islami/quran/audio/${text}`, {}, "apikey"), "", m)
    },
    isQuery: true
}