const fs = require("fs")

module.exports = {
    name: "Autobio",
    alias: ["aread"],
    use: "<options>",
    desc: "Enable or disable Autobio Mode",
    type: "owner",
    example: "%prefix%command enable or disable",
    start: async(naisa, m, { text, prefix, command }) => {
        if (text === 'enable') {
            if (config.options.autobio == true) return m.reply('Autobio already active')
            config.options.autobio = true
            fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
            m.reply(`Autobio Success activated`)
        } else if (text === 'disable') {
            if (config.options.autobio === false) return m.reply('Autobio already deactive')
            config.options.autobio = false
            fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
            m.reply(`Autobio Success deactivated`)
        } else {
            m.reply(`*⭔ Autobio Status:* ${config.options.autobio ? 'Activated' : 'Deactivated'}\n\n_Pilih enable atau disable!_`)
        }
    },
    isOwner: true
}