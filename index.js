const express =  require("express")
const fetch =  require("node-fetch")
const redis =  require("redis")

const PORT = process.env.PORT || 5000; 
const REDIS_PORT = process.env.PORT || 6379; 

const client = redis.createClient({host : 'dockersite.me', port : 6379})
const app = express();

app.get("/", (req, res)=>{
    client.publish("notification", "My New Notication", function(){

        console.log("Message Published")
    });
    res.send("sent")
})

app.listen(5000, () => { 
    console.log(`NodeJs is working on ${PORT}`)
})
client.on('ready',function() {
    console.log(`Redis is working on ${REDIS_PORT}`);
});

client.on("error", function (err) {
    console.log("Error " + err);
});