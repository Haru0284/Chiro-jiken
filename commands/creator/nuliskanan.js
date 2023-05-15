module.exports = {
    name: "nuliskanan",
    alias: ["mnuliskanan"],
    use: "<query>",
    desc: "Mager Nulis Maker",
    type: "creator",
    example: "%prefix%command <query>",
    start: async(naisa, m, { text }) => {
        naisa.sendFile(m.from, global.api("zenz", "/creator/nuliskanan", { text: text }, "apikey"), "", m)
    },
    isQuery: true
}