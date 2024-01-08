import express from 'express';
import bodyParser from 'body-parser';
import {Client, GatewayIntentBits, TextChannel} from 'discord.js';

const app = express();
const port = 3000; // You can choose any port you like

// This will help us read JSON from POST requests
app.use(bodyParser.json());
export function startServer(client: Client) {
    // ... (rest of the server code)
    app.use(bodyParser.urlencoded({ extended: true }));
    app.post('/postBuildNotification', (req, res) => {
        const link = req.body.link; // We expect a "link" field in the POST request
        const guild = client.guilds.cache.get('1005634748741337119');
        const channel = guild.channels.cache.get('1158401379921035276') as TextChannel;

        const roleID = '1162536994279268463'; // Replace with the actual Role ID
        const roleMention = `<@&${roleID}>`;

        channel.send(`${roleMention} New build available at ${link}`)
            .then(() => res.send('Notification Sent!'))
            .catch(error => {
                console.error('Error sending message to Discord:', error);
                res.status(500).send('Error sending notification.');
            });
    });

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

}
