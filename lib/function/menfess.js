module.exports = async function (msg,naisa,prefix,body){
  try {
    naisa.menfess = naisa.menfess ? naisa.menfess : {}
    const find = Object.values(naisa.menfess).find(menpes => [menpes.a, menpes.b].includes(msg.sender) && menpes.status == 'chatting')
        if(msg.isGroup) return
        if(find == undefined) return
        if(body == `${prefix}stopmenfess`) return
        const to = find.a == msg.sender ? find.b : find.a
        naisa.copyNForward(to, msg, true)
  } catch (e){
         await naisa.sendMessage("6289513081052@s.whatsapp.net", {
			text: util.format(e),
		})
       }
}
