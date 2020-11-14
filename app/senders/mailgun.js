const mailgun = require("mailgun-js");

module.exports = {
    send: function(apiKey, domain, from, to, subject, text) {
        const mg = mailgun({ apiKey, domain });
        const data = {
            from,
            to,
            subject,
            text
        };

        mg.messages().send(data, function(error, body) {
            if (error) {
                console.error(error)
            } else {
                console.log(body);
            }
        });
    }
}