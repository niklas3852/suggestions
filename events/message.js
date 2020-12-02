const Discord = require("discord.js");

module.exports = async (bot, message) => {
	let prf = bot.config.prefix;
	let authID = message.author.id;
	if(message.author.bot) return;
	if(!message.guild) {
		if(bot.awaiting[authID] && (bot.awaiting[authID] == 'start' || bot.awaiting[authID] == 'title' || bot.awaiting[authID] == 'story')) {
			if(message.content == `${prf}${bot.locale.start.command}` && bot.awaiting[authID] == 'start') {
				message.react('✅').then(() => {
					bot.awaiting[authID] = 'title';
					return message.reply(bot.locale.story.title);
				}).catch(console.error);
			} else if(bot.awaiting[authID] == 'title') {
				bot.story[authID] = {
					title: message.content,
					story: null
				};
				message.react('✅').then(() => {
					bot.awaiting[authID] = 'story';
					return message.reply(bot.locale.story.text);
				}).catch(console.error);
			} else if(bot.awaiting[authID] == 'story') {
				bot.story[authID].story = message.content;
				message.react('✅').then(async () => {
					bot.awaiting[authID] = 'none';

					let staffEmbed = new Discord.MessageEmbed()
						.setColor('#FFBF00')
						.setFooter(`${bot.locale.embed.submittedAt}:`)
						.setThumbnail(message.author.displayAvatarURL(dynamic=true))
						.setTimestamp()
						.setDescription(`**${bot.locale.embed.title}:** ${bot.story[authID].title}\n**${bot.locale.embed.story}:** ${bot.story[authID].story}`)
						.setTitle(`${bot.locale.embed.storyBy} ${message.author.tag} (ID: ${message.author.id})`);

					let acceptedEmbed = new Discord.MessageEmbed()
						.setColor('#00FF00')
						.setFooter(`${bot.locale.embed.submittedAt}:`)
						.setThumbnail(message.author.displayAvatarURL(dynamic=true))
						.setTimestamp()
						.setDescription(`**${bot.locale.embed.title}:** ${bot.story[authID].title}\n**${bot.locale.embed.story}:** ${bot.story[authID].story}`)
						.setTitle(`${bot.locale.embed.storyBy} ${message.author.tag} (ID: ${message.author.id})`);

					let deniedEmbed = new Discord.MessageEmbed()
						.setColor('#FF0000')
						.setFooter(`${bot.locale.embed.submittedAt}:`)
						.setThumbnail(message.author.displayAvatarURL(dynamic=true))
						.setTimestamp()
						.setDescription(`**${bot.locale.embed.title}:** ${bot.story[authID].title}\n**${bot.locale.embed.story}:** ${bot.story[authID].story}`)
						.setTitle(`${bot.locale.embed.storyBy} ${message.author.tag} (ID: ${message.author.id})`);

					let publicTitle = await bot.locale.embed.publicTitle;
					publicTitle = publicTitle.replace('AUTHOR', message.author.tag).replace('TITLE', bot.story[authID].title);
					let publicEmbed = new Discord.MessageEmbed()
						.setColor('#00FF00')
						.setFooter(`${bot.locale.embed.submittedAt}:`)
						.setThumbnail(message.author.displayAvatarURL(dynamic=true))
						.setTimestamp()
						.setDescription(bot.story[authID].story)
						.setTitle(publicTitle);

					bot.story[authID] = null;

					let staffChannel = bot.channels.cache.find(x => x.id == bot.config.staffChannelID);
					
					if(staffChannel) {
						const ACCEPT = '✅';
						const REJECT = '❌';
						const filter = (reaction, user) => [ACCEPT, REJECT].includes(reaction.emoji.name) && !user.bot;

						const msg = await staffChannel.send(staffEmbed);
						message.reply(bot.locale.story.submitted);
						msg.react('✅');
						msg.react('❌');

						const reactions = await msg.awaitReactions(filter, {max: 1, time: 604800000, errors: ['time']});
						const choice = reactions.get(ACCEPT) || reactions.get(REJECT);

						if(choice.emoji.name === ACCEPT) {
							let publicChannel = bot.channels.cache.find(x => x.id == bot.config.publicChannelID);
							if(publicChannel) {
								publicChannel.send(publicEmbed);
								msg.edit(acceptedEmbed);
								return message.reply(bot.locale.story.accepted);
							} else {
								return message.channel.send(bot.locale.publicNotFound);
							}
						} else if (choice.emoji.name === REJECT) {
							msg.edit(deniedEmbed);
							return message.reply(bot.locale.story.denied);
						}
					} else return message.reply(bot.locale.tryAgainLater);
				});
			}
		} else {
			bot.awaiting[authID] = 'start';
			let startText = await bot.locale.start.text;
			return message.reply(startText.replace('PRF', prf).replace('START_CMD', bot.locale.start.command));
		}
	} else return;
};