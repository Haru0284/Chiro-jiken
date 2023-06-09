const { fetchUrl, isUrl } = require("../../lib/Function")

module.exports = {
    name: "shorturl",
    alias: ["shorturl"],
    use: "<url>",
    desc: "Short Url",
    type: "convert",
    example: "%prefix%command <url>",
    start: async(naisa, m, { text }) => {
        let fetch = await fetchUrl(global.api("zenz", "/convert/shorturl", { url: isUrl(text)[0] }, "apikey"))
        naisa.sendText(m.from, fetch.result, m)
    },
    isQuery: true
}