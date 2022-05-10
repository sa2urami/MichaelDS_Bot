import { Client, Intents } from 'discord.js'
import { token } from './config.json'
import { readFileSync, writeFileSync, writeFile } from 'fs'
import TeXToSVG from 'tex-to-svg/TeXToSVG.js'
import sharp from 'sharp'
const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
    partials: ['CHANNEL'],
})
function getSimpleEquation() {
    let a = Math.floor(Math.random() * 10)
    let b = Math.floor(Math.random() * 10)
    return [a + ' + ' + b, a + b]
}
class User {
    constructor(public id: number) {}
    is_solving: boolean = false
    problems: string[] = []
    username: string
    current_answer: number = 0
}
let UserBase = {}
let data = readFileSync('./graph.json')
UserBase = JSON.parse(data.toString())
function exitHandler() {
    writeFileSync('./graph.json', JSON.stringify(UserBase))
}
process.on('SIGINT', exitHandler.bind({ exit: true }))
client.once('ready', () => {
    console.log('Ready!')
    UserBase['gsdfg'] = new User(0)
    UserBase['gsdfg'].problems.push('dfsaf')
})
client.on('messageCreate', async (message) => {
    if (message.author.bot || message.channelId != '966167143567745054') return
    //console.log(message.content)
    //console.log(message.author.id)
    if (UserBase[message.author.id] === undefined) {
        UserBase[message.author.id] = new User(+message.author.id)
        UserBase[message.author.id].username = message.author.username
    }
    switch (message.content) {
        case '/getfullrating':
            let sortable = []
            for (let c in UserBase) {
                sortable.push([
                    UserBase[c].username,
                    UserBase[c].problems.length,
                ])
            }
            sortable.sort((a, b) => b[1] - a[1])
            let out = 'RATING\n'
            sortable.forEach((a, ind) => {
                out += ind + 1 + '.' + a[0] + ' - ' + a[1] + '\n'
            })
            if (out.length != 0) message.author.send(out)
            break
        case '/get problem':
            UserBase[message.author.id].is_solving = true
            let k = getSimpleEquation()
            console.log(k[0] + ' ' + k[1])
            sharp(Buffer.from(TeXToSVG(k[0])))
                .png()
                .resize(200)
                .toFile('buf.png')
                .then(() => {
                    message.author.send({ files: ['./buf.png'] })
                    UserBase[message.author.id].current_answer = k[1]
                    UserBase[message.author.id].problems.push(k[0].toString())
                })
            break
        case '/show problem types':
            message.author.send(
                '❤️‍🔥\n1.Простейшие уравнения\n2.Начала теории вероятностей\n3.Планиметрия\n4.Вычисления и преобразования\n5.Стереометрия\n6.Производная и первообразная\n7.Задачи с прикладным содержанием\n8.Текстовые задачи\n9.Графики функций\n10.Вероятности сложных событий\n11.Наибольшее и наименьшее значение функций',
            )
            break
        default:
            if (UserBase[message.author.id].is_solving === true) {
                if (
                    message.content !==
                    UserBase[message.author.id].current_answer.toString()
                )
                    message.react('👎')
                else {
                    UserBase[message.author.id].is_solving = false
                    message.react('👍')
                }
            } else message.author.send('Got it')

            break
    }
})
client.login(token)
