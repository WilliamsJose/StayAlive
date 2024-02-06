var amqp = require('amqplib/callback_api');
const dotenv = require("dotenv")
dotenv.config()

//amqp://rabbit_user:rabbit_password@your.server.ip.address/vhost_name
amqp.connect(process.env.HOST_URL, function(error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'stayalive';
    
    channel.assertQueue(queue, {
      durable: false
    });
    
    for(i = 0; i < 1000000; i++) {		
      const msg = `Stay Alive - ${new Date()}`;
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    }
  });

  setTimeout(function() {
    connection.close();
    process.exit(0)
  }, 500);
});
