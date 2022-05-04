import { Client, Intents } from 'discord.js'
import { token } from './config.json'
const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
    partials: ['CHANNEL'],
})
client.once('ready', () => {
    console.log('Ready!')
})
class User {
    id: number
    problems: string[]
}
client.on('messageCreate', async (message) => {
    if (message.author.bot || message.channelId != '966167143567745054') return
    console.log(message.content)
    console.log(message.author.id)
    //console.log(message.channelId)

    switch (message.content) {
        case '/getfullrating':
            break
        case '/get problem':
            prb: String

            break
        case '/show problem types':
            message.author.send(
                '❤️‍🔥\n1.Простейшие уравнения\n2.Начала теории вероятностей\n3.Планиметрия\n4.Вычисления и преобразования\n5.Стереометрия\n6.Производная и первообразная\n7.Задачи с прикладным содержанием\n8.Текстовые задачи\n9.Графики функций\n10.Вероятности сложных событий\n11.Наибольшее и наименьшее значение функций',
            )
            break
        default:
            message.author.send('Got it')
            break
    }
    //message.author.send('Got it')
})

client.login(token)
