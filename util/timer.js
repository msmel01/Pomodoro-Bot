const async = require('async');

module.exports = class Timer {
    // more code reuse possible
    // use embed instead of plain messages for replies
    // option to join voice channel and play alarm?
    // send a congrats message at the end of one iteration?

    constructor(client, work_time, break_time) {
        this.client = client;
        this.work_time = work_time;
        this.break_time = break_time;
        this.work_time_remaining = work_time * 60000; // in milliseconds
        this.break_time_remaining = break_time * 60000; // in milliseconds
        this.running = false;
    }


    async runBreakTimer(interaction) { // add callback param
        var count = 0;
        await interaction.editReply(`Take a ${this.break_time_remaining / 60000} minute break. \n ${this.break_time_remaining / 60000} minutes remaining.`);
        this.break_timer = setInterval(async () => {
            this.break_time_remaining -= 1000;
            count++;
            if (this.break_time_remaining <= 0) {
                count = 0;
                clearInterval(this.break_timer);
                await interaction.editReply('End of break period!');
            } else if (count == 60) {
                count = 0;
                await interaction.editReply(`Take a ${this.break_time_remaining / 60000} minute break. \n ${this.break_time_remaining / 60000} minutes remaining.`);
            }
        }, 1000);
    }


    async runWorkTimer(interaction) {
        var count = 0;
        this.work_timer = setInterval(async () => {
            this.work_time_remaining -= 1000;
            count++;
            if (this.work_time_remaining <= 0) {
                await interaction.editReply('End of work period!');
                count = 0;
                clearInterval(this.work_timer);
                this.runBreakTimer(interaction);
            } else if (count == 60) {
                count = 0;
                await interaction.editReply(`Started Pomodoro timer! \n ${this.work_time_remaining / 60000} minutes remaining.`);
            }
        }, 1000);
    }


    async startTimer(interaction) {
        this.running = true;
        await interaction.reply(`Started Pomodoro timer! \n ${this.work_time_remaining / 60000} minutes remaining.`);
        this.runWorkTimer(interaction);
    }


    pauseTimer(interaction) {

    }


    restartTimer(interaction) {

    }

}