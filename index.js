require('dotenv').config();
const { Telegraf } = require('telegraf');
const api = require('covid19-api');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Hello ${ctx.message.from.first_name}! Find out statistics on covid`));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('text', async (ctx) => {
  let data = {};

  try {
    data = await api.getReportsByCountries(ctx.message.text);

    const formatData = `
Country: ${data[0][0].country}
Cases: ${data[0][0].cases}
Deaths: ${data[0][0].deaths}
Recovered: ${data[0][0].recovered} `;
    ctx.reply(formatData);
  } catch {
    console.log('Error :(');
    ctx.reply('Error, this country not found!');
  }
});
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

console.log('Bot start!');
