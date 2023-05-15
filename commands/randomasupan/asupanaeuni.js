let { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "asupanaeuni",
    alias: ["asupanaeunicetjoaa"],
    desc: "Generate Random TikTok Asupan From Aeuni",
    type: "randomasupan",
    example: `%prefix%command`,
    start: async(naisa, m, {}) => {
        let fetch = await global.api("zenz", "/randomasupan/aeunicetjoaa", {}, "apikey")
        naisa.sendFile(m.from, fetch, "", m, { caption: "Random TikTok Asupan From Aeuni" })
    }
}