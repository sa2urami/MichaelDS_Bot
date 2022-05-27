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
var gcdBIG = function (aa: Big, bb: Big) {
    let a = aa,
        b = bb
    if (b.eq(0)) {
        return a
    }
    return gcdBIG(b, a.mod(b))
}

const lcm = (...arr) => {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    const _lcm = (x, y) => (x * y) / gcd(x, y);
    return [...arr].reduce((a, b) => _lcm(a, b));
  };

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
    part += ' 0%    |'
    part += '\n'
    part += '+-------------------------------+'+'-------+'.repeat(N.toNumber())+'\n'
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
functions[15]['DDL2'] = function () {
    let R1000mas = [
        Big(1010), Big(1020), Big(1030), Big(1040), Big(1050), Big(1060), Big(1070), Big(1080), Big(1090), Big(1100), Big(1110), Big(1120), Big(1125), Big(1130), Big(1140), Big(1150), Big(1200), Big(1250),
    ]
    let R1000 = R1000mas[Math.floor(Math.random() * (R1000mas.length))]
    let DigitsMas = [Big(0),Big(1),Big(2),Big(3),Big(4),Big(5),Big(6),Big(7),Big(8),Big(9),]
    let XborderMas = [Big(3),Big(3.5),Big(4),Big(4.5),Big(5),Big(5.5),Big(6),Big(6.5),Big(7),Big(7.5),Big(8),Big(8.5),Big(9),Big(9.5),Big(10),Big(10.5),Big(11),Big(11.5),Big(12),Big(12.5),]
    let Nmas = [Big(4),Big(5), Big(6), Big(7), Big(8),]
    let questionVariantMas = [0,1] //Массив для вариантов вопроса к задаче
    let aMas = [] //Массив первых цифр после запятой для столбца долг
    let bMas = [] //Массив вторых цифр после запятой для столбца долг
    let N = Nmas[Math.floor(Math.random() * (Nmas.length))] //Получили кол-во столбцов в таблице долг
    let questionVariant = questionVariantMas[Math.floor(Math.random() * (questionVariantMas.length))] //Случайно выбираем, какой вопрос будем ставить [0] для вопроса, когда каждая из выплат больше Xborder, [1] - когда спрашивают, чтобы каждая выплата меньше Xborder
    let XBorder = XborderMas[Math.floor(Math.random() * (XborderMas.length))]
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
        if(sum.mod(10).eq(0)){
            podbor_needed = false
            bMas=bMas_candidate
        }
    
    
    }
    //БЛОК расчета ответа
    //Расчитываем стоблец выплат в долях от S
    let XMas=[]
    XMas[0]=R1000.div(1000).minus(aMas[0].div(10).plus(bMas[0].div(100)))
    for (var i=1;i<N.minus(2).toNumber();i++){
        XMas[i]=R1000.div(1000).times(aMas[i-1].div(10).plus(bMas[i-1].div(100))).minus(aMas[i].div(10).plus(bMas[i].div(100)))
    }
    XMas[N.minus(2).toNumber()]=R1000.div(1000).times(aMas[N.minus(3).toNumber()].div(10).plus(bMas[N.minus(3).toNumber()].div(100)))
    
    let ANS_variants = [] //[0] для вопроса, когда каждая из выплат больше Xborder, [1] - когда спрашивают, чтобы каждая выплата меньше Xborder
    
    // console.log('XMas--------------------*')
    // XMas.forEach(function(value){console.log(value.toString())})
    XMas.sort()
    //console.log('Xborder='+XBorder.toString())
    ANS_variants[0]=XBorder.div(XMas[0]).round(0,Big.roundUp)
    XMas.reverse()
    ANS_variants[1]=XBorder.div(XMas[0]).round(0,Big.roundDown)
    
    //БЛОК формирования условия
    
    let dateTime = new Date()
        
    let part: string = 'В июле '
    let debtStartYear = dateTime.getFullYear() + Math.floor(Math.random() * 4)
    part += debtStartYear.toString()
    part += ' года Сара планирует взять кредит в банке на '
    part += N.minus(1).toString() 
    if(N.gt(5)) {part += ' лет'}
    if(Big(6).gt(N))  {part += ' года'}
    part += ' в размере S млн рублей, где S — целое число. Условия его возврата таковы:\n'
    part += '− каждый январь долг увеличивается на '
    part += R1000.div(1000).minus(1).times(100).toString()
    part += '% по сравнению с концом предыдущего года;\n'
    part += '− с февраля по июнь каждого года необходимо выплатить одним платежом часть долга;\n'
    part += '− в июле каждого года долг должен составлять часть кредита в соответствии со следующей таблицей\n'
    part += '\n'
    part += '+---------------------+'+'-----------+'.repeat(N.toNumber())+'\n'
    //Формируем первую строку таблицы
    part += '| Месяц и год         |'
    for(var i=0;i<N.toNumber();i++)
    {
        part += ' июль '+(debtStartYear+i).toString()+' |'
    }
    
    part += '\n'
    part += '+---------------------+'+'-----------+'.repeat(N.toNumber())+'\n'
    //Формируем вторкую строку таблицы
    part += '| Долг (в млн рублей) | S         |'
    
    
    for(var i=0;i<N.minus(2).toNumber();i++)
    {
        part += ' 0.'+ aMas[i].toString() + bMas[i].toString() +'*S'+'    |'
    }
    
    part += ' 0         |'
    part += '\n'
    part += '+---------------------+'+'-----------+'.repeat(N.toNumber())+'\n'
    
    part += '\n'
    
    if(questionVariant==0){
        part += 'Найдите наименьшее значение S, при котором каждая из выплат будет больше '
        part += XBorder.toString()
        part += ' млн рублей'
    }
    if(questionVariant==1){
        part += 'Найдите наибольшее значение S, при котором каждая из выплат будет меньше '
        part += XBorder.toString()
        part += ' млн рублей'
    }
    
    let ANS = ANS_variants[questionVariant].toNumber()
 
    
    return [part, ANS]
}
functions[15]['DDL2'].URL = 'YOUTUBE DDL2 URL'
functions[15]['DDL2'].is_text = 1
functions[15]['DDL3'] = function () {
    let R1000mas = [
        Big(1010), Big(1020), Big(1030), Big(1040), Big(1050), Big(1060), Big(1070), Big(1080), Big(1090), Big(1100), Big(1110), Big(1120), Big(1125), Big(1130), Big(1140), Big(1150), Big(1200), Big(1250),
    ]
    let R1000 = R1000mas[Math.floor(Math.random() * (R1000mas.length))]
    let DigitsMas = [Big(0),Big(1),Big(2),Big(3),Big(4),Big(5),Big(6),Big(7),Big(8),Big(9),]
    let sumXborderMas = [Big(13),Big(13.5),Big(14),Big(14.5),Big(15),Big(15.5),Big(16),Big(16.5),Big(17),Big(17.5),Big(18),Big(18.5),Big(19),Big(19.5),Big(20),Big(20.5),Big(21),Big(21.5),Big(22),Big(22.5),
        Big(23),Big(23.5),Big(24),Big(24.5),Big(25),Big(25.5),Big(26),Big(26.5),Big(27),Big(27.5),Big(28),Big(28.5),Big(29),Big(29.5),Big(30),Big(30.5),Big(31),Big(31.5),Big(32),Big(32.5),]
    let Nmas = [Big(4),Big(5), Big(6), Big(7), Big(8),]
    let questionVariantMas = [0,1] //Массив для вариантов вопроса к задаче
    let aMas = [] //Массив первых цифр после запятой для столбца долг
    let bMas = [] //Массив вторых цифр после запятой для столбца долг
    let N = Nmas[Math.floor(Math.random() * (Nmas.length))] //Получили кол-во столбцов в таблице долг
    let questionVariant = questionVariantMas[Math.floor(Math.random() * (questionVariantMas.length))] //Случайно выбираем, какой вопрос будем ставить [0] для вопроса, когда каждая из выплат больше Xborder, [1] - когда спрашивают, чтобы каждая выплата меньше Xborder
    let sumXBorder = sumXborderMas[Math.floor(Math.random() * (sumXborderMas.length))]
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
        if(sum.mod(10).eq(0)){
            podbor_needed = false
            bMas=bMas_candidate
        }
    
    
    }
    //БЛОК расчета ответа
    //Расчитываем стоблец выплат в долях от S
    let XMas=[]
    XMas[0]=R1000.div(1000).minus(aMas[0].div(10).plus(bMas[0].div(100)))
    for (var i=1;i<N.minus(2).toNumber();i++){
        XMas[i]=R1000.div(1000).times(aMas[i-1].div(10).plus(bMas[i-1].div(100))).minus(aMas[i].div(10).plus(bMas[i].div(100)))
    }
    XMas[N.minus(2).toNumber()]=R1000.div(1000).times(aMas[N.minus(3).toNumber()].div(10).plus(bMas[N.minus(3).toNumber()].div(100)))
    
    let sumX = Big(0)
    XMas.forEach(function(value){sumX =sumX.plus(value)})
    
    let ANS_variants = [] //[0] для вопроса, когда каждая из выплат больше Xborder, [1] - когда спрашивают, чтобы каждая выплата меньше Xborder
    
    // console.log('XMas--------------------*')
    // XMas.forEach(function(value){console.log(value.toString())})
    XMas.sort()
    //console.log('Xborder='+XBorder.toString())
    ANS_variants[0]=sumXBorder.div(sumX).round(0,Big.roundUp)
    XMas.reverse()
    ANS_variants[1]=sumXBorder.div(sumX).round(0,Big.roundDown)
    
    //БЛОК формирования условия
    
    let dateTime = new Date()
        
    let part: string = 'В июле '
    let debtStartYear = dateTime.getFullYear() + Math.floor(Math.random() * 4)
    part += debtStartYear.toString()
    part += ' года Сара планирует взять кредит в банке на '
    part += N.minus(1).toString() 
    if(N.gt(5)) {part += ' лет'}
    if(Big(6).gt(N))  {part += ' года'}
    part += ' в размере S млн рублей, где S — целое число. Условия его возврата таковы:\n'
    part += '− каждый январь долг увеличивается на '
    part += R1000.div(1000).minus(1).times(100).toString()
    part += '% по сравнению с концом предыдущего года;\n'
    part += '− с февраля по июнь каждого года необходимо выплатить одним платежом часть долга;\n'
    part += '− в июле каждого года долг должен составлять часть кредита в соответствии со следующей таблицей\n'
    part += '\n'
    part += '+---------------------+'+'-----------+'.repeat(N.toNumber())+'\n'
    //Формируем первую строку таблицы
    part += '| Месяц и год         |'
    for(var i=0;i<N.toNumber();i++)
    {
        part += ' июль '+(debtStartYear+i).toString()+' |'
    }
    
    part += '\n'
    part += '+---------------------+'+'-----------+'.repeat(N.toNumber())+'\n'
    //Формируем вторкую строку таблицы
    part += '| Долг (в млн рублей) | S         |'
    
    
    for(var i=0;i<N.minus(2).toNumber();i++)
    {
        part += ' 0.'+ aMas[i].toString() + bMas[i].toString() +'*S'+'    |'
    }
    
    part += ' 0         |'
    part += '\n'
    part += '+---------------------+'+'-----------+'.repeat(N.toNumber())+'\n'
    
    part += '\n'
    
    if(questionVariant==0){
        part += 'Найдите наименьшее значение S, при котором общая сумма выплат будет больше '
        part += sumXBorder.toString()
        part += ' млн рублей'
    }
    if(questionVariant==1){
        part += 'Найдите наибольшее значение S, при котором общая сумма выплат будет меньше '
        part += sumXBorder.toString()
        part += ' млн рублей'
    }
    
    let ANS = ANS_variants[questionVariant].toNumber()

    return [part, ANS]

}
functions[15]['DDL3'].URL = 'YOUTUBE DDL3 URL'
functions[15]['DDL3'].is_text = 1

