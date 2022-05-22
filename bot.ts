import { Client, Intents } from 'discord.js'
import { token, ProblemsLine, guildId } from './config.json'
import { readFileSync, writeFileSync, writeFile } from 'fs'
import fs from 'graceful-fs'
import mjAPI from 'mathjax-node'
import sharp from 'sharp'
import exitHook from 'exit-hook'
mjAPI.config({
    displayMessages: false,
    displayErrors: false,
    MathJax: {
        displayAlign: 'left',
    },
})
mjAPI.start()
const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
    partials: ['CHANNEL'],
})
var gcd = function (aa: number, bb: number) {
    let a = aa,
        b = bb
    if (!b) {
        return a
    }
    return gcd(b, a % b)
}
let sendd = function (interaction: any, obj: any) {
    UserBase[interaction.user.id].is_solving = true
    let k = obj()
    if (!obj.is_text) {
        mjAPI.typeset(
            {
                math: k[0],
                format: 'TeX',
                svg: true,
            },
            function (data) {
                sharp(Buffer.from(data.svg), { density: 300 })
                    //@ts-ignore
                    .modulate({ lightness: 255 })
                    .png()
                    .toFile('buf.png')
                    .then(() => {
                        if (obj.URL === undefined)
                            interaction.reply({
                                files: ['./buf.png'],
                            })
                        else
                            interaction.reply({
                                content: obj.URL,
                                files: ['./buf.png'],
                            })
                        k.push(0)
                        UserBase[interaction.user.id].current_answer = k
                    })
            },
        )
    } else {
        if (!obj.URL) interaction.reply(k[0])
        else interaction.reply('```' + k[0] + '```' + '\n' + obj.URL)
        k.push(0)
        UserBase[interaction.user.id].current_answer = k
    }
}
class User {
    constructor(public id: number) {}
    is_solving: boolean = false
    problems: string[] = []
    tag: string
    current_answer: [string, number, number]
}
let functions = []
functions[1] = []
functions[2] = []
functions[15] = []
functions[1]['LALALA'] = function () {
    let a = Math.floor(Math.random() * 100)
    let b = Math.floor(Math.random() * 100)
    return [a + ' + ' + b, a + b]
}
functions[2]['sport'] = function () {
    let a = 'В соревновании по биатлону участвуют спортсмены из 25 стран, одна из которых ― Россия. Всего на старт вышло 60 участников, из которых 6 ― из России. Порядок старта определяется жребием, стартуют спортсмены друг за другом. Какова вероятность того, что десятым стартовал спортсмен из России?'
    let x = new Big(123.4567)
    b=x.toNumber() 
    return [a, b]
}
functions[2]['sport'].is_text = 1
functions[1]['DFSDF'] = function () {
    let a = Math.floor(Math.random() * 10)
    let b = Math.floor(Math.random() * 10)
    return [a + ' * ' + b, a * b]
}
functions[15]['VDL'] = function (){
    let R1000mas = [
        1010, 1020, 1030, 1040, 1050, 1060, 1070, 1080, 1090, 1100, 1110, 1120, 1125, 1130, 1140, 1150, 1200, 1250,
    ]
    let R1000 = R1000mas[Math.floor(Math.random() * (R1000mas.length - 1))]
    let a = Math.floor((R1000-1000)/100)+1
    let b = Math.floor(10000/R1000)-1
    let xxx=0
    if (R1000 % 100 == 0)
    {
        xxx = (Math.floor(Math.random() * (b - a + 1)) + a)/10 + (Math.floor(Math.random() * (9 - 0 + 1)) + 0)/100 + (Math.floor(Math.random() * (9 - 1 + 1)) + 1)/1000  
    }
    if ((R1000 % 100 != 0) && (R1000 % 10 == 0) )
    {
        xxx = (Math.floor(Math.random() * (b - a + 1)) + a)/10 + (Math.floor(Math.random() * (9 - 1 + 1)) + 1)/100  
    }
    if (R1000 % 10 != 0)
    {
        xxx = (Math.floor(Math.random() * (b - a + 1)) + a)/10
    }
    xxx=Math.round(xxx*1000)/1000 // Тайпскрипт ебаное блядь говно, какого хуя этим надо заморачиваться
    let Smas = [
        1, 1.5, 2, 2.5, 3
    ]
    let S = Smas[Math.floor(Math.random() * (Smas.length - 1))]
    let X2=Math.floor(R1000/1000*xxx*S*1000000)
    let X1=Math.floor((R1000/1000-xxx)*S*1000000)
    let ANS = 0
    if(R1000 % 10 ==0) {ANS = Math.floor((R1000/1000-1)*100)}
    if(R1000 % 10 !=0) {ANS = Math.floor((R1000/1000-1)*1000)/10}


    let part: string = ''
    let dateTime = new Date()
    
    part += '31 декабря '
    part += (dateTime.getFullYear() + Math.floor(Math.random() * 4))
    part += ' года Моня взял в банке '
    part += S
    part += ' млн. рублей в кредит. Схема выплаты кредитa следующая:\n31 декабря каждого следующего года банк начисляет проценты на оставшуюся сумму долга (то есть увеличивает долг на определённое количество процентов), затем Моня переводит очередной транш. Моня выплатил кредит за два транша, переводя в первый раз '
    part += X1
    part += ' рублей, во второй — '
    part += X2
    part +=' рублей. Под какой процент банк выдал Моне кредит?\n'
    part +='PROBLEM DEBUGING:\n'
    part += 'R1000='+R1000+'\n'
    part += 'a='+a+'\n'
    part += 'b='+b+'\n'
    part += 'xxx='+xxx+'\n'
    part += 'ANS='+ANS+'\n'

    
    return [part, ANS]

}
functions[15]['VDL'].URL = 'YOUTUBE VDL URL'
functions[15]['VDL'].is_text = 1
functions[15]['RV1Q1'] = function () {
    let NN = [2, 3, 4]
    let R1000mas = [
        1010, 1020, 1030, 1040, 1050, 1060, 1070, 1080, 1090, 1100, 1110, 1120, 1125, 1130, 1140, 1150, 1200, 1250,
    ]
    let N = NN[Math.floor(Math.random() * (NN.length - 1))]
    let R1000 = R1000mas[Math.floor(Math.random() * (R1000mas.length - 1))]
    let r = R1000 / 10 - 100
    let Denom = Math.pow(R1000, N)
    let Numer = 0
    for (let i = 0; i < N; i++) {
        Numer = Numer + Math.pow(1000, N - i) * Math.pow(R1000, i)
    }
    let gcdNumDen = gcd(Numer, Denom)
    let S = Math.floor(Numer / gcdNumDen)
    let X = Math.floor(Denom / gcdNumDen)
    let multiplicator1 = Math.floor(1000000 / X)
    let multiplicator2 = Math.floor(100000 / X)
    if (multiplicator1 > 0) {
        let mult = Math.floor(
            Math.random() * (multiplicator2 + 1 - multiplicator1 + 1) +
                multiplicator1 +
                1,
        )
        S = S * mult
        X = X * mult
    }
    let ANS = S
    let part: string = ''
    let dateTime = new Date()
    
    part +='В июле '
    part += (dateTime.getFullYear() + Math.floor(Math.random() * 4))
    part += ' года планируется взять кредит в банке на некоторую сумму.\nУсловия его возврата таковы:\n- каждый январь долг возрастает на '
    part += r
    part +=
        '% по сравнению с концом предыдущего года;\n- с февраля по июнь каждого года необходимо выплатить часть долга, равную '
    part += X
    part += ' рубль(-я,-ей).\n'
    part +=
        'Сколько рублей было взято в банке, если известно, что он был полностью погашен '
    part += N
    part += ' равными платежами (то есть за '
    part += N
    part += ' года)?'
    return [part, ANS]
}
functions[15]['RV1Q1'].URL = 'YOUTUBE BANKIR URL'
functions[15]['RV1Q1'].is_text = 1
let UserBase: User[] = []
exitHook(() => {
    let buf = JSON.stringify(UserBase)
    fs.writeFileSync('./graph.json', buf)
    console.log('backup')
})
client.once('ready', () => {
    client.user.setActivity('MATH EGE problems');
    //client.user.setAvatar('./fibo.png');
    //client.user.setUsername('FIBONACCI'); 
    //@ts-ignore
  
    UserBase = JSON.parse(readFileSync('./graph.json'))
    console.log('Ready!')
})
function inBase(cc: any) {
    if (UserBase[cc.id] === undefined) {
        UserBase[cc.id] = new User(+cc.id)
        UserBase[cc.id].tag = cc.tag
    }
    if (UserBase[cc.id].tag !== cc.tag) UserBase[cc.id].tag = cc.tag
}
client.on('messageCreate', async (message) => {
    let guild = await client.guilds.fetch(guildId)
    let member = await guild.members.fetch(message.author.id)
    if (
        !member ||
        message.author.bot ||
        !member.roles.cache.has('975098706569347112')
    )
        return
    inBase(message.author)
    if (UserBase[message.author.id].is_solving === true) {
        if (
            +message.content !== UserBase[message.author.id].current_answer[1]
        ) {
            UserBase[message.author.id].current_answer[2]++
            message.react('❌')
        } else {
            UserBase[message.author.id].problems.push(
                UserBase[message.author.id].current_answer[0],
                UserBase[message.author.id].current_answer[2],
            )
            UserBase[message.author.id].is_solving = false
            message.react('✅')
        }
    } else if (message.content[0] === '/')
        message.author.send("Isn't such command")
})
client.on('interactionCreate', async (interaction) => {
    let guild = await client.guilds.fetch(guildId)
    let member = await guild.members.fetch(interaction.user.id)
    if (
        !member ||
        !interaction.isCommand() ||
        !member.roles.cache.has('975098706569347112')
    )
        return
    inBase(interaction.user)
    switch (interaction.commandName) {
        case 'getfullrating':
            let sortable = []
            for (let c in UserBase) {
                sortable.push([
                    UserBase[c].tag,
                    UserBase[c].problems.length / 2,
                ])
            }
            sortable.sort((a, b) => b[1] - a[1])
            let out =
                '```' +
                `
+-----+------------------------+--------------+
|#    |NICKNAME                |PRBLMS SOLVED |
+-----+------------------------+--------------+
`
            sortable.forEach((a, ind) => {
                out +=
                    '|' +
                    (ind + 1) +
                    ' '.repeat(5 - (ind + 1).toString().length) +
                    '|' +
                    a[0] +
                    ' '.repeat(24 - a[0].toString().length) +
                    '|' +
                    a[1] +
                    ' '.repeat(14 - a[1].toString().length) +
                    '|' +
                    '\n'
            })
            out += '+-----+------------------------+--------------+'
            out += '```'
            if (out.length != 0) interaction.reply(out)
            break
        case 'showproblemtypes':
            let trs: string =
                interaction.options.getString('specifical_problem')
            if (trs == null) {
                interaction.reply('ALL PROBLEMS')
            } else {
                switch (trs) {
                    case '1':
                        interaction.reply(`
                        LALALA - BASIC SUM
                        DFSDF - BASIC MULT
                        `)
                        break
                    case '15':
                        interaction.reply('```'+'ТИПЫ 15-й ЗАДАЧИ\n' +
`
+-------+----------------------------------------------------------+
|  Код  | Описание                                                 |
+-------+----------------------------------------------------------+
|  VDL  | Выплаты даны в лоб. Найти процент                        |
+-------+----------------------------------------------------------+
| RV1Q1 | Равные выплаты. Обычная. Найти сумму кредита, зная N,X,R |
+-------+----------------------------------------------------------+
|       |                                                          |
+-------+----------------------------------------------------------+
|       |                                                          |
+-------+----------------------------------------------------------+
|       |                                                          |
+-------+----------------------------------------------------------+
                        
` +'```' )
                        break
                    default:
                        interaction.reply('No such problem type')
                        break
                }
            }
            break
        case 'help':
            interaction.reply('HELLO, NO HELP AVAILABLE;)')
            break
        case 'getproblem':
            let ccc: string = interaction.options.getString('problem')
            if (!functions[ccc]) {
                interaction.reply("Isn't such problem number")
                return
            }
            let cc: string = interaction.options.getString('subtype')
            if (interaction.options.getString('subtype') !== null) {
                if (!functions[ccc][cc]) {
                    interaction.reply("Isn't such problem subtype")
                    return
                }
                sendd(interaction, functions[ccc][cc])
            } else {
                const keys = Object.keys(functions[ccc])
                cc = keys[Math.floor(Math.random() * keys.length)]
                sendd(interaction, functions[ccc][cc])
            }
            break
    }
})
client.login(token)
