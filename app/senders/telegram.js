const axios = require('axios');

module.exports = {
    sendTelegramMessage: function(token, chatId, text) {
        const url = `https://api.telegram.org/bot${token}/sendMessage`
        axios.post(url, {
                chat_id: chatId,
                text
            })
            .then(_ => {
                console.log('Successful send telegram message')
            })
            .catch(error => {
                console.error(error)
            })
    }
}