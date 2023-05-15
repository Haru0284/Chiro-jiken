const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "stalkhago",
    alias: ["nickhago"],
    use: "<id>",
    desc: "Hago Stalker",
    type: "stalker",
    example: `%prefix%command <id>`,
    start: async(naisa, m, { text }) => {
        let fetch = await fetchUrl(global.api("zenz", "/stalker/nickhago", { query: text }, "apikey"))
        let caption = `Hago Stalker :\n\n`
        let i = fetch.result
        caption += `⭔ GameId : ${i.gameId}\n`
        caption += `⭔ UserName : ${i.userName}\n`
        naisa.sendText(m.from, caption, m)
    },
    isQuery: true
}