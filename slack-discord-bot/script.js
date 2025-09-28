// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-code');
    const copyBtn = document.getElementById('copy-code');
    const downloadBtn = document.getElementById('download-code');
    
    generateBtn.addEventListener('click', generateBotCode);
    copyBtn.addEventListener('click', copyToClipboard);
    downloadBtn.addEventListener('click', downloadCode);
    
    // Update feature options visibility
    updateFeatureOptions();
    
    // Add event listeners for checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateFeatureOptions);
    });
});

// Update platform-specific options
function updatePlatform() {
    const platform = document.getElementById('platform').value;
    const tokenInput = document.getElementById('bot-token');
    
    if (platform === 'slack') {
        tokenInput.placeholder = 'xoxb-your-bot-token-here';
    } else {
        tokenInput.placeholder = 'your-discord-bot-token-here';
    }
}

// Update feature options visibility
function updateFeatureOptions() {
    const features = [
        'reminders', 'reactions', 'weather', 'jokes', 'news'
    ];
    
    features.forEach(feature => {
        const checkbox = document.getElementById(`${feature}-enabled`);
        const options = document.getElementById(`${feature}-options`);
        
        if (checkbox.checked) {
            options.style.display = 'block';
        } else {
            options.style.display = 'none';
        }
    });
}

// Generate bot code based on configuration
function generateBotCode() {
    const config = getBotConfiguration();
    const platform = config.platform;
    
    let code = '';
    
    if (platform === 'slack') {
        code = generateSlackBot(config);
    } else {
        code = generateDiscordBot(config);
    }
    
    document.getElementById('bot-code').textContent = code;
}

// Get bot configuration from form
function getBotConfiguration() {
    return {
        name: document.getElementById('bot-name').value || 'TeamBot',
        platform: document.getElementById('platform').value,
        token: document.getElementById('bot-token').value,
        features: {
            reminders: {
                enabled: document.getElementById('reminders-enabled').checked,
                keywords: document.getElementById('reminder-keywords').value.split(',').map(k => k.trim()),
                interval: parseInt(document.getElementById('reminder-interval').value) || 5
            },
            reactions: {
                enabled: document.getElementById('reactions-enabled').checked,
                keywords: parseReactionKeywords(document.getElementById('reaction-keywords').value)
            },
            weather: {
                enabled: document.getElementById('weather-enabled').checked,
                apiKey: document.getElementById('weather-api-key').value,
                keywords: document.getElementById('weather-keywords').value.split(',').map(k => k.trim())
            },
            jokes: {
                enabled: document.getElementById('jokes-enabled').checked,
                keywords: document.getElementById('joke-keywords').value.split(',').map(k => k.trim())
            },
            news: {
                enabled: document.getElementById('news-enabled').checked,
                keywords: document.getElementById('news-keywords').value.split(',').map(k => k.trim()),
                rssUrl: document.getElementById('news-rss-url').value
            }
        }
    };
}

// Parse reaction keywords from textarea
function parseReactionKeywords(text) {
    const lines = text.split('\n').filter(line => line.trim());
    const reactions = {};
    
    lines.forEach(line => {
        const [keyword, reaction] = line.split(':').map(s => s.trim());
        if (keyword && reaction) {
            reactions[keyword] = reaction;
        }
    });
    
    return reactions;
}

// Generate Slack bot code
function generateSlackBot(config) {
    let code = `// ${config.name} - Slack Bot
const { App } = require('@slack/bolt');
const axios = require('axios');

// Initialize Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

// Bot configuration
const BOT_NAME = '${config.name}';
const FEATURES = ${JSON.stringify(config.features, null, 2)};

// Reminder functionality
${config.features.reminders.enabled ? generateSlackReminders(config) : ''}

// Keyword reactions
${config.features.reactions.enabled ? generateSlackReactions(config) : ''}

// Weather functionality
${config.features.weather.enabled ? generateSlackWeather(config) : ''}

// Jokes functionality
${config.features.jokes.enabled ? generateSlackJokes(config) : ''}

// News functionality
${config.features.news.enabled ? generateSlackNews(config) : ''}

// Start the app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('${config.name} is running!');
})();

module.exports = { app };`;

    return code;
}

