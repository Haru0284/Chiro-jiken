let { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "animecouple",
    alias: ["animecouples"],
    desc: "Generate Random Image Anime Couples",
    type: "randomanime",
    example: `%prefix%command`,
    start: async(naisa, m, {}) => {
        let fetch = await fetchUrl(global.api("zenz", "/randomanime/couples", {}, "apikey"))
        naisa.sendFile(m.from, fetch.result.male, "", m, { caption: "Random Anime Couples Male" })
        naisa.sendFile(m.from, fetch.result.female, "", m, { caption: "Random Anime Couples Female" })
    }
}