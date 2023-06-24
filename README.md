# Simple messaging service to maintain Cloud Oracle up
---
## How can you setup Consumer:

### Installing docker and running rabbitmq-server on Cloud
**Uninstall old docker versions**
`sudo apt-get remove docker docker-engine docker.io containerd runc`

**Update ubuntu softwares**
`sudo apt-get update && sudo apt-get upgrade -y`

**Permit apt to use HTTPS**
`sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common`

**Add docker official GPG key**
`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`

**Setup repo**
`sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`

**Install DockerCE**
`sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io`

**Enable Docker to start on boot**
`systemctl enable docker`

**Then run this command changing the USER and PASS**
`sudo docker run -d --restart unless-stopped --hostname my-rabbit -p 15672:15672 -p 5672:5672 --name rabbitmq-server -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin rabbitmq:3-management`

### Starting service
>To run in background you can use SCREEN

>Open file StayAliveConsumer.java and change de USERNAME and PASSWORD to the same as the previous docker command

**Then build and run**
> You will need to download jar files

`javac -cp amqp-client-5.16.0.jar StayAliveConsumer.java`
`java -cp .:amqp-client-5.16.0.jar:slf4j-api-2.0.7.jar:slf4j-simple-2.0.7.jar StayAliveConsumer`

---

### Send messages to server using Publisher
**After installing node and running *npm i* just send menssage running:**
`node stayAlivePublisher.js`
