module.exports = {
	name: "tes",
	alias: ["tesbot", "testing"],
	category: "info",
	desc: "hai!! ada yang bisa itsuka bantu?",
	isSpam: true,
	async run({ msg }) {
		await msg.reply(`work nih`);
	},
};