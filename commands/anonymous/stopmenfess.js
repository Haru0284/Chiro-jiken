const util = require('util')

module.exports = {
  name: "stopmenfess",
  alias: ["stopmenfess","menfessstop"],
  category: "anonymous",
  desc: "Menfess chat",
  isPrivate: true,
  async run({msg,naisa}){
    try{
    naisa.menfess = naisa.menfess ? naisa.menfess : {}
    find = Object.values(naisa.menfess).find(menpes => [menpes.a, menpes.b].includes(msg.sender))
    if(!find) return msg.reply("Kamu belum memulai menfess..")
    const to = find.a == msg.sender ? find.b : find.a
    naisa.sendMessage(to, {text: "_Partner meninggalkan Obrolan.._"})
    await msg.reply("*^Done..*")
    delete naisa.menfess[find.id]
    return !0
  } catch (e){
  }
  }
}
