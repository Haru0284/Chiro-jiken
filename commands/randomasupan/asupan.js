let { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "asupan",
    alias: ["asupan"],
    desc: "Generate Random TikTok Asupan",
    type: "randomasupan",
    example: `%prefix%command`,
    start: async(naisa, m, {}) => {
        let fetch = await global.api("zenz", "/randomasupan/asupan", {}, "apikey")
        naisa.sendFile(m.from, fetch, "", m, { caption: "Random TikTok Asupan" })
    }
}