const axios = require('axios');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    credits: "Ronald Allen Albania",
    description: "Get a response from GPT",
    commandCategory: "AI",
    usages: "ai [prompt]",
    cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
    const prompt = args.join(" ");

    if (!prompt) {
        return api.sendMessage("Hello there, how can I assist you today?", event.threadID, event.messageID);
    }

    try {
    const apiUrl = `https://cyni-api-collection.onrender.com/api/gpt?question=${prompt}`;
    const response = await axios.post(apiUrl);
    const responseData = response.data;

    api.sendMessage(`${responseData.ai}`, event.threadID, event.messageID);
} catch (error) {
    console.error('ERROR', error.response?.data || error.message);
    api.sendMessage('An error occurred while processing the command.', event.threadID);
}
};
