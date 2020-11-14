const Crawler = require('crawler');
const telegram = require('./senders/telegram');
const mailgun = require('./senders/mailgun');
const smtp = require('./senders/smtp');

const readdir = require('fs').readdirSync;

if (readdir('./crawlers').length === 0) {
    throw new Error('No crawlers found');
}

readdir('./crawlers').forEach(function(file) {

    const crawlerFile = require('./crawlers/' + file);

    if (!crawlerFile.receiver || !crawlerFile.sender || !crawlerFile.url || !crawlerFile.check) {
        throw new Error('Crawler properties missing');
    }

    const crawler = new Crawler({
        callback: async function(error, result, done) {
            var $ = result.$;

            if (crawlerFile.check($)) {
                var text = 'Notification for ' + crawlerFile.url;
                await sendMail(crawlerFile.sender, crawlerFile.receiver, text, text);

            } else {
                console.log('Nothing new. Wait 5 minutes...');
                setTimeout(function() {
                    crawler.queue(crawlerFile.url);
                }, 1000 * 60 * 5);
            }
        }
    });

    crawler.queue(crawlerFile.url);
});

async function sendMail(from, to, subject, text) {

    if (process.env.TELEGRAM_TOKEN && process.env.TELEGRAM_CHATID) {
        await telegram.sendTelegramMessage(
            process.env.TELEGRAM_TOKEN,
            process.env.TELEGRAM_CHATID,
            text)
    }

    if (process.env.MAILGUN_KEY && process.env.MAILGUN_DOMAIN) {
        await mailgun.sendViaMailgun(
            process.env.MAILGUN_KEY, process.env.MAILGUN_DOMAIN,
            from, to, subject, text)
    }

    if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
        await smtp.sendViaSmtp(
            process.env.SMTP_HOST, process.env.SMTP_PORT,
            process.env.SMTP_USER, process.env.SMTP_PASS,
            from, to, subject, text)
    }
}