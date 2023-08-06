require('dotenv').config()

const Discord = require('discord.js')
const dude= new Discord.Client()

const {MessageButton} = require('discord-buttons')
require('discord.js-buttons')(dude);

const Canvas = require("canvas");
const { registerFont, createCanvas } = require('canvas')
registerFont('./RobotoCondensed-Bold.ttf', { family: 'Roboto' })

const MongoClient = require('mongodb').MongoClient 
const db_name=process.env.MONGO_DBNAME
const mongoUri = "mongodb+srv://"+process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@"+process.env.MONGO_CLUSTER+"/"+db_name
const dbClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })

const memberRole='856156094170267648'
const shetechRole='856164899846488114'
const siasianRole='856164566718611476'

const guildId='840502720518422539'
const botChannel='856219915269701662'
const welcomeChannel='840502722733408281'
const messageChannel='856220521472851998'
const commandChannel='856221411571007488'
const groupChannel='856820162275311636'
const gChannel='840502722733408277'
const pingChannel='856937464346443806'
dbClient.connect((err)=>{
    if(err){
        console.log(err)
    }else{
       console.log('db connected')
    }
})

const Gender = new Discord.MessageEmbed().setTitle("Select Your Gender").setColor("blue").setDescription('If you are not able to see buttons, update discord app.if issue persist contact admin')
const Siasian = new Discord.MessageEmbed().setTitle("Are you a studying in SIAS ?").setDescription('If you are not a student in Safi Institute of Advanced Study, click NO ').setColor("blue")
const Year = new Discord.MessageEmbed().setTitle("Select Your Year").setColor("blue")
const successMessage = new Discord.MessageEmbed().setTitle("Registration successful").setColor("green")
const startMessage = new Discord.MessageEmbed().setTitle('Register').setDescription('Hey there..\n\nIts me Damodaran Unni makan Dilman Edakochi\nPeople call me DUDE, The adimakannan of TECHSIAS\n\nTo access TECHSIAS Server,\nSend register<space><your official name> \n\neg : register Abdul Hadhi')

//gender
const gender_male = new MessageButton().setStyle("blurple").setLabel('Male').setID("gender-male")
const gender_female = new MessageButton().setStyle("blurple").setLabel('Female').setID('gender-female')
const gender_other=new MessageButton().setStyle("blurple").setLabel('Other').setID('gender-other')

//siasian
const sias_true = new MessageButton().setStyle("green").setLabel('Yes').setID("sias-true")
const sias_false = new MessageButton().setStyle("red").setLabel('No').setID("sias-false")

//class
const class_1= new MessageButton().setStyle("blurple").setLabel('BSc. BT').setID("class-1")
const class_2= new MessageButton().setStyle("blurple").setLabel('BSc. MB').setID("class-2")
const class_3= new MessageButton().setStyle("blurple").setLabel('BSc. FT').setID("class-3")
const class_4= new MessageButton().setStyle("blurple").setLabel('BSc. CS').setID("class-4")
const class_5= new MessageButton().setStyle("blurple").setLabel('BSc. PSY').setID("class-5")
const class_6= new MessageButton().setStyle("blurple").setLabel('BCA').setID("class-6")
const class_7= new MessageButton().setStyle("blurple").setLabel('BBA').setID("class-7")
const class_8= new MessageButton().setStyle("blurple").setLabel('B.COM').setID("class-8")
const class_9= new MessageButton().setStyle("blurple").setLabel('BA. ECO').setID("class-9")
const class_10= new MessageButton().setStyle("blurple").setLabel('BA ENG').setID("class-10")
const class_11= new MessageButton().setStyle("blurple").setLabel('BA. IF').setID("class-11")
const class_12= new MessageButton().setStyle("blurple").setLabel('PG COURSE').setID("class-12")

//year
const year_1= new MessageButton().setStyle("blurple").setLabel('FIRST').setID("year-1")
const year_2= new MessageButton().setStyle("blurple").setLabel('SECOND').setID("year-2")
const year_3= new MessageButton().setStyle("blurple").setLabel('THIRD').setID("year-3")

