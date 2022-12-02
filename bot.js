const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('5694433347:AAGZ8rkAc4nE89c_tteeWFoAhyjW47mTn-A');
bot.start((ctx) => ctx.reply('Привет! Отправь мне свое местоположение, а расскажу тебе о погоде'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.on('message',async (ctx) => {
    if (ctx.message.location) {
    console.log(ctx.message.location);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=4c28464efe9769ba6cb4f915b9920c10`;
   const response = await axios.get(url);
   console.log(response);
   let tempCel = (response.data.main.temp - 273).toFixed(0);
   let tempFar = (1.8 * tempCel + 32).toFixed(0);
   let tempKel = response.data.main.temp;
   ctx.reply(`Вы находитесь в ${response.data.name}: температура: по шкале Цельсия  ${tempCel}, по шкале Кельвина  ${tempKel}, по шкале Фарегнейта ${tempFar}. Спасибо, что зашел! `);
    } 
})

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));