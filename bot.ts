import { Client, Intents } from 'discord.js'
import { token, ProblemsLine } from './config.json'
import { readFileSync, writeFileSync, writeFile } from 'fs'
import mjAPI from 'mathjax-node'
import sharp from 'sharp'
mjAPI.config({
    MathJax: {},
})
mjAPI.start()
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
    current_answer: [string, number, number]
}
let functions = []
functions[0] = function () {
    let a = Math.floor(Math.random() * 10)
    let b = Math.floor(Math.random() * 10)
    return [a + ' + ' + b, a + b]
}
let UserBase = {}
function exitHandler() {
    writeFileSync('./graph.json', JSON.stringify(UserBase))
}
process.on('SIGINT', exitHandler.bind({ exit: true }))
client.once('ready', () => {
    UserBase = JSON.parse(readFileSync('./graph.json').toString())
    console.log('Ready!')
})
client.on('messageCreate', async (message) => {
    if (message.author.bot) return
    //console.log(message.content)
    //console.log(message.author.id)
    if (UserBase[message.author.id] === undefined) {
        UserBase[message.author.id] = new User(+message.author.id)
        UserBase[message.author.id].username = message.author.username
    }
    if (UserBase[message.author.id].username !== message.author.username)
        UserBase[message.author.id].username = message.author.username
    if (message.content.substring(0, 12) === '/get problem') {
        console.log(functions[0]())
        console.log(message.content.substring(15, 13))
    }
    switch (message.content) {
        case '/getfullrating':
            let sortable = []
            for (let c in UserBase) {
                sortable.push([
                    UserBase[c].username,
                    UserBase[c].problems.length / 2,
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
            mjAPI.typeset(
                {
                    math: k[0],
                    format: 'TeX',
                    svg: true,
                },
                function (data) {
                    sharp(Buffer.from(data.svg))
                        //@ts-ignore
                        .png()
                        .resize(200)
                        .toFile('buf.png')
                        .then(() => {
                            message.author.send({ files: ['./buf.png'] })
                            k.push(0)
                            UserBase[message.author.id].current_answer = k
                        })
                },
            )
            break
        case '/show problem types':
            message.author.send(ProblemsLine)
            break
        default:
            if (UserBase[message.author.id].is_solving === true) {
                if (
                    message.content !==
                    UserBase[message.author.id].current_answer[1].toString()
                ) {
                    UserBase[message.author.id].current_answer[2]++
                    message.react('❌')
                } else {
                    UserBase[message.author.id].problems.push(
                        UserBase[message.author.id].current_answer[0],
                        UserBase[message.author.id].current_answer[2],
                    )
                    //UserBase[message.author.id].current_answer[2] = 0
                    UserBase[message.author.id].is_solving = false
                    message.react('✅')
                }
            } else message.author.send('Got it')

            break
    }
})
client.login(token)
