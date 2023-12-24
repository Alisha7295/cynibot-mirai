module.exports.config = {
  name: "help",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Ronald Allen Albania",
  description: "Commands List",
  commandCategory: "system",
  usages: "module name",
  cooldowns: 1,
  envConfig: {
    autoUnsend: false,
    delayUnsend: 300
  }
};

module.exports.languages = {
  "en": {
    "moduleInfo": "➤ **Command:** %1\n**Usage:** %3\n**Category:** %4\n**Cooldown:** %5 second(s)\n**Permission:** %6\n**Description:** %2\n**Module coded by:** %7",
    "helpList": '𝖠𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖢𝗈𝗆𝗆𝖺𝗇𝖽𝗌:\n%s',
    "user": "User",
    "adminGroup": "Admin group",
    "adminBot": "Admin bot"
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;

  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};

module.exports.run = function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  if (args[0] == "all") {
    const commandList = Array.from(commands.keys()).map(command => `• ${command}`).join('\n');

    return api.sendMessage(`𝖠𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖢𝗈𝗆𝗆𝖺𝗇𝖽𝗌:\n${commandList}`, threadID, messageID);
  }

  if (!command) {
    const commandList = Array.from(commands.keys()).map(command => `• ${command}`).join('\n');
    return api.sendMessage(`𝖠𝗏𝖺𝗂𝗅𝖺𝖻𝗅𝖾 𝖢𝗈𝗆𝗆𝖺𝗇𝖽𝗌:\n${commandList}\n━━━━━━━━━━━━━━━━\n•Admin: Ronald Allen Albania\n•𝖡𝗈𝗍 𝖭𝖺𝗆𝖾: ${global.config.BOTNAME}\n\n•:𝖢𝗈𝗆𝗆𝖺𝗇d 𝖫𝖾𝗇𝗀𝗍𝗁: ${commands.size}\n•:𝖡𝗈𝗍 𝖭𝖺𝗆𝖾: ${global.config.BOTNAME}\n•:𝖯𝗋𝖾𝖿𝗂𝗑: ${prefix}`, threadID, messageID);
  }

  const commandInfo = getText("moduleInfo", command.config.name, command.config.description, `${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits);

  return api.sendMessage(commandInfo, threadID, messageID);
};
