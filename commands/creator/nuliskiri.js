module.exports = {
    name: "nuliskiri",
    alias: ["mnuliskiri"],
    use: "<query>",
    desc: "Mager Nulis Maker",
    type: "creator",
    example: "%prefix%command <query>",
    start: async(naisa, m, { text }) => {
        naisa.sendFile(m.from, global.api("zenz", "/creator/nuliskiri", { text: text }, "apikey"), "", m)
    },
    isQuery: true
}