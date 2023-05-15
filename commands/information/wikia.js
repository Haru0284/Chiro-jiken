const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "wikia",
    alias: ["wikien"],
    use: "<query>",
    desc: "Get Information From Wikipedia Abstract",
    type: "information",
    example: `%prefix%command <query>`,
    start: async(naisa, m, { text }) => {
        let fetch = await fetchUrl(global.api("zenz", "/information/wikia", { query: text }, "apikey"))
        naisa.sendText(m.from, fetch.result, m)
    },
    isQuery: true
}