//next
const next_1= new MessageButton().setStyle("gray").setLabel('Next').setID("next-1")
const next_2= new MessageButton().setStyle("gray").setLabel('Next').setID("next-2")
const next_3= new MessageButton().setStyle("gray").setLabel('Next').setID("next-3")

const ClassName1={content:' Select your class (1/3)',buttons:[class_1,class_2,class_3,class_4,next_1]}
const ClassName2={content:'Select your class (2/3)',buttons:[class_5,class_6,class_7,class_8,next_2]}
const ClassName3={content:'Select your class (3/3)',buttons:[class_9,class_10,class_11,class_12,next_3]}

dude.on('guildMemberAdd',async(guildMember)=>{    
    
    const canvas = Canvas.createCanvas(1772, 633);    
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage(`./welcome.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#f2f2f2';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    var textString3 = `${guildMember.user.username}`;
    if (textString3.length >= 14) {
        ctx.font = 'bold 100px "Roboto"';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 640, canvas.height / 2 + 30);
    }else {
        ctx.font = 'bold 130px "Roboto"';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 640, canvas.height / 2 + 30);
    }
    var textString4 = `Welcome to TECHSIAS`;
    ctx.font = 'bold 70px "Roboto"';
    ctx.fillStyle = '#bb86fc';
    ctx.fillText(textString4, 620, canvas.height / 2 - 140);
    var textString4 = `Member #${guildMember.guild.memberCount}`;
    ctx.font = 'bold 60px "Roboto"';
    ctx.fillStyle = '#bb86fc';
    ctx.fillText(textString4, 650, canvas.height / 2 + 145);
    ctx.beginPath();
    ctx.arc(345, canvas.height / 2, 257, 0, Math.PI * 2, true);//position of img
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(guildMember.user.displayAvatarURL({ format: 'png' }));
    ctx.drawImage(avatar, 90, canvas.height / 2 - 255, 515, 515);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
    const welcomeMessage = new Discord.MessageEmbed()
        .setColor("#4dff7a")
        .setTitle(`**Welcome to TECHSIAS**`)
        .setDescription(`Hi <@${guildMember.id}>\n Msg me **HELP** to see how to Register :white_check_mark:`)
        .setImage("attachment://welcome-image.png")
        .attachFiles(attachment);

    guildMember.guild.channels.cache.get(welcomeChannel).send(welcomeMessage) 
    guildMember.guild.channels.cache.get(botChannel).send(`\n <@${guildMember.user.id}> Joined server`)
    checkUser(guildMember.user.id).then(async(exists)=>{
        if(exists==0){
            guildMember.send(startMessage)
        }else{
            const next=await nextStep(guildMember.user.id)
            if(next=='success'){
                guildMember.send('welcome back..')
                setUser(guildMember.user.id)
            }else if(next=='gender'){
                guildMember.send({
                    buttons: [gender_female, gender_male,gender_other],
                    embed: Gender
                })
            }else if(next=='sias'){
                guildMember.send({
                    buttons: [sias_true,sias_false],
                    embed: Siasian
                })
            }else if(next=='className'){
                guildMember.send(ClassName1)
            }else if(next=='year'){
                guildMember.send({
                    buttons: [year_1,year_2,year_3],
                    embed: Year
                })
            }    
        }
    })    
})

dude.on('guildMemberRemove',async(guildMember)=>{
    guildMember.guild.channels.cache.get(botChannel).send(`\n\n <@${guildMember.user.id}> left server`)

})

dude.on('clickButton',async(button)=>{
    if (button.id == 'gender-female') {
        button.message.delete()
        await addGender(button.clicker.user.id,'female')     
        button.channel.send({buttons: [sias_true,sias_false],embed: Siasian})
    }else if(button.id=='gender-male'){
        button.message.delete()
        await addGender(button.clicker.user.id,'male')       
        button.channel.send({buttons: [sias_true,sias_false],embed: Siasian})
    }else if(button.id=='gender-other'){
        button.message.delete()
        await addGender(button.clicker.user.id,'other')        
        button.channel.send({buttons: [sias_true,sias_false],embed: Siasian})
    }else if(button.id=='sias-true'){
        button.message.delete()
        await addSias(button.clicker.user.id,true)       
        button.channel.send(ClassName1)
    }else if(button.id=='sias-false'){
        button.message.delete()
        await addSias(button.clicker.user.id,false)
        await addDate(button.clicker.user.id)
        await setUser(button.clicker.user.id)        
        button.channel.send(successMessage)
    }else if(button.id=='class-1'){
        button.message.delete()
        await addClass(button.clicker.user.id,'BSc. BT')       
        button.channel.send({buttons:[year_1,year_2,year_3],embed: Year})
    }else if(button.id=='class-2'){
        button.message.delete()
        await addClass(button.clicker.user.id,'BSc. MB')
        button.channel.send({buttons:[year_1,year_2,year_3],embed:Year})
    }else if(button.id=='class-3'){
        button.message.delete()
        await addClass(button.clicker.user.id,'BSc. FT')
        button.channel.send({buttons:[year_1,year_2,year_3],embed:Year})
    }else if(button.id=='class-4'){
        button.message.delete()
        await addClass(button.clicker.user.id,'BSc. CS')
        button.channel.send({buttons:[year_1,year_2,year_3],embed:Year})
    }else if(button.id=='class-5'){
        button.message.delete()
        await addClass(button.clicker.user.id,'BSc. PSY')
        button.channel.send({buttons:[year_1,year_2,year_3],embed:Year})
    }else if(button.id=='class-6'){
        button.message.delete()
        await addClass(button.clicker.user.id,'BCA')
        button.channel.send({buttons:[year_1,year_2,year_3],embed:Year})
    }else if(button.id=='class-7'){
        button.message.delete()
        await addClass(button.clicker.user.id,'BBA')
        button.channel.send({buttons:[year_1,year_2,year_3],embed:Year})
    }else if(button.id=='class-8'){
        button.message.delete()
        await addClass(button.clicker.user.id,'B.COM')
        button.channel.send({buttons:[year_1,year_2,year_3],embed:Year})
    }else if(button.id=='class-9'){
        button.message.delete()
        await addClass(button.clicker.user.id,'BA. ECO')
        button.channel.send({buttons:[year_1,year_2,year_3],embed:Year})
    }else if(button.id=='class-10'){
        button.message.delete()
        await addClass(button.clicker.user.id,'BA ENG')
        button.channel.send({buttons:[year_1,year_2,year_3],embed:Year})
    }else if(button.id=='class-11'){
        button.message.delete()
        await addClass(button.clicker.user.id,'BA. IF')
        button.channel.send({buttons:[year_1,year_2,year_3],embed:Year})
    }else if(button.id=='class-12'){
        button.message.delete()
        await addClass(button.clicker.user.id,'PG')
        button.channel.send({buttons:[year_1,year_2,year_3],embed:Year})
    }else if(button.id=='year-1'){
        button.message.delete(Year)
        await addYear(button.clicker.user.id,'1')
        await addDate(button.clicker.user.id)
        await setUser(button.clicker.user.id)
        button.channel.send(successMessage)
    }else if(button.id=='year-2'){
        button.message.delete(Year)
        await addYear(button.clicker.user.id,'2')
        await addDate(button.clicker.user.id)
        await setUser(button.clicker.user.id)
        button.channel.send(successMessage)
    }else if(button.id=='year-3'){
        button.message.delete(Year)
        await addYear(button.clicker.user.id,'3')
        await addDate(button.clicker.user.id)
        await setUser(button.clicker.user.id)
        button.channel.send(successMessage)
    }else if(button.id=='next-1'){
        button.message.delete()
        button.channel.send(ClassName2)
    }else if(button.id=='next-2'){
        button.message.delete()
        button.channel.send(ClassName3)
    }else if(button.id=='next-3'){
        button.message.delete()
        button.channel.send(ClassName1)
    }
})

dude.on('message',async(message)=>{
    const userId=message.author.id;
    const commands = message.content.split(' ')
    if(!message.author.bot){
        if(message.channel.type=='dm'){
            if(commands[0].toLowerCase()=='register'){
                await checkUser(userId).then(async(exists)=>{
                    if(exists==0){
                        await regUser(userId,message.content.substring(9))
                        message.reply({
                            buttons: [gender_female, gender_male,gender_other],
                            embed: Gender
                        })
                    }else{
                        const next=await nextStep(userId)
                        if(next=='gender'){
                            message.reply({
                                buttons: [gender_female, gender_male,gender_other],
                                embed: Gender
                            })
                        }else if(next=='sias'){
                            message.reply({
                                buttons: [sias_true,sias_false],
                                embed: Siasian
                            })
                        }else if(next=='className'){
                            message.reply(ClassName1)
                        }else if(next=='year'){
                            message.reply({
                                buttons: [year_1,year_2,year_3],
                                embed: Year
                            })
                        }else{
                            message.reply('You have already registered.')
                        }
                    } 
                })                        
            }else if(commands[0].toLowerCase()=='help'){
                message.channel.send(startMessage)
            }
            dude.channels.cache.get(messageChannel).send(`\nid : <@${message.author.id}> \nname : ${message.author.username}\ncontent : ${message.content}\n-----------------------`);
        }
        if(message.channel.id==commandChannel){
            if(commands[0].toLowerCase()=='delete'&&commands[1]){
                checkUser(commands[1]).then(async(exists)=>{
                    if(exists!=0){
                        await deleteUser(commands[1])
                        message.channel.send(`<@${commands[1]}> deleted from db`)
                    }else{
                        message.channel.send('user does not exist in db')
                    }
                })              
            }else if(commands[0].toLowerCase()=='rename'&&commands[1]&&commands[2]){
                checkUser(commands[1]).then(async(exists)=>{
                    if(exists!=0){
                        await renameUser(commands[1],message.content.substring(26))
                        message.channel.send(`<@${commands[1]}> nickname changed`)
                    }else{
                        message.channel.send('user does not exist in db')
                    }
                })              
            }else if(commands[0].toLowerCase()=='welcome'&&commands[1]){              
                try{
                    sendWelcome(commands[1])
                }catch{
                    message.channel.send('failed to send message')
                }
                message.channel.send(`Welcome message send to <@${commands[1]}> `)
            }else if(commands[0].toLowerCase()=='pm'&&commands[1]&&commands[2]){              
                try{
                    sendMessage(commands[1],message.content.substring(22))
                }catch{
                    message.channel.send('failed to send message')
                }
                message.channel.send(`message send to <@${commands[1]}> `)
            }else if(commands[0].toLowerCase()=='show'&&commands[1]){
                checkUser(commands[1]).then(async(exists)=>{
                    if(exists!=0){
                        const data = await showDetails(commands[1])                  
                        message.channel.send(`id : <@${data.id}>\nname : ${data.name}\nsiasian : ${data.sias}\nclass : ${data.class}\nyear : ${data.year}\ngender : ${data.gender}\nstatus : ${data.next}\njoined : ${data.date}`)
                    }else{
                        message.channel.send(`user not found`)
                    }
                })               
            }
        }
        if(message.channel.id==groupChannel){
            if(commands[0].toLowerCase()=='g'&&commands[1]){
                sendGroup(gChannel,message.content.substring(2))
            }
            else if(commands[0]&&commands[1]){
                sendGroup(commands[0],message.content.substring(19))
            }
        }
    }
})

dude.on('ready',()=>{
    console.log('logged in as '+dude.user.tag)
})
dude.login(process.env.BOT_TOKEN)


async function regUser(userId,name){
    const database = dbClient.db(db_name)
    await database.collection('members').insertOne({id: userId,name:name,sias:false,class:'unavailable',year:'unavailable',gender:'unavailable',next:'gender',date:0})
}

async function checkUser(userId){
    const database = dbClient.db(db_name)
    let exists = await database.collection('members').countDocuments({id:userId})
    return exists
}

async function addGender(userId,gender){
    const database = dbClient.db(db_name)
    await database.collection('members').updateOne({id:userId},{$set:{gender:gender,next:'sias'}})
}

async function addSias(userId,sias){
    const database = dbClient.db(db_name)
    await database.collection('members').updateOne({id:userId},{$set:{sias:sias,next:'success'}})
    if(sias){
        await database.collection('members').updateOne({id:userId},{$set:{next:'className'}})
    }
}

async function addClass(userId,className){
    const database = dbClient.db(db_name)
    const userData=await database.collection('members').findOne({id:userId})
    if(userData.class='unavailable'){
        await database.collection('members').updateOne({id:userId},{$set:{class:className,next:'year'}})
    }
}

async function addYear(userId,year){
    const database = dbClient.db(db_name)
    await database.collection('members').updateOne({id:userId},{$set:{year:year,next:'success'}})
}

async function addDate(userId){
    var d = new Date();
    var dt = d.getFullYear();
    const database = dbClient.db(db_name)
    await database.collection('members').updateOne({id:userId},{$set:{date:dt}})
}

async function nextStep(userId){
    const database = dbClient.db(db_name)
    const userData=await database.collection('members').findOne({id:userId})
    return userData.next;
}

async function setUser(userId){   
    dude.guilds.cache.get(guildId).members.fetch(userId).then(async(member)=>{
        await member.roles.set([])
        await member.roles.add(memberRole);
        const database = dbClient.db(db_name)
        const userData=await database.collection('members').findOne({id:userId})
        await member.setNickname(userData.name)     
        if(userData.gender=='female'){
            await member.roles.add(shetechRole)
        }
        if(userData.sias==true){
            await member.roles.add(siasianRole)
        }
        dude.channels.cache.get(botChannel).send(`\n\nRoll added to <@${userData.id}> \nname : ${userData.name}\nsiasian : ${userData.sias}\nclass : ${userData.class}\nyear : ${userData.year}\ngender : ${userData.gender}\nstatus : ${userData.next}\njoined : ${userData.date} \n--------------`)
    })
}

async function deleteUser(userId){
    dude.guilds.cache.get(guildId).members.fetch(userId).then(async(member)=>{
        await member.roles.set([])
    })
    database=dbClient.db(db_name)
    await database.collection('members').deleteOne({id:userId})
}

async function renameUser(userId,name){
    dude.guilds.cache.get(guildId).members.fetch(userId).then(async(member)=>{
        await member.setNickname(name)
    })
    database=dbClient.db(db_name)
    await database.collection('members').updateOne({id:userId},{$set:{name:name}})
}

async function sendWelcome(userId){
    dude.guilds.cache.get(guildId).members.fetch(userId).then(
        async (user)=>{
            user.send(startMessage)
        }
    )
}

async function sendMessage(userId,msg){
    try{
        dude.guilds.cache.get(guildId).members.fetch(userId).then(
            async (user)=>{
                user.send(msg)
            }
        ).catch(
            console.log('error sending message')
        )    
    }
    catch(err){
        console.log('error in sending messages')
    }
}

async function showDetails(userId){
    const database = dbClient.db(db_name)
    const userData=await database.collection('members').findOne({id:userId})
    return userData;
}

async function sendGroup(groupId,msg){

    try{
        dude.channels.fetch(groupId).then(
            async (chnl)=>{
                chnl.send(msg)
            }
        )
    }
    catch(err){
        console.log('error in group messages')
    }
    
}

setInterval(()=>{
    try{
        dude.channels.fetch(pingChannel).then(
            async (chnl)=>{
                chnl.send('i am running')
            }
        )
    }
    catch(err){
        console.log('error in group messages')
    }
},55*60*1000)