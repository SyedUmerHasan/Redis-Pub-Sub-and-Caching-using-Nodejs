const redis =  require("redis")


const publisher = redis.createClient({host : 'dockersite.me', port : 6379})

publisher.publish("notification", "My New Notication", function(){
    console.log("Message Published")
});