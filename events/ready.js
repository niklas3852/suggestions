module.exports = async (bot) => {
	bot.awaiting[bot.user.id] = 'none';
	console.log(`${bot.locale.connected} ${bot.user.tag} (ID: ${bot.user.id})`);
	bot.user.setPresence({ activity: { name: bot.locale.presence, type: 'LISTENING' }, status: 'online' });
}