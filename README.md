# AdventsMärchenland-Bot

![](https://t4.ftcdn.net/jpg/05/24/99/33/360_F_524993392_tR3RoTlHTdPYcFJgTydzFdHPjzrW8Gev.jpg)


## Welcome!
AdventsMärchenland is a public submission and announcement Discord-Bot, built in node.js for users to submit stories via DMs to the bot.  🧚
After a review through your staff team, the bot will publish your content in a pre-defined channel.

I originally coded this bot for Marmeladenoma as a winter special in 2020 (https://discord.gg/marmeladenoma) but feel free to use it for your own projects as well! :D


> If you have any questions, feel free to contact me via discord: *Niklas#4871*


## Starting up
### Installation
> I have used "Webstorm" and "VisualStudioCode" while coding and running the project but feel free to use any IDE you want:D
- Download the folder from my github repo or clone it with **git clone**
- If the file is downloaded as a zip file, you have to unzip it

### Setting up
- In the *config.json* file you can change all parameters you need.

```html
{
	"prefix": "!", //This is the prefix for the bot commands, you can customize it to whatever you like
	"token": "", //Enter your Discord-Token here. If you don´t have an application yet, create one at developer.discord
	"staffChannelID": "", //This is the Channel-ID in which the but will send the submissions from your users. Here, only your staff team should have access, as this is the channel where all the submissions get accepted or declined
	"publicChannelID": "" //In this string you should put the publicChannelID in, in which the bot will send the accepted subbmissions to. Here, everyone should have access as this will be the announcement channel
}
```

- The *locale.json* file is mainly for the replies and messages the bot gives to your actions and submissions.
  
### Starting
- Copy the path where you saved your project in. (If the file is a .zip file, you have to unzip it first)
- Open your favourite terminal and navigate to your project folder:
  **cd {your project-folder-path}**
- You should now be in your project folder. If that´s been successfull, you can install all required node dependencies using
  **npm i**
- Now you can start up your bot with **node.**

Have fun and stay healthy! 🤩
