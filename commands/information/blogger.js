const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "blogger",
    alias: ["blogspot"],
    use: "<query>",
    desc: "Get User Profile Url From Blogspot",
    type: "information",
    example: `%prefix%command <query>`,
    start: async(naisa, m, { text }) => {
        let fetch = await fetchUrl(global.api("zenz", "/information/blogger", { query: text }, "apikey"))
        naisa.sendText(m.from, fetch.result, m)
    },
    isQuery: true
}