// Generate Discord bot code
function generateDiscordBot(config) {
    let code = `// ${config.name} - Discord Bot
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Bot configuration
const BOT_NAME = '${config.name}';
const FEATURES = ${JSON.stringify(config.features, null, 2)};

// Bot ready event
client.once('ready', () => {
  console.log(\`\${BOT_NAME} is online!\`);
});

// Message handling
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  const content = message.content.toLowerCase();
  
  // Handle different features
  ${config.features.reminders.enabled ? generateDiscordReminders(config) : ''}
  ${config.features.reactions.enabled ? generateDiscordReactions(config) : ''}
  ${config.features.weather.enabled ? generateDiscordWeather(config) : ''}
  ${config.features.jokes.enabled ? generateDiscordJokes(config) : ''}
  ${config.features.news.enabled ? generateDiscordNews(config) : ''}
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);

module.exports = { client };`;

    return code;
}

// Generate Slack reminders code
function generateSlackReminders(config) {
    return `
// Reminder functionality
const reminders = new Map();

app.message(async ({ message, say }) => {
  const text = message.text.toLowerCase();
  const keywords = ${JSON.stringify(config.features.reminders.keywords)};
  
  if (keywords.some(keyword => text.includes(keyword))) {
    // Parse reminder from message
    const reminderMatch = text.match(/(?:remind|schedule|todo)\\s+(.+?)\\s+(?:in|at|for)\\s+(.+)/);
    if (reminderMatch) {
      const [, task, time] = reminderMatch;
      const reminderId = Date.now().toString();
      
      reminders.set(reminderId, {
        task,
        time,
        channel: message.channel,
        user: message.user
      });
      
      await say(\`✅ Reminder set: "\${task}" for \${time}\`);
    }
  }
});

// Check reminders every ${config.features.reminders.interval} minutes
setInterval(async () => {
  const now = new Date();
  for (const [id, reminder] of reminders) {
    // Simple time parsing (you might want to use a library like chrono-node)
    if (shouldTriggerReminder(reminder.time, now)) {
      await app.client.chat.postMessage({
        channel: reminder.channel,
        text: \`⏰ Reminder: \${reminder.task}\`
      });
      reminders.delete(id);
    }
  }
}, ${config.features.reminders.interval} * 60 * 1000);

function shouldTriggerReminder(timeStr, now) {
  // Implement your time parsing logic here
  return false; // Placeholder
}`;
}

// Generate Discord reminders code
function generateDiscordReminders(config) {
    return `
  // Reminder functionality
  const keywords = ${JSON.stringify(config.features.reminders.keywords)};
  if (keywords.some(keyword => content.includes(keyword))) {
    const reminderMatch = content.match(/(?:remind|schedule|todo)\\s+(.+?)\\s+(?:in|at|for)\\s+(.+)/);
    if (reminderMatch) {
      const [, task, time] = reminderMatch;
      await message.reply(\`✅ Reminder set: "\${task}" for \${time}\`);
    }
  }`;
}

// Generate Slack reactions code
function generateSlackReactions(config) {
    const reactions = config.features.reactions.keywords;
    let code = `
// Keyword reactions
app.message(async ({ message, say }) => {
  const text = message.text.toLowerCase();
  const reactions = ${JSON.stringify(reactions)};
  
  for (const [keyword, reaction] of Object.entries(reactions)) {
    if (text.includes(keyword.toLowerCase())) {
      await say(reaction);
      break;
    }
  }
});`;
    return code;
}

// Generate Discord reactions code
function generateDiscordReactions(config) {
    const reactions = config.features.reactions.keywords;
    let code = `
  // Keyword reactions
  const reactions = ${JSON.stringify(reactions)};
  for (const [keyword, reaction] of Object.entries(reactions)) {
    if (content.includes(keyword.toLowerCase())) {
      await message.reply(reaction);
      break;
    }
  }`;
    return code;
}

// Generate Slack weather code
function generateSlackWeather(config) {
    return `
// Weather functionality
app.message(async ({ message, say }) => {
  const text = message.text.toLowerCase();
  const keywords = ${JSON.stringify(config.features.weather.keywords)};
  
  if (keywords.some(keyword => text.includes(keyword))) {
    try {
      // Extract location from message
      const locationMatch = text.match(/weather\\s+(.+)/);
      const location = locationMatch ? locationMatch[1] : 'New York';
      
      const response = await axios.get(
        \`https://api.openweathermap.org/data/2.5/weather?q=\${location}&appid=\${process.env.WEATHER_API_KEY}&units=metric\`
      );
      
      const { name, main, weather } = response.data;
      await say(\`🌤️ Weather in \${name}: \${weather[0].description}, \${main.temp}°C\`);
    } catch (error) {
      await say('❌ Sorry, I couldn\\'t fetch the weather data.');
    }
  }
});`;
}

