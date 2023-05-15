const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "detiknews",
    alias: ["detiknews"],
    desc: "Latest News From Detiknews",
    type: "news",
    example: `%prefix%command`,
    start: async(naisa, m, {}) => {
        let fetch = await fetchUrl(global.api("zenz", "/news/detiknews", {}, "apikey"))
        let caption = `Latest News From Detiknews\n\n`
        for (let i of fetch.result) {
            caption += `⭔ Judul Berita : ${i.berita}\n`
            caption += `⭔ Di Upload : ${i.berita_diupload}\n`
            caption += `⭔ Url : ${i.berita_url}\n\n`
        }
        naisa.sendFile(m.from, fetch.result[0].berita_thumb, "", m, { caption })
    }
}
