const redis =  require("redis")

const subscriber = redis.createClient({host : 'dockersite.me', port : 6379})

subscriber.on("notification", function (channel, message) {
    console.log("message", message,channel)
});
subscriber.subscribe("notification");
