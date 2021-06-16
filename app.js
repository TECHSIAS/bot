require('dotenv').config()

const Discord = require('discord.js')
const dude= new Discord.Client()
const MongoClient = require('mongodb').MongoClient 
const db_name=process.env.MONGO_DBNAME
const mongoUri = "mongodb+srv://"+process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@"+process.env.MONGO_CLUSTER+"/"+db_name
const dbClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })

dbClient.connect((err)=>{
    if(err){
        console.log(err)
    }else{
       console.log('db connected')
    }
})

dude.on('guildMemberAdd',async()=>{
           
/*
    if bot :
        inform admins
    else :
        if checkUser:
            oldUser(userId)
        else:
          newUser(userId)
*/
})

dude.on('message',async(message)=>{
    if(!message.author.bot){
        if(message.channel.type=='dm'){
            const userId=message.author.id;
            //answer questions
            messageAdmin(userId,message.content)
        }else if(message.channel.type=='text'){
            //answer questions
        }
    }

/*
    answer questions
*/
})

dude.on('ready',()=>{
    console.log('logged in as '+dude.user.tag)
})
dude.login(process.env.BOT_TOKEN)



function checkUser(userId){
    //check if user already exist in db
}

function oldUser(userId){
/* 
    show user data
    register
    give role
    show success message to user 
    inform admins
*/ 
}

function newUser(UserId){
/* 
    get name
    get college
    get gender
    get mobile
    get otp
    show userdata
    register
    give role
    show success message to user 
    inform admins
*/
}

function messageAdmin(userId,text){
    //send text to channel
}