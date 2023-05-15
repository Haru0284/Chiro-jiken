require("./dryan")
const P = require ('pino')
const { Boom } = require ('@hapi/boom')
const { default: makeWASocket, delay, DisconnectReason, fetchLatestBaileysVersion, makeInMemoryStore, useMultiFileAuthState, useSingleFileAuthState,  jidNormalizedUser } = require ('@adiwajshing/baileys')
const fs = require("fs")
const path = require("path")
const { Collection, Simple, Store } = require("./lib")

const Welcome = require("./lib/Welcome")
const config = JSON.parse(fs.readFileSync('./config.json'))
const { serialize, WAConnection } = Simple
const Commands = new Collection()

global.prefa = /^[#$+.?_&<>!/\\]/
Commands.prefix = prefa
 
const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) })
store.readFromFile('./session/baileys_store.json')
setInterval(() => {
	store.writeToFile('./session/baileys_store.json')
}, 10000)

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in config.APIs ? config.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: config.APIs.apikey } : {}) })) : '')

const readCommands = () => {
    let dir = path.join(__dirname, "./commands")
    let dirs = fs.readdirSync(dir)
    let listCommand = {}
    try {
        dirs.forEach(async (res) => {
            let groups = res.toLowerCase()
            Commands.type = dirs.filter(v => v !== "_").map(v => v)
            listCommand[groups] = []
            let files = fs.readdirSync(`${dir}/${res}`).filter((file) => file.endsWith(".js"))
            //console.log(files)
            for (const file of files) {
                const command = require(`${dir}/${res}/${file}`)
                listCommand[groups].push(command)
                Commands.set(command.name, command)
                delay(100)
            }
        })
        Commands.list = listCommand
    } catch (e) {
        console.error(e)
    }
}

const connect = async () => {
    await readCommands()
    let { state, saveCreds } = await useMultiFileAuthState(path.resolve('./session'))
    let { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

    let connOptions = {
        version,
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        patchMessageBeforeSending: (message) => {

                const requiresPatch = !!(
                  message.buttonsMessage
              	|| message.templateMessage
              	|| message.listMessage
                );
                if (requiresPatch) {
                    message = {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: {
                                    deviceListMetadataVersion: 2,
                                    deviceListMetadata: {},
                                },
                                ...message,
                            },
                        },
                    };
                }
                return message;
    },
        auth: state,
        syncFullHistory: true
    }

    const naisa = new WAConnection(makeWASocket(connOptions))
    //global.Store = Store.bind(naisa)

    naisa.ev.on("creds.update", saveCreds)

    naisa.ev.on("connection.update", async(update) => {
        if (update.connection == "open" && naisa.type == "legacy") {
            naisa.user = {
                id: naisa.state.legacy.user.id,
                jid: naisa.state.legacy.user.id,
                name: naisa.state.legacy.user.name
            }
        }
        const { lastDisconnect, connection } = update
        if (connection) {
            console.info(`Connection Status : ${connection}`)
        }

        if (connection == "close") {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); naisa.logout(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); connect(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); connect(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); naisa.logout(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); process.exit(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); connect(); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); connect(); }
            else naisa.end(`Unknown DisconnectReason: ${reason}|${connection}`)
        }
    })

    // Welcome
    naisa.ev.on("group-participants.update", async (m) => {
		Welcome(naisa, m)
	})

    naisa.ev.on("messages.upsert", async (chatUpdate) => {
        m = serialize(naisa, chatUpdate.messages[0])

        if (!m.message) return
        if (m.key && m.key.remoteJid == "status@broadcast") return
        if (m.key.id.startsWith("BAE5") && m.key.id.length == 16) return
        
        if (config.options.autoRead) await naisa.readMessages([m.key])
        require("./naisa")(naisa, m, Commands, chatUpdate)
    })

    if (naisa.user && naisa.user?.id) naisa.user.jid = jidNormalizedUser(naisa.user?.id)

	return naisa

}

connect()
