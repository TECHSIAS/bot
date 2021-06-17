require('dotenv').config()

const Discord = require('discord.js')
const dude= new Discord.Client()
//const MongoClient = require('mongodb').MongoClient 
// const db_name=process.env.MONGO_DBNAME
// const mongoUri = "mongodb+srv://"+process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@"+process.env.MONGO_CLUSTER+"/"+db_name
// const dbClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })

// dbClient.connect((err)=>{
//     if(err){
//         console.log(err)
//     }else{
//        console.log('db connected')
//     }
// })

dude.on('guildMemberAdd',async(guildMember)=>{
    const role = 4
    if(role==0){
        guildMember.send('type register to complete registration')
    }else if(role==1){
        guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.name == "member"))
    }else if(role==2){
        guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.name == "member"))
        guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.name == "girls-power"))
    }else if(role==3){
        guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.name == "member"))
        guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.name == "siasian"))
    }else if(role==4){
        guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.name == "member"))
        guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.name == "siasian"))
        guildMember.roles.add(guildMember.guild.roles.cache.find(role => role.name == "girls-power"))
    }
})

dude.on('guildMemberRemove',async(guildMember)=>{
    console.log('left')
})

dude.on('message',async(message)=>{
    console.log('message')
    const userId=message.author.id;
    const commands = message.content.split(' ')
    if(!message.author.bot){
        if(message.channel.type=='dm'){
            if(commands[0].toLowerCase()=='register'){
                addUser(userId,message.content.substring(9))
            }
            messageAdmin(userId,message.content)
        }else if(message.channel.type=='text'){
            //answer questions
        }
    }

/*
    answer questions
*/
})

function addUser(userId,name){
    if(checkUser(userId)){

    }else{
       // add to db
    }
}

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

async function newUser(userId){
 
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