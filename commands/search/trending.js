const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "trending",
    alias: ["twtrend"],
    use: "<query>",
    desc: "Twitter Trending Information",
    type: "search",
    example: `%prefix%command <country>`,
    start: async(naisa, m, { text, toUpper }) => {
        if (text) {
            let fetch = await fetchUrl(global.api("zenz", "/searching/trendtwit", { query: text }, "apikey"))
            let caption = `Twitter Trend Country : ${toUpper(text)}\n\n`
            for (let i of fetch.result.result) {
                caption += `⭔ rank : ${i.rank}\n`
                caption += `⭔ hastag : ${i.hastag}\n`
                caption += `⭔ Tweet : ${i.tweet}\n\n`
            }
            naisa.sendText(m.from, caption, m)
        } else {
            let fetch = await fetchUrl(global.api("zenz", "/searching/trendtwit", { query: "indonesia" }, "apikey"))
            let caption = `Twitter Trend Country : Indonesia\n\n`
            for (let i of fetch.result.result) {
                caption += `⭔ rank : ${i.rank}\n`
                caption += `⭔ hastag : ${i.hastag}\n`
                caption += `⭔ Tweet : ${i.tweet}\n\n`
            }
            naisa.sendText(m.from, caption, m)
        }
    },
}