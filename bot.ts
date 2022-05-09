import { Client, Intents } from 'discord.js'
import { token } from './config.json'
const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
    partials: ['CHANNEL'],
})
client.once('ready', () => {
    console.log('Ready!')
})
function getSimpleEquation() {
    let out: string = ''
    let a = Math.floor(Math.random() * 10)
    let b = Math.floor(Math.random() * 10)
    let answer = a + b
    out += a
    out += ' + '
    out += b
    return [out, answer]
}
class User {
    constructor(public id: number) {}
    is_solving: boolean = false
    problems: string[]
    current_answer: number = 0
}
let UserBase = new Map<string, User>()
client.on('messageCreate', async (message) => {
    if (message.author.bot || message.channelId != '966167143567745054') return
    console.log(message.content)
    console.log(message.author.id)
    if (UserBase[message.author.id] == undefined)
        UserBase[message.author.id] = new User(+message.author.id)
    switch (message.content) {
        case '/getfullrating':
            break
        case '/get problem':
            UserBase[message.author.id].is_solving = true
            let k = getSimpleEquation()
            message.author.send(k[0].toString())
            UserBase[message.author.id].current_answer = k[1]

            break //message.author.send({ files: ['./test.png'] })
        case '/show problem types':
            message.author.send(
                '❤️‍🔥\n1.Простейшие уравнения\n2.Начала теории вероятностей\n3.Планиметрия\n4.Вычисления и преобразования\n5.Стереометрия\n6.Производная и первообразная\n7.Задачи с прикладным содержанием\n8.Текстовые задачи\n9.Графики функций\n10.Вероятности сложных событий\n11.Наибольшее и наименьшее значение функций',
            )
            break
        default:
            if (UserBase[message.author.id].is_solving == true) {
                if (
                    message.content !=
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
