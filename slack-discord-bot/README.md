# Slack/Discord Bot Builder

A comprehensive web application that generates intelligent bots for team communication platforms. Create custom bots with reminders, keyword reactions, weather data, jokes, and news fetching capabilities.

## Overview

The Slack/Discord Bot Builder streamlines the process of creating intelligent communication bots. Users can configure various features and generate production-ready bot code for both Slack and Discord platforms with minimal setup required.

## Features

- **Multi-Platform Support**: Generate bots for both Slack and Discord
- **Reminder System**: Set and manage automated reminders
- **Keyword Reactions**: Respond to specific keywords with custom reactions
- **Weather Integration**: Fetch and display weather information
- **Jokes & Fun**: Provide entertainment with random jokes
- **News Fetching**: Display latest news and company updates
- **Easy Configuration**: Visual interface for bot setup
- **Code Generation**: Production-ready bot code output

## Supported Platforms

### Slack
- **Framework**: Slack Bolt framework
- **Features**: All features supported
- **Setup**: OAuth and Socket Mode support
- **Dependencies**: @slack/bolt, axios

### Discord
- **Framework**: Discord.js
- **Features**: All features supported
- **Setup**: Bot token authentication
- **Dependencies**: discord.js, axios

## Bot Features

### 📅 Reminders
- **Keyword Detection**: Responds to "remind", "schedule", "todo"
- **Time Parsing**: Natural language time parsing
- **Automated Delivery**: Sends reminders at specified times
- **Channel Integration**: Works in any channel or DM

### 🔍 Keyword Reactions
- **Custom Keywords**: Define your own trigger words
- **Emoji Responses**: React with custom emojis
- **Multiple Triggers**: Support for multiple keyword-reaction pairs
- **Case Insensitive**: Works regardless of capitalization

### 🌤️ Weather Data
- **Location Support**: Get weather for any city
- **API Integration**: OpenWeatherMap API integration
- **Rich Formatting**: Temperature, conditions, and descriptions
- **Error Handling**: Graceful fallback for API failures

### 😄 Jokes & Fun
- **Random Jokes**: Built-in joke database
- **Keyword Triggers**: Responds to "joke", "funny", "humor"
- **Variety**: Multiple joke categories and styles
- **Engagement**: Encourages team interaction

### 📰 Company News
- **News API**: Integration with news services
- **RSS Support**: Optional RSS feed integration
- **Top Headlines**: Latest news summaries
- **Customizable**: Company-specific news sources

## How It Works

### Step 1: Bot Configuration
1. **Bot Name**: Choose a name for your bot
2. **Platform Selection**: Choose between Slack or Discord
3. **Token Setup**: Enter your bot token (for demonstration)

### Step 2: Feature Selection
1. **Enable Features**: Check the features you want
2. **Configure Options**: Set keywords, API keys, and parameters
3. **Customize Responses**: Define custom reactions and messages

### Step 3: Code Generation
1. **Generate Code**: Click to create your bot code
2. **Review Output**: Check the generated code
3. **Copy/Download**: Export the code for deployment

## Generated Code Structure

### Slack Bot Example
```javascript
const { App } = require('@slack/bolt');
const axios = require('axios');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

// Feature implementations
app.message(async ({ message, say }) => {
  // Handle different bot features
});
```

### Discord Bot Example
```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('messageCreate', async (message) => {
  // Handle different bot features
});
```

## Setup Instructions

### Slack Setup
1. **Create App**: Go to [Slack API](https://api.slack.com/apps)
2. **Get Tokens**: Obtain bot token and signing secret
3. **Install Dependencies**: `npm install @slack/bolt axios`
4. **Deploy Code**: Copy generated code to your server
5. **Set Environment Variables**: Configure tokens and API keys

### Discord Setup
1. **Create Application**: Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. **Create Bot**: Generate bot token and invite to server
3. **Install Dependencies**: `npm install discord.js axios`
4. **Deploy Code**: Copy generated code to your server
5. **Set Environment Variables**: Configure tokens and API keys

## Environment Variables

### Required Variables
```bash
# Slack
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
SLACK_APP_TOKEN=xapp-your-app-token

# Discord
DISCORD_TOKEN=your-discord-bot-token

# Optional APIs
WEATHER_API_KEY=your-openweathermap-key
NEWS_API_KEY=your-newsapi-key
```

## File Structure

```
slack-discord-bot/
├── index.html          # Main HTML file with interface
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality and generators
└── README.md           # This documentation
```

## Use Cases

### Team Communication
- **Daily Standups**: Automated reminders for team meetings
- **Project Updates**: News and information sharing
- **Team Building**: Jokes and fun interactions
- **Weather Updates**: Daily weather for remote teams

### Business Automation
- **Customer Support**: Automated responses to common questions
- **Internal Communications**: Company news and updates
- **Scheduling**: Meeting reminders and calendar integration
- **Monitoring**: System status and alerts

### Community Management
- **Moderation**: Keyword-based responses and reactions
- **Engagement**: Fun interactions and entertainment
- **Information**: Weather, news, and useful data
- **Support**: Help and assistance features

## Technical Implementation

### Code Generation
- **Template System**: Framework-specific code templates
- **Feature Integration**: Modular feature implementation
- **Error Handling**: Robust error handling and fallbacks
- **Best Practices**: Follows platform-specific best practices

### Bot Architecture
- **Event-Driven**: Responds to platform events
- **Modular Design**: Separate feature modules
- **Scalable**: Easy to extend with new features
- **Maintainable**: Clean, well-documented code

## Browser Compatibility

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Clipboard API support for copy functionality

## Performance Features

- **Client-Side Generation**: No server required for code generation
- **Fast Processing**: Instant bot code generation
- **Memory Efficient**: Lightweight JavaScript implementation
- **Responsive Design**: Works on all screen sizes

## Development Notes

This tool was developed as part of an internship program to address the common need for team communication bots. The builder reduces the complexity of bot development while ensuring best practices are followed.

## Future Enhancements

- **More Platforms**: Support for Microsoft Teams, Telegram
- **Advanced Features**: AI integration, natural language processing
- **Custom Commands**: User-defined command system
- **Analytics**: Bot usage and engagement metrics
- **Deployment**: One-click deployment options
- **Templates**: Pre-built bot templates for common use cases

## License

Copyright © 2025 Noah Khomer. All rights reserved.

## Contributing

This is a development tool designed to simplify bot creation for teams and communities. For questions or feedback, please contact the developer.

---

*Build intelligent bots in minutes, not hours. Focus on your team's needs while we handle the technical complexity.*
