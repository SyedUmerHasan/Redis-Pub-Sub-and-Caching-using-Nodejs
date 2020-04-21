const express =  require("express")
const fetch =  require("node-fetch")
const redis =  require("redis")

const PORT = process.env.PORT || 5000; 
const REDIS_PORT = process.env.PORT || 6379; 

const client = redis.createClient({host : 'dockersite.me', port : 6379})
const app = express();

async function getRepository(req,res, next){
    try{
        const { username } = req.params;
        
        const GitResponse = await fetch(`https://api.github.com/users/${username}`);

        const data = await GitResponse.json();

        const repo = data.public_repos;

        client.set(username , repo , (error, reply)=>{
            console.log("getRepository -> reply", reply)
            console.log("getRepository -> error", error)
        });
        res.send("Public URL =  " + repo);
    }
    catch(err){
        console.error(err);
        res.sendStatus(500);
    }
}

app.get("/:username", getRepository)

app.listen(5000, () => { 
    console.log(`NodeJs is working on ${PORT}`)
})
client.on('ready',function() {
    console.log(`Redis is working on ${REDIS_PORT}`);
});

client.on("error", function (err) {
    console.log("Error " + err);
});