// Generate Discord weather code
function generateDiscordWeather(config) {
    return `
  // Weather functionality
  const weatherKeywords = ${JSON.stringify(config.features.weather.keywords)};
  if (weatherKeywords.some(keyword => content.includes(keyword))) {
    try {
      const locationMatch = content.match(/weather\\s+(.+)/);
      const location = locationMatch ? locationMatch[1] : 'New York';
      
      const response = await axios.get(
        \`https://api.openweathermap.org/data/2.5/weather?q=\${location}&appid=\${process.env.WEATHER_API_KEY}&units=metric\`
      );
      
      const { name, main, weather } = response.data;
      await message.reply(\`🌤️ Weather in \${name}: \${weather[0].description}, \${main.temp}°C\`);
    } catch (error) {
      await message.reply('❌ Sorry, I couldn\\'t fetch the weather data.');
    }
  }`;
}

// Generate Slack jokes code
function generateSlackJokes(config) {
    return `
// Jokes functionality
const jokes = [
  "Why don't scientists trust atoms? Because they make up everything! 😄",
  "I told my wife she was drawing her eyebrows too high. She looked surprised. 😂",
  "Why don't eggs tell jokes? They'd crack each other up! 🥚",
  "What do you call a fake noodle? An impasta! 🍝",
  "Why did the scarecrow win an award? He was outstanding in his field! 🌾"
];

app.message(async ({ message, say }) => {
  const text = message.text.toLowerCase();
  const keywords = ${JSON.stringify(config.features.jokes.keywords)};
  
  if (keywords.some(keyword => text.includes(keyword))) {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    await say(randomJoke);
  }
});`;
}

// Generate Discord jokes code
function generateDiscordJokes(config) {
    return `
  // Jokes functionality
  const jokeKeywords = ${JSON.stringify(config.features.jokes.keywords)};
  if (jokeKeywords.some(keyword => content.includes(keyword))) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything! 😄",
      "I told my wife she was drawing her eyebrows too high. She looked surprised. 😂",
      "Why don't eggs tell jokes? They'd crack each other up! 🥚",
      "What do you call a fake noodle? An impasta! 🍝",
      "Why did the scarecrow win an award? He was outstanding in his field! 🌾"
    ];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    await message.reply(randomJoke);
  }`;
}

// Generate Slack news code
function generateSlackNews(config) {
    return `
// News functionality
app.message(async ({ message, say }) => {
  const text = message.text.toLowerCase();
  const keywords = ${JSON.stringify(config.features.news.keywords)};
  
  if (keywords.some(keyword => text.includes(keyword))) {
    try {
      // Fetch news from RSS or API
      const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + process.env.NEWS_API_KEY);
      const articles = response.data.articles.slice(0, 3);
      
      let newsText = '📰 Latest News:\\n';
      articles.forEach((article, index) => {
        newsText += \`\${index + 1}. \${article.title}\\n\`;
      });
      
      await say(newsText);
    } catch (error) {
      await say('❌ Sorry, I couldn\\'t fetch the news.');
    }
  }
});`;
}

// Generate Discord news code
function generateDiscordNews(config) {
    return `
  // News functionality
  const newsKeywords = ${JSON.stringify(config.features.news.keywords)};
  if (newsKeywords.some(keyword => content.includes(keyword))) {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=' + process.env.NEWS_API_KEY);
      const articles = response.data.articles.slice(0, 3);
      
      let newsText = '📰 Latest News:\\n';
      articles.forEach((article, index) => {
        newsText += \`\${index + 1}. \${article.title}\\n\`;
      });
      
      await message.reply(newsText);
    } catch (error) {
      await message.reply('❌ Sorry, I couldn\\'t fetch the news.');
    }
  }`;
}

// Copy to clipboard
function copyToClipboard() {
    const code = document.getElementById('bot-code').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('Bot code copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy to clipboard');
    });
}

// Download code as file
function downloadCode() {
    const code = document.getElementById('bot-code').textContent;
    const config = getBotConfiguration();
    const filename = `${config.name.toLowerCase().replace(/\s+/g, '-')}-bot.js`;
    
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
