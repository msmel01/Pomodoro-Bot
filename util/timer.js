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
        this.work_timer_running = false;
        this.break_timer_running = false;
        this.sec_count = 0;
    }


    async runBreakTimer(interaction) {
        this.break_timer_running = true;
        var remaining = Math.ceil(this.break_time_remaining / 60000);
        await interaction.editReply(`Take a ${remaining} minute break. \n ${remaining} ${(remaining == 1) ? 'minute' : 'minutes'} remaining.`);
        this.break_timer = setInterval(async () => {
            this.break_time_remaining -= 1000;
            this.sec_count++;
            if (this.break_time_remaining <= 0) {
                this.break_timer_running = false;
                clearInterval(this.break_timer);
                await interaction.editReply('End of break period!');
            } else if (this.sec_count == 60) {
                this.sec_count = 0;
                var remaining = this.break_time_remaining / 60000;
                await interaction.editReply(`Take a ${remaining} minute break. \n ${remaining} ${(remaining == 1) ? 'minute' : 'minutes'} remaining.`);
            }
        }, 1000);
    }


    async runWorkTimer(interaction) {
        this.work_timer_running = true;
        this.work_timer = setInterval(async () => {
            this.work_time_remaining -= 1000;
            this.sec_count++;
            if (this.work_time_remaining <= 0) {
                await interaction.editReply('End of work period!');
                this.sec_count = 0;
                this.work_timer_running = false;
                clearInterval(this.work_timer);
                this.runBreakTimer(interaction);
            } else if (this.sec_count == 60) {
                this.sec_count = 0;
                var remaining = this.work_time_remaining / 60000;
                await interaction.editReply(`Started Pomodoro timer! \n ${remaining} ${(remaining == 1) ? 'minute' : 'minutes'} remaining.`);
            }
        }, 1000);
    }


    async startTimer(interaction) {
        if (this.work_time_remaining > 0) {
            var remaining = Math.ceil(this.work_time_remaining / 60000);
            await interaction.reply(`Started Pomodoro timer! \n ${remaining} ${(remaining == 1) ? 'minute' : 'minutes'} remaining.`);
            this.runWorkTimer(interaction);
        } else if (this.break_time_remaining > 0) {
            await interaction.reply('Resuming break');
            this.runBreakTimer(interaction);
        } else {
            await interaction.reply('Session is complete. Use /restart to begin another iteration or use /start with different settings.');
        }
        // add congrats message for the end of session
    }


    pauseTimer(interaction) {
        if (this.work_timer_running) {
            interaction.reply('Paused the work timer.');
            clearInterval(this.work_timer);
            this.work_timer_running = false; 
        } else if (this.break_timer_running) {
            interaction.reply('Paused the break timer.');
            clearInterval(this.break_timer);
            this.break_timer_running = false; 
        } else {
            interaction.reply('The timer was not running!');
        }
    }


    restartTimer(interaction) {

    }

}