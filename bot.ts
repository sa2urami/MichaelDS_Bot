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
functions[7] = []
functions[1]['LALALA'] = function () {
    let a = Math.floor(Math.random() * 100)
    let b = Math.floor(Math.random() * 100)
    return [a + ' + ' + b, a + b]
}
functions[1]['DFSDF'] = function () {
    let a = Math.floor(Math.random() * 10)
    let b = Math.floor(Math.random() * 10)
    return [a + ' * ' + b, a * b]
}
functions[7][0] = function () {
    let NN = [2, 3, 4]
    let R1000mas = [
        1010, 1020, 1030, 1040, 1050, 1060, 1070, 1080, 1090, 1100, 1125,
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
    part +=
        'В июле 2023 года планируется взять кредит в банке на некоторую сумму.\nУсловия его возврата таковы:\n- каждый январь долг возрастает на '
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
functions[7][0].URL = 'YOUTUBE BANKIR URL'
functions[7][0].is_text = 1
let UserBase: User[] = []
exitHook(() => {
    let buf = JSON.stringify(UserBase)
    fs.writeFileSync('./graph.json', buf)
    console.log('backup')
})
client.once('ready', () => {
    client.user.setUsername('username'); 
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
+-----+------------------------+------------+
| IND |       TAG              |   COUNT    |
+-----+------------------------+------------+
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
                    ' '.repeat(12 - a[1].toString().length) +
                    '|' +
                    '\n'
            })
            out += '+-----+------------------------+------------+'
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
                    case '7':
                        interaction.reply(`
                        0 - ULTIMATE BANKIR TASK
                        `)
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
