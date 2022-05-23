import { Client, Intents } from 'discord.js'
import { token, ProblemsLine, guildId } from './config.json'
import { readFileSync, writeFileSync, writeFile } from 'fs'
import fs from 'graceful-fs'
import Big from 'big.js'
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
    let x:Big = Big(123.4567)
    let y = new Big(9) 
    let b=x.toNumber()
    a += b.toString()
    a += y.toString()
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
        Big(1010), Big(1020), Big(1030), Big(1040), Big(1050), Big(1060), Big(1070), Big(1080), Big(1090), Big(1100), Big(1110), Big(1120), Big(1125), Big(1130), Big(1140), Big(1150), Big(1200), Big(1250),
    ]
    let R1000 = R1000mas[Math.floor(Math.random() * (R1000mas.length - 1))]
    let a = (R1000.minus(1000)).div(100).round().plus(1)
    let b = Big(10000).div(R1000).round(0,Big.roundDown).minus(1)
    
    let xxx=Big(0)
    let yyy=Big(99)
    if (R1000.mod(100).eq(0))
    {
        xxx = Big(Math.random()).times(b.minus(a).plus(1)).round(0,Big.roundDown).plus(a).div(10)
        .plus(Big(Math.random()).times(Big(9).minus(Big(0)).plus(1)).round(0,Big.roundDown).plus(Big(0)).div(100))
        .plus(Big(Math.random()).times(Big(9).minus(Big(1)).plus(1)).round(0,Big.roundDown).plus(Big(1)).div(1000))
    }
    if ((R1000.mod(100).gt(0)) && (R1000.mod(10).eq(0)) )
    {
        xxx = Big(Math.random()).times(b.minus(a).plus(1)).round(0,Big.roundDown).plus(a).div(10)
        .plus(Big(Math.random()).times(Big(9).minus(Big(1)).plus(1)).round(0,Big.roundDown).plus(Big(1)).div(100))
    }
    if (R1000.mod(10).gt(0))
    {
        xxx = Big(Math.random()).times(b.minus(a).plus(1)).round(0,Big.roundDown).plus(a).div(10)
    }
    
    let Smas = [
        1, 1.5, 2, 2.5, 3
    ]
    let S = Smas[Math.floor(Math.random() * (Smas.length - 1))]
    let S_Big=Big(S)
    let X2=R1000.div(1000).times(xxx).times(S_Big).times(1000000).round()
    let X1=R1000.div(1000).minus(xxx).times(S_Big).times(1000000).round()
    let ANS = 0
    if(R1000.mod(10).eq(0)) {ANS = R1000.div(1000).minus(1).times(100).round().toNumber()}
    if(R1000.mod(10).gt(0)) {ANS = R1000.div(1000).minus(1).times(1000).round().div(10).toNumber()}
    
    
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
    part +=' рублей. Под какой процент банк выдал Моне кредит?'

    
    return [part, ANS]

}
functions[15]['VDL'].URL = 'YOUTUBE VDL URL'
functions[15]['VDL'].is_text = 1

functions[15]['DDL1'] = function () {
    let R1000mas = [
        Big(1010), Big(1020), Big(1030), Big(1040), Big(1050), Big(1060), Big(1070), Big(1080), Big(1090), Big(1100), Big(1110), Big(1120), Big(1125), Big(1130), Big(1140), Big(1150), Big(1200), Big(1250),
    ]
    let R1000 = R1000mas[Math.floor(Math.random() * (R1000mas.length))]
    let DigitsMas = [Big(0),Big(1),Big(2),Big(3),Big(4),Big(5),Big(6),Big(7),Big(8),Big(9),]
    let Nmas = [Big(6), Big(7), Big(8),]
    let aMas = [] //Массив первых цифр после запятой для столбца долг
    let bMas = [] //Массив вторых цифр после запятой для столбца долг
    let N = Nmas[Math.floor(Math.random() * (Nmas.length))] //Получили кол-во столбцов в таблице долг
    
    for (var i = 0; i < N.minus(2).toNumber(); i++) { //Формируем массив первых цифр после запятой в долях столбца долг (кроме цифры "0")
        let gonext=true
        while (gonext){
            let a_candidate = DigitsMas[Math.floor(Math.random() * (DigitsMas.length-1))+1]
            if(!aMas.includes(a_candidate)){
                aMas[aMas.length]=a_candidate;
                gonext=false
            }
        }
    }
    aMas.sort()
    aMas.reverse()
    
    let podbor_needed = true //Формируем массив вторых цифр после запятой в долях столбца долг (включая цифру "0")
    while(podbor_needed){
        let bMas_candidate = []
        for (var i = 0; i < N.minus(2).toNumber(); i++) {
            bMas_candidate[bMas_candidate.length]=DigitsMas[Math.floor(Math.random() * (DigitsMas.length))]
        }
        let sum = Big(0)
        bMas_candidate.forEach(function(value){sum =sum.plus(value)})
        console.log('sum='+sum.toString())
        if(sum.mod(10).eq(0)){
            podbor_needed = false
            bMas=bMas_candidate
        }
    
    
    }
    //БЛОК формирования условия
    
    let dateTime = new Date()
        
    let part: string = '15-го января '
    part += (dateTime.getFullYear() - Math.floor(Math.random() * 3))
    part += ' года Моне был выдан кредит на развитие бизнеса. В таблице представлен график его погашения.\n'
    part += '```'
    part += '\n'
    part += '+-------------------------------+'+'-------+'.repeat(N.toNumber())+'\n'
    //Формируем первую строку таблицы
    part +='| Дата                          |'
    for(var i=0;i<N.toNumber();i++)
    {
        part += ' 15.0'+(i+1).toString()+' |'
    }
    part += '\n'
    part += '+-------------------------------+'+'-------+'.repeat(N.toNumber())+'\n'
    //Формируем вторкую строку таблицы
    part += '| Долг (в процентах от кредита) | 100%  |'
    for(var i=0;i<N.minus(2).toNumber();i++)
    {
        part += ' '+ aMas[i].toString() + bMas[i].toString() +'%'+'   |'
    }
    part += '  0%   |'
    part += '\n'
    part += '+-------------------------------+'+'-------+'.repeat(N.toNumber())+'\n'
    part += '```'
    part += '\n'
    part += 'В конце каждого месяца, начиная с января, текущий долг увеличивался на '
    part += R1000.div(1000).minus(1).times(100).toString()
    part += '%, а выплаты по погашению кредита происходили в первой половине каждого месяца, начиная с февраля. На сколько процентов общая сумма выплат при таких условиях больше суммы самого кредита?'
    
    //БЛОК вычисления ответа к задаче
    let sum_aMas=Big(0)
    let sum_bMas=Big(0)
    aMas.forEach(function(value){sum_aMas =sum_aMas.plus(value)})
    bMas.forEach(function(value){sum_bMas =sum_bMas.plus(value)})
    let ANS = R1000.div(10).plus(sum_aMas.times(10).plus(sum_bMas).times(R1000.div(1000).minus(1))).minus(100).toNumber()

    return [part, ANS]
}
functions[15]['DDL1'].URL = 'YOUTUBE DDL1 URL'
functions[15]['DDL1'].is_text = 1

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
| Код   | Описание                                                 |
+-------+----------------------------------------------------------+
| VDL   | Выплаты даны в лоб. Найти процент.                       |
+-------+----------------------------------------------------------+
| DDL1  | Долг дан в лоб. Найти пропорцию выплаты/кредит           |
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
