const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "truth",
    alias: ["todt"],
    use: "<query>",
    desc: "Random Truth or Dare",
    type: "entertainment",
    example: `%prefix%command`,
    start: async(naisa, m, {}) => {
        let fetch = await fetchUrl(global.api("zenz", "/entertainment/truth", {}, "apikey"))
        naisa.sendText(m.from, fetch.result, m)
    },
}