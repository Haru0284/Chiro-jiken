module.exports = {
    name: "attp",
    alias: ["texttopicture"],
    use: "<query>",
    desc: "ATTP Maker",
    type: "creator",
    example: "%prefix%command <query>",
    start: async(naisa, m, { text }) => {
        naisa.sendFile(m.from, global.api("zenz", "/creator/attp", { text: text }, "apikey"), "", m)
    },
    isQuery: true
}