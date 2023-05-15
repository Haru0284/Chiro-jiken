module.exports = {
	name: "hidetag",
	alias: ["ht","hdt","texttag"],
	category: "group",
	isAdmin: true,
	isGroup: true,
	desc: "Buat ngasih informasi / bikin 1 gc kesel :v",
	use: "<text>",
	async run({ msg, naisa }, { q }) {
		const gc = await naisa.groupMetadata(msg.chat);
		const mem = gc.participants;
		naisa.sendMessage(msg.chat, { text: q ? q : '', mentions: mem.map((a) => a.id) });
	},
};
