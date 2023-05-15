const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "stalkdragonraja",
    alias: ["nickdragonraja"],
    use: "<id>",
    desc: "Dragon Raja Stalker",
    type: "stalker",
    example: `%prefix%command <id>`,
    start: async(naisa, m, { text }) => {
        let fetch = await fetchUrl(global.api("zenz", "/stalker/nickdragonraja", { query: text }, "apikey"))
        let caption = `Dragon Raja Stalker :\n\n`
        let i = fetch.result
        caption += `⭔ GameId : ${i.gameId}\n`
        caption += `⭔ UserName : ${i.userName}\n`
        naisa.sendText(m.from, caption, m)
    },
    isQuery: true
}