functions[15]['DDL4'] = function () {
    let DigitsMas = [Big(0),Big(1),Big(2),Big(3),Big(4),Big(5),Big(6),Big(7),Big(8),Big(9),]
    let sumXborderMas = [Big(13),Big(13.5),Big(14),Big(14.5),Big(15),Big(15.5),Big(16),Big(16.5),Big(17),Big(17.5),Big(18),Big(18.5),Big(19),Big(19.5),Big(20),Big(20.5),Big(21),Big(21.5),Big(22),Big(22.5),
        Big(23),Big(23.5),Big(24),Big(24.5),Big(25),Big(25.5),Big(26),Big(26.5),Big(27),Big(27.5),Big(28),Big(28.5),Big(29),Big(29.5),Big(30),Big(30.5),Big(31),Big(31.5),Big(32),Big(32.5),]
    let Nmas = [Big(4),Big(5), Big(6), Big(7), Big(8),]
    let questionVariantMas = [0,1] //Массив для вариантов вопроса к задаче
    let aMas = [] //Массив первых цифр после запятой для столбца долг
    let bMas = [] //Массив вторых цифр после запятой для столбца долг
    let N = Nmas[Math.floor(Math.random() * (Nmas.length))] //Получили кол-во столбцов в таблице долг
    let questionVariant = questionVariantMas[Math.floor(Math.random() * (questionVariantMas.length))] //Случайно выбираем, какой вопрос будем ставить: [0] для вопроса, когда сумма выплат больше sumXborder, [1] - когда спрашивают, чтобы сумма выплат меньше sumXborder
    let sumXBorder = sumXborderMas[Math.floor(Math.random() * (sumXborderMas.length))]
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
        if(sum.mod(10).eq(0)){
            podbor_needed = false
            bMas=bMas_candidate
        }
    
    
    }
    //БЛОК расчета ответа
    //Расчитываем сумму долей долга
    let sumD = Big(0)
    aMas.forEach(function(value){sumD =sumD.plus(value.div(10))})
    bMas.forEach(function(value){sumD =sumD.plus(value.div(100))})
    
    let Smin=Big(1).div(Big(1.29).plus(Big(0.29).times(sumD))).times(sumXBorder).round(0,Big.roundUp)
    let Smax=Big(1).div(Big(1.02).plus(Big(0.02).times(sumD))).times(sumXBorder).round(0,Big.roundDown)
    
    let S = Big(0) //генерурем случайное S между S_min S_max
    while(!(Smax.gt(S) && S.gt(Smin))){
        S=Smin.plus(Big(Math.random()).times(15).round())
        
    }
    
    // aMas.forEach(function(value){console.log('a[i]='+value.toString())})
    // bMas.forEach(function(value){console.log('b[i]='+value.toString())})
    let ANS_variants = []
    ANS_variants[0]=sumXBorder.div(S).plus(sumD).div(sumD.plus(1)).round(2,Big.roundUp).minus(1).times(100)
    ANS_variants[1]=sumXBorder.div(S).plus(sumD).div(sumD.plus(1)).round(2,Big.roundDown).minus(1).times(100)
    
    //БЛОК формирования условия
    
    let dateTime = new Date()
        
    let part: string = '15-го января '
    let debtStartYear = dateTime.getFullYear() + Math.floor(Math.random() * 4)
    part += debtStartYear.toString()
    part += ' года Сара планирует взять кредит в банке на '
    part += N.minus(1).toString() 
    if(N.gt(5)) {part += ' месяцев'}
    if(Big(6).gt(N))  {part += ' месяца'}
    part += ' в размере '
    part += S.toString()
    part += ' млн рублей. Условия его возврата таковы:\n'
    part += '— 1-го числа каждого месяца долг увеличивается на r процентов по сравнению с концом предыдущего месяца, где r — целое число;\n'
    part += '— со 2-го по 14-е число каждого месяца необходимо выплатить часть долга;\n'
    part += '— 15-го числа каждого месяца долг должен составлять некоторую сумму в соответствии со следующей таблицей.\n'
    part += '\n'
    part += '+---------------------+'+'-----------+'.repeat(N.toNumber())+'\n'
    //Формируем первую строку таблицы
    part += '| Дата                |'
    for(var i=0;i<N.toNumber();i++)
    {
        part += ' 15.0'+(i+1).toString()+'     |'
    }
    
    part += '\n'
    part += '+---------------------+'+'-----------+'.repeat(N.toNumber())+'\n'
    //Формируем вторкую строку таблицы
    part += '| Долг (в млн рублей) | '
    part += S.toString()+' '.repeat(10-S.toString().length)+'|'
    
    
    for(var i=0;i<N.minus(2).toNumber();i++)
    {
        part += ' '+ S.times(aMas[i].div(10).plus(bMas[i].div(100))).toString() +' '.repeat(10-S.times(aMas[i].div(10).plus(bMas[i].div(100))).toString().length)+'|'
    
    }
    
    part += ' 0         |'
    part += '\n'
    part += '+---------------------+'+'-----------+'.repeat(N.toNumber())+'\n'
    
    part += '\n'
    
    if(questionVariant==0){
        part += 'Найдите наименьшее значение r, при котором общая сумма выплат будет больше '
        part += sumXBorder.toString()
        part += ' млн рублей'
    }
    if(questionVariant==1){
        part += 'Найдите наибольшее значение r, при котором общая сумма выплат будет меньше '
        part += sumXBorder.toString()
        part += ' млн рублей'
    }
    
    let ANS = ANS_variants[questionVariant].toNumber()
    return [part,ANS]
}
functions[15]['DDL4'].URL = 'YOUTUBE DDL4 URL'
functions[15]['DDL4'].is_text = 1
functions[15]['DDL5'] = function () {
    let part: string = ''
    let ANS = 10000
    while (ANS == 10000) //генерируем задачу, пока не получим вариант не со скучным ответом
    {
    let R1000mas = [
        Big(1010), Big(1020), Big(1030), Big(1040), Big(1050), Big(1060), Big(1070), Big(1080), Big(1090), Big(1100), Big(1110), Big(1120), Big(1125), Big(1130), Big(1140), Big(1150), Big(1200), Big(1250),
    ]
    let R1000 = R1000mas[Math.floor(Math.random() * (R1000mas.length))]
    let DigitsMas = [Big(0),Big(1),Big(2),Big(3),Big(4),Big(5),Big(6),Big(7),Big(8),Big(9),]
    let Nmas = [Big(4),Big(5), Big(6), Big(7), Big(8),]
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
        if(sum.mod(10).eq(0)){
            podbor_needed = false
            bMas=bMas_candidate
        }


    }
    //БЛОК расчета ответа
    //Расчитываем стоблец выплат в долях от S
    let XMas=[]
    XMas[0]=R1000.div(1000).minus(aMas[0].div(10).plus(bMas[0].div(100)))
    for (var i=1;i<N.minus(2).toNumber();i++){
        XMas[i]=R1000.div(1000).times(aMas[i-1].div(10).plus(bMas[i-1].div(100))).minus(aMas[i].div(10).plus(bMas[i].div(100)))
    }
    XMas[N.minus(2).toNumber()]=R1000.div(1000).times(aMas[N.minus(3).toNumber()].div(10).plus(bMas[N.minus(3).toNumber()].div(100)))

    let denominatorMas = []
    XMas.forEach(function(value){denominatorMas[denominatorMas.length]=Big(1e6).div(gcdBIG(Big(1e6),Big(1e6).times(value))).toNumber()})





    //БЛОК формирования условия

    let dateTime = new Date()
    part = ''    
    part += 'В июле '
    let debtStartYear = dateTime.getFullYear() + Math.floor(Math.random() * 4)
    part += debtStartYear.toString()
    part += ' года Сара планирует взять кредит в банке на '
    part += N.minus(1).toString() 
    if(N.gt(5)) {part += ' лет'}
    if(Big(6).gt(N))  {part += ' года'}
    part += ' в размере S тысяч рублей, где S — целое число. Условия его возврата таковы:\n'
    part += '− каждый январь долг увеличивается на '
    part += R1000.div(1000).minus(1).times(100).toString()
    part += '% по сравнению с концом предыдущего года;\n'
    part += '− с февраля по июнь каждого года необходимо выплатить одним платежом часть долга;\n'
    part += '− в июле каждого года долг должен составлять часть кредита в соответствии со следующей таблицей\n'
    part += '\n'
    part += '+---------------------+'+'-----------+'.repeat(N.toNumber())+'\n'
    //Формируем первую строку таблицы
    part += '| Месяц и год         |'
    for(var i=0;i<N.toNumber();i++)
    {
        part += ' июль '+(debtStartYear+i).toString()+' |'
    }

    part += '\n'
    part += '+---------------------+'+'-----------+'.repeat(N.toNumber())+'\n'
    //Формируем вторкую строку таблицы
    part += '| Долг (в млн рублей) | S         |'


    for(var i=0;i<N.minus(2).toNumber();i++)
    {
        part += ' 0.'+ aMas[i].toString() + bMas[i].toString() +'*S'+'    |'
    }

    part += ' 0         |'
    part += '\n'
    part += '+---------------------+'+'-----------+'.repeat(N.toNumber())+'\n'

    part += '\n'
    part += 'Найдите наименьшее значение S, при котором каждая из выплат будет составлять целое число тысяч рублей.'

    ANS = lcm(...denominatorMas)
    }
    return [part,ANS]
}
functions[15]['DDL5'].URL = 'YOUTUBE DDL5 URL'
functions[15]['DDL5'].is_text = 1
functions[15]['RV1Q1'] = function () {
    let R1000mas = [
        Big(1010), Big(1020), Big(1030), Big(1040), Big(1050), Big(1060), Big(1070), Big(1080), Big(1090), Big(1100), Big(1110), Big(1120), Big(1125), Big(1130), Big(1140), Big(1150), Big(1200), Big(1250),
    ]
    let R1000 = R1000mas[Math.floor(Math.random() * (R1000mas.length))]
let DigitsMas = [Big(0),Big(1),Big(2),Big(3),Big(4),Big(5),Big(6),Big(7),Big(8),Big(9),]
let Nmas = [Big(2),Big(3), Big(4),] // Большее число строк заебешься считать
let N = Nmas[Math.floor(Math.random() * (Nmas.length))] //Получили кол-во равных выплат

let Denom = R1000.pow(N.toNumber())
let Numer = Big(0)
for (let i = 0; i < N; i++) {
    Numer = Numer.plus(Big(1000).pow(N.toNumber()-i).times(R1000.pow(i)))
}
let gcdNumDen = gcdBIG(Numer, Denom)
let S = Numer.div(gcdNumDen)
let X = Denom.div(gcdNumDen)
let multiplicator1 = Big(1000000).div(X).round(0,Big.roundDown)
let multiplicator2 = Big(100000).div(X).round(0,Big.roundDown)
if (multiplicator1.gt(0)) {
    let mult = Big(Math.random()).times(multiplicator1.plus(1).minus(multiplicator2)).plus(multiplicator2).round(0,Big.roundDown)   
    S = S.times(mult)
    X = X.times(mult)
}
let ANS = S.toNumber()
let part: string = ''
let dateTime = new Date()

part +='В июле '
part += (dateTime.getFullYear() + Math.floor(Math.random() * 4))
part += ' года планируется взять кредит в банке на некоторую сумму.\nУсловия его возврата таковы:\n- каждый январь долг возрастает на '
part += R1000.div(10).minus(100).toString()
part +=
    '% по сравнению с концом предыдущего года;\n- с февраля по июнь каждого года необходимо выплатить часть долга, равную '
part += X.toString()
part += ' рубль(-я,-ей).\n'
part +=
    'Сколько рублей было взято в банке, если известно, что он был полностью погашен '
part += N.toString()
part += ' равными платежами (то есть за '
part += N.toString()
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
+-----+---------------------------------------+--------------+
|#    |NICKNAME                               |PRBLMS SOLVED |
+-----+---------------------------------------+--------------+
`
            sortable.forEach((a, ind) => {
                out +=
                    '|' +
                    (ind + 1) +
                    ' '.repeat(5 - (ind + 1).toString().length) +
                    '|' +
                    a[0] +
                    ' '.repeat(39 - a[0].toString().length) +
                    '|' +
                    a[1] +
                    ' '.repeat(14 - a[1].toString().length) +
                    '|' +
                    '\n'
            })
            out += '+-----+---------------------------------------+--------------+'
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
| DDL2  | Долг дан в лоб. Каждая выплата > (или <) чего-то         |
+-------+----------------------------------------------------------+
| DDL3  | Долг дан в лоб. Сумма выплат > (или <) чего-то, найти S  |
+-------+----------------------------------------------------------+
| DDL4  | Долг дан в лоб. Сумма выплат > (или <) чего-то, найти r  |
+-------+----------------------------------------------------------+
| DDL5  | Долг дан в лоб. Найти min S, чтобы каждая выплата целая  |
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
