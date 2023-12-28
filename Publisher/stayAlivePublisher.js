var amqp = require('amqplib/callback_api');
const dotenv = require("dotenv")
dotenv.config()

var connOptions = {
  protocol: process.env.PROTOCOL,
  hostname: process.env.IP,
  port: process.env.PORT,
  username: process.env.USER,
  password: process.env.PASS
};

//amqp://admin:password@your.server.ip.address/vhost_name
amqp.connect(connOptions, function(error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'stayalive';
    var msg = 'Stay Alive';

    channel.assertQueue(queue, {
      durable: false
    });

	for(i = 0; i < 1000000; i++) {		
		channel.sendToQueue(queue, Buffer.from(msg));
		console.log(" [x] Sent %s", msg);
	}
  });

  setTimeout(function() {
    connection.close();
    process.exit(0)
    }, 500);
});
