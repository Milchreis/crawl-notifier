var nodemailer = require('nodemailer');

module.exports = {
    sendViaSmtp: function(from, to, subject, text) {

        var transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        var mailOptions = {
            from,
            to,
            subject,
            text
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}