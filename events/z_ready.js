const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const mongodbURL = process.env.mongoURL;

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.user.setActivity({
            name: 'L2 Vise',
            type: ActivityType.Playing,
        })

        console.log('Ready!');
        
        if (!mongodbURL) return
        
        await mongoose.connect(mongodbURL);

        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },
                    
                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};