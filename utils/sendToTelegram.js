const axios = require("axios");
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const CHAT_ID = process.env.CHAT_ID;

exports.sendToTelegram = async (message) => {
  try {
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: message,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
