module.exports = {
    name: "ttp",
    alias: ["texttopicture"],
    use: "<query>",
    desc: "TTP Maker",
    type: "creator",
    example: "%prefix%command <query>",
    start: async(naisa, m, { text }) => {
        naisa.sendFile(m.from, global.api("zenz", "/creator/ttp", { text: text }, "apikey"), "", m)
    },
    isQuery: true
}