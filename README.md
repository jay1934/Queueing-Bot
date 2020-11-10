<div align="center">

# Queueing Bot

[Installation](#Installation) • [How to Use](#How-to-Use)

---

## Installation

</div>

##### Prerequisite

- To use this bot, Node.js 12.0.0 or newer must be [installed](https://nodejs.org/en/download/).

##### Downloading and installing steps

1.  **[Download](https://github.com/jay1934/Queueing-Bot/archive/main.zip)** the `zip` file.

2.  Configure the Bot:

    - Run `npm i`
    - You will need to [create a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) in the **[developers space](https://discordapp.com/developers/applications/me)**
    - Enable both Priviledged Intents
    - Replace the placeholders in [`config.json`](/config.json) with your bot token and the ID of the role you would like the bot to alert when someone is up next in queue.

3.  Invite the Bot to your Server:

    - In your bot's application page, navigate to [OAUTH2](https://discord.com/developers/applications/771430839250059274/oauth2)
    - In the "scopes" section, select `bot`
    - In the "bot permission" section, select:

      - `ADMINISTRATOR`

      This will account for permissions needed on all three features.

    - Copy and paste the generated invite link!

4.  Get the Bot Online
    - Run `node index.js`
    - **The bot is now operational ! 🎉**

<br>

---

<div align="center">

## How to Use

</div>

The bot will send the initial queue message when you use the [`.init`](/events/message.js) command. People can then join via reaction, and will be added to the waiting list, or immediately admitted if the waiting list is empty.

<br>

Once you or someone else in the buffing team have finished serving them, you can react to the check mark, and everyone in the queue will move up one space!

<br>

This is a very simple bot focusing on ease of usage.
