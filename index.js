const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({
	disableEveryone: false,
	fetchAllMembers: true,
});

bot.config = require("./config.json");
bot.locale = require("./locale.json");
bot.awaiting = {};
bot.story = {};

fs.readdir("./events/", async (err, files) => {
	if(err) return console.error(err);
	await files.forEach(file => {
		if(file.endsWith(".js")) {
			const event = require(`./events/${file}`);
			let eventName = file.split(".")[0];
			bot.on(eventName, event.bind(null, bot));
			delete require.cache[require.resolve(`./events/${file}`)];
		}
	});

	bot.login(bot.config.token).catch(e => {
		console.error(`ERROR - DM Niklas#4871 on Discord with this:`, e);
	});
});
