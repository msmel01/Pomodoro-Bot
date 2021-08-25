const { MessageEmbed } = require('discord.js');

module.exports = new MessageEmbed()
.setColor('#EA5E57')
.setTitle('Pomodoro Timer Bot')
.setURL('https://github.com/msmel01/Pomodoro-Bot')
.setDescription('The pomodoro timer bot is an open-source discord bot that does what its name indicates. You can use this bot to have timed work and break sessions with your community.')
.setThumbnail('https://i.ibb.co/F5c4crB/pomodoro-bot-icon.png')
.addFields(
    { name: '/work', value: 'Set how many minutes a work session lasts. 50 by default.'},
    { name: '/break', value: 'Set how many minutes a break lasts. 10 by default.'},
    { name: '/start', value: 'Start the timer.'},
    { name: '/pause', value: 'Pause the timer. You can continue where you left off by using the /start command.'},
    { name: '/restart', value: 'Reset the timer and start from the beginning of your session.'},
    { name: '/repeat', value: 'Set the number of pomodoro sessions. The timer will automatically run for the number you specify. 1 by default.'},
    { name: '/help', value: 'See this again.'},
)
.addField('Suggestions or issues?', 'Let me know on my github page (click the title of this message to go there)!', true)
