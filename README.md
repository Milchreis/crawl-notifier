crawl-notifier
==============

Crawl any website and get notified via mail when changes occur

## Features

* Deadsimple configuration & usage
* Runs inside a [Docker](http://www.docker.com) container
* Uses jQuery for crawling
* Sends notifications via:
	* your [Mailgun](https://mailgun.com/) account
	* your Telegram bot
	* your SMTP mail account
* Multiple receivers possible
* Runs until the `check` was successful (returns true)

## Usage

```sh
$ docker run -d \
	-e "MAILGUN_KEY=api-key" -e "MAILGUN_DOMAIN=domain.com"\
	-v /my/local/crawlers:/data/crawlers \
	schickling/crawl-notifier
```

For each page you want to crawl define a `crawler` file in a directory you mount with the `-v` argument above. A `crawler` file should be a UMD style module, defining an objects with `receiver`, `sender`, `url` and `check` properties like in the example below. The `check` method will be invoked with jQuery as parameter.

### Environment variables 
If you want to send an email with Mailgun set the following variables:
 * MAILGUN_KEY
 * MAILGUN_DOMAIN

If you want to send a message with telegram set the following variables:
 * TELEGRAM_TOKEN
 * TELEGRAM_CHATID

If you want to send an email via SMTP set the following variables:
 * SMTP_HOST
 * SMTP_PORT
 * SMTP_USER
 * SMTP_PASS

### Example Crawler

```js
module.exports = {
	receiver: ['john.doe@gmail.com', 'pheven@gmail.com'],
	sender: 'someone@gmail.com',
	url: 'http://time.is',
	check: function($) {
		return $('#twd').text() === '23:00:00'; // bed time
	}
};
```

## Credits

* **Node Mailgun API** - https://www.npmjs.com/package/mailgun-js
* **Node Web Crawler** - https://www.npmjs.com/package/crawler

## Further readings
* [Create a Telegram bot](https://medium.com/@wk0/send-and-receive-messages-with-the-telegram-api-17de9102ab78)