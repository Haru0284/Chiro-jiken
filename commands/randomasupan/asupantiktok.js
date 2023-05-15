let { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "asupantiktok",
    alias: ["asupantiktok"],
    desc: "Generate Random TikTok Asupan 2",
    type: "randomasupan",
    example: `%prefix%command`,
    start: async(naisa, m, {}) => {
        let fetch = await global.api("zenz", "/randomasupan/asupantiktok", {}, "apikey")
        naisa.sendFile(m.from, fetch, "", m, { caption: "Random TikTok Asupan 2" })
    }
}