module.exports = {
    name: "harta",
    alias: ["tahta","hartatahta"],
    use: "<query>",
    desc: "Harta Tahta Maker",
    type: "creator",
    example: "%prefix%command <query>",
    start: async(naisa, m, { text }) => {
        naisa.sendFile(m.from, global.api("zenz", "/creator/hartatahta", { text: text }, "apikey"), "", m)
    },
    isQuery: true
}