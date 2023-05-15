const { fetchUrl } = require("../../lib/Function")

module.exports = {
    name: "hololive",
    alias: ["hololive"],
    desc: "Generate Random Holo Live Image From Apis",
    type: "randomanime",
    example: `%prefix%command <type>`,
    start: async(naisa, m, { text, toUpper }) => {
        let fetch = await fetchUrl(global.api("zenz", "/randomanime/hololive", {}, "apikey"))
        let buttons = [
            {buttonId: `hololive`, buttonText: { displayText: 'NEXT'}, type: 1 }
        ]
        let buttonMessage = {
            image: { url: fetch.result.image },
            caption: fetch.result.caption,
            footer: config.footer,
            buttons: buttons,
            headerType: 4
        }
        naisa.sendMessage(m.from, buttonMessage, { quoted: m })
    },
}