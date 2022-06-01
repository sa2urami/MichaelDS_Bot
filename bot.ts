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
    if (mult.eq(0)) {mult = Big(1)}  
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

functions[15]['RV1Q2'] = function () {
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
        if (mult.eq(0)) {mult = Big(1)}     
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
        '% по сравнению с концом предыдущего года;\n- с февраля по июнь каждого года необходимо выплатить часть долга.\n'
    
    part += 'Сколько рублей было взято в банке, если известно, что кредит был полностью погашен '
    part += N.toString()
    part += ' равными платежами, и банку будет выплачено '
    part += X.times(N).toString()
    part += ' рублей?'


    return [part, ANS]
}
functions[15]['RV1Q2'].URL = 'YOUTUBE RV1Q2 URL'
functions[15]['RV1Q2'].is_text = 1


functions[15]['RV1Q3'] = function () {
    let R1000mas = [Big(1010), Big(1020), Big(1030), Big(1040), Big(1050), Big(1060), Big(1070), Big(1080), Big(1090), Big(1100), Big(1110), Big(1120), Big(1125), Big(1130), Big(1140), Big(1150), Big(1200), Big(1250),]
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
        if (mult.eq(0)) {mult = Big(1)}    
        S = S.times(mult)
        X = X.times(mult)
    }
    let ANS = X.toNumber()
    let part: string = ''
    let dateTime = new Date()
    
    part +='31 декабря '
    part += (dateTime.getFullYear()) 
    part += ' года Монечка взял в банке '
    part += S.toString()
    part += ' рублей в кредит под '
    part += R1000.div(10).minus(100).toString()
    part += '% годовых.\n'
    part += 'Схема выплаты кредита следующая — 31 декабря каждого следующего года банк начисляет проценты на оставшуюся сумму долга (то есть увеличивает долг на '
    part += R1000.div(10).minus(100).toString()
    part += '%), затем Монечка переводит в банк X рублей. Какой должна быть сумма X, чтобы Монечка выплатил долг '
    part += N.toString()
    part += ' равными платежами (то есть за '
    part += N.toString()
    part += ' года)?'

    return [part, ANS]
}
functions[15]['RV1Q3'].URL = 'YOUTUBE RV1Q3 URL'
functions[15]['RV1Q3'].is_text = 1

functions[15]['RV1Q4'] = function () {
    let R1000mas = [Big(1010), Big(1020), Big(1030), Big(1040), Big(1050), Big(1060), Big(1070), Big(1080), Big(1090), Big(1100), Big(1110), Big(1120), Big(1125), Big(1130), Big(1140), Big(1150), Big(1200), Big(1250),]
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
        if (mult.eq(0)) {mult = Big(1)}     
        S = S.times(mult)
        X = X.times(mult)
    }
    let ANS = X.times(N).toNumber()
    let part: string = ''
    let dateTime = new Date()
    
    part +='В июле '
    part += (dateTime.getFullYear() + Math.floor(Math.random() * 4)) 
    part += ' года планируется взять кредит на сумму '
    part += S.toString()
    part += ' рублей. Условия возврата таковы:\n — в январе каждого года долг увеличивается на '
    part += R1000.div(10).minus(100).toString()
    part += '% по сравнению с предыдущим годом;\n'
    part += '— с февраля по июнь нужно выплатить часть долга одним платежом.\n'
    
    part += 'Сколько рублей будет выплачено банку, если известно, что кредит будет полностью погашен '
    part += N.toString()
    part += ' равными платежами (то есть за '
    part += N.toString()
    part += ' года)?'

    return [part, ANS]
}
functions[15]['RV1Q4'].URL = 'YOUTUBE RV1Q4 URL'
functions[15]['RV1Q4'].is_text = 1


functions[15]['RV1Q5'] = function () {
    let R1000mas = [Big(1010), Big(1020), Big(1030), Big(1040), Big(1050), Big(1060), Big(1070), Big(1080), Big(1090), Big(1100), Big(1110), Big(1120), Big(1125), Big(1130), Big(1140), Big(1150), Big(1200), Big(1250),]
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
        if (mult.eq(0)) {mult = Big(1)}  
        S = S.times(mult)
        X = X.times(mult)
    }
    let ANS = S.toNumber()
    let part: string = ''
    let dateTime = new Date()
    
    part +='В июле '
    part += (dateTime.getFullYear() + Math.floor(Math.random() * 4)) 
    part += ' года планируется взять кредит на некоторую сумму. Условия возврата таковы:\n'
    part += '— в январе каждого года долг увеличивается на '
    part += R1000.div(10).minus(100).toString()
    part += '% по сравнению с предыдущим годом;\n'
    part += '— с февраля по июнь нужно выплатить часть долга одним платежом.\n'
    
    part += 'Определите, на какую сумму взяли кредит в банке, если известно, что кредит был выплачен '
    part += N.toString()
    part += ' равными платежами (то есть за '
    part += N.toString()
    part += ' года) и общая сумма выплат на '
    part += X.times(N).minus(S).toString()
    part += ' рублей больше суммы взятого кредита.'


return [part, ANS]
}
functions[15]['RV1Q5'].URL = 'YOUTUBE RV1Q5 URL'
functions[15]['RV1Q5'].is_text = 1

functions[15]['RV2'] = function () {
    let R1000mas = [Big(1100), Big(1200), Big(1300),] //Урезаные проценты, чтобы R^2 получалось с двумя знаками после запятой
    let R1000 = R1000mas[Math.floor(Math.random() * (R1000mas.length))]
    let R1000_initial=R1000
    R1000=R1000.div(1000).pow(2).times(1000)
    let DigitsMas = [Big(0),Big(1),Big(2),Big(3),Big(4),Big(5),Big(6),Big(7),Big(8),Big(9),]
    let Nmas = [Big(4),] // Большее число строк заебешься считать
    let N = Nmas[Math.floor(Math.random() * (Nmas.length))] //Получили кол-во равных выплат
    N=N.div(2)
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
        if (mult.eq(0)) {mult = Big(1)}  
        S = S.times(mult)
        X = X.times(mult)
    }
    let ANS = X.toNumber()
    let part: string = ''
    let dateTime = new Date()

    part +='Рахиль Абрамовна взяла кредит в банке на 4 года на сумму '
    part += S.toString() 
    part += ' рублей. Условия возврата кредита таковы: в конце каждого года банк увеличивает текущую сумму долга на '
    part += R1000_initial.div(10).minus(100).toString()
    part += '%.\nРахиль Абрамовна хочет выплатить весь долг двумя равными платежами ― в конце второго и четвертого годов. При этом платежи в каждом случае выплачиваются после начисления процентов. Сколько рублей составит каждый из этих платежей?'

return [part, ANS]
}
functions[15]['RV2'].URL = 'YOUTUBE RV2 URL'
functions[15]['RV2'].is_text = 1

functions[15]['RV3REF'] = function () {
    let R1000mas = [Big(1010), Big(1020), Big(1030), Big(1040), Big(1050), Big(1060), Big(1070), Big(1080), Big(1090), Big(1100), Big(1110), Big(1120), Big(1125), Big(1130), Big(1140), Big(1150), Big(1200), Big(1250),]
  
  let R1000 = Big(1010)
  while (R1000.eq(Big(1010)))
  {R1000 = R1000mas[Math.floor(Math.random() * (R1000mas.length))]} // Берем любую ставку кроме первой
  let R1000_new = Big(2000)
  while(R1000_new.gt(R1000.minus(1)))
  {R1000_new = R1000mas[Math.floor(Math.random() * (R1000mas.length))]}

  let DigitsMas = [Big(0),Big(1),Big(2),Big(3),Big(4),Big(5),Big(6),Big(7),Big(8),Big(9),]
  let Nmas = [Big(2),] // Задача предполагает только 2 года
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
      if (mult.eq(0)) {mult = Big(1)}    
      S = S.times(mult)
      X = X.times(mult)
  }
  let ANS = S.times(R1000.div(1000)).minus(X).times(R1000.minus(R1000_new).div(1000)).toNumber()
  let part: string = ''
  let dateTime = new Date()
  
  part +='В январе '
  let startYear = (dateTime.getFullYear())-1
  part += startYear.toString()
  part += ' года Абрамчик взял кредит в банке на сумму '
  part += S.toString()
  part += ' рублей. По договору с банком Абрамчик должен был погасить долг двумя равными платежами в феврале '
  part += (startYear+1).toString()
  part += ' года и феврале '
  part += (startYear+2).toString()
  part += ' года, при условии, что в январе '
  part += (startYear+1).toString()
  part += ' года и январе '
  part += (startYear+2).toString()
  part += ' года сумма оставшегося долга увеличивается на '
  part += R1000.div(10).minus(100).toString()
  part += '%. В феврале '
  part += (startYear+1).toString()
  part += ' года Абрамчик сделал первую выплату в соответствии с договором. После этого ему удалось договориться с банком о рефинансировании кредита и уменьшить процент, на который сумма долга вырастет в январе '
  part += (startYear+2).toString()
  part += ' года, до '
  part += R1000_new.div(10).minus(100).toString()
  part += '%. Какую сумму сэкономит Абрамчик на рефинансировании своего кредита?'
    return [part, ANS]
}
functions[15]['RV3REF'].URL = 'YOUTUBE RV3REF URL'
functions[15]['RV3REF'].is_text = 1

functions[15]['RV3MIN'] = function () {
    let R1000mas = [Big(1010), Big(1020), Big(1030), Big(1040), Big(1050), Big(1060), Big(1070), Big(1080), Big(1090), Big(1100), Big(1110), Big(1120), Big(1130), Big(1140), Big(1150), Big(1200),]
    let Smas = [Big(1), Big(1.5), Big(2), Big(2.5), Big(3), Big(3.5), Big(4), Big(4.5), Big(5), Big(5.5)]
    let S = Smas[Math.floor(Math.random() * (Smas.length))]
    let R1000 = R1000mas[Math.floor(Math.random() * (R1000mas.length))]
    let questionType = 1 // В этом случае формулируем вопрос про месяцы 
    if(R1000.gt(1060)) {questionType = 0} //В этом случае формулируем вопрос про года
    let X = Big(0)
    let Nmas = [Big(3),Big(4),Big(5),]
    while ((S.times(1e6).times(R1000.div(1000).minus(1))).gt(X)) //Условие для того, чтобы не оказалось что сумма долга растет бесконечно
    {
    let N_approximate = Nmas[Math.floor(Math.random() * (Nmas.length))]
    X = S.times(1e6).div(N_approximate).div(1000).round().times(1000)
    //console.log('ya_zavis'+' S='+S.toString() + ' N_approximate-' +N_approximate.toString()+' R='+R1000.div(1000).minus(1).toString()+' X='+X.toString() + ' Stimes=' + (S.times(1e6).times(R1000.div(1000).minus(1))).toString())
    }
    let N = 0
    let DEBT = S.times(1e6)
    while (DEBT>0)
    {
        DEBT=DEBT.times(R1000.div(1000)).minus(X)
        N += 1
    }
  
    let ANS = N
  
    let part: string = ''
    let dateTime = new Date()
    let startYear = (dateTime.getFullYear())-1
  
    if (questionType==1)
    {
        part += '1 января '
        part += startYear.toString()
        part += ' года Ицхак Иеремиевич взял в банке '
        part += S.toString()
        part += ' млн рублей в кредит.\nСхема выплаты кредита следующая:\n1 числа каждого следующего месяца банк начисляет '
        part += R1000.div(10).minus(100).toString()
        part += '% на оставшуюся сумму долга (то есть увеличивает долг на '
        part += R1000.div(10).minus(100).toString()
        part += '%), затем Ицхак Иеремиевич переводит в банк платёж.\n'
        part += 'На какое минимальное количество месяцев Ицхак Иеремиевич может взять кредит, чтобы ежемесячные выплаты были не более '
        part += X.toString()
        part += ' рублей?'
    }
  
    if (questionType==0)
    {
        part += 'Сара хочет взять в кредит '
        part += S.toString()
        part += ' млн рублей под '
        part += R1000.div(10).minus(100).toString()
        part += '% годовых. Погашение кредита происходит раз в год равными суммами (кроме, может быть, последней) после начисления процентов.\nНа какое минимальное количество лет Сара может взять кредит, чтобы ежегодные выплаты были не более '
        part += X.toString()
        part += ' рублей?'
    }

return [part, ANS]
}
functions[15]['RV3MIN'].URL = 'YOUTUBE RV3MIN URL'
functions[15]['RV3MIN'].is_text = 1



functions[15]['VPRP1'] = function () {
    let R1000mas = [Big(1010), Big(1020), Big(1030), Big(1040), Big(1050), Big(1060), Big(1070), Big(1080), Big(1090), Big(1100), Big(1110), Big(1120), Big(1130), Big(1140), Big(1150), Big(1200),]
    let R1000 = R1000mas[Math.floor(Math.random() * (R1000mas.length))]
    let Nmas = [Big(3),]
    let N = Nmas[Math.floor(Math.random() * (Nmas.length))]
    let DigitsMas = [Big(1),Big(2),Big(3),Big(4),Big(5)]
    let prp = [] //Массив, в котором будет храниться пропорция выплат
    prp[0]=Big(1) //По тексту задачи все выплаты даются в долях от первой, поэтому у нее вес 1
    for (var i = 1; i < N.toNumber(); i++) { //Формируем массив первых цифр после запятой в долях столбца долг (кроме цифры "0")
      let gonext=true
      while (gonext){
          let prp_candidate = DigitsMas[Math.floor(Math.random() * (DigitsMas.length-1))+1]
          if(!prp.includes(prp_candidate)){
              prp[prp.length]=prp_candidate;
              gonext=false
          }
      }
      }
      prp.sort()
  
      let Denom = R1000.pow(N.toNumber())
      let Numer = Big(0)
      for (let i = 0; i < N; i++) {
          Numer = Numer.plus(R1000.pow(N.toNumber()-i-1).times(Big(1000).pow(i+1)).times(prp[i]))
      }
      let gcdNumDen = gcdBIG(Numer, Denom)
  
      let S = Numer.div(gcdNumDen)
      let X = Denom.div(gcdNumDen)
      let multiplicator1 = Big(5000000).div(S).round(0,Big.roundDown)
      let multiplicator2 = Big(1000000).div(S).round(0,Big.roundDown)
      if (multiplicator1.gt(0)) {
          let mult = Big(Math.random()).times(multiplicator1.plus(1).minus(multiplicator2)).plus(multiplicator2).round(0,Big.roundDown)
          if (mult.eq(0)) {mult = Big(1)}  
          S = S.times(mult)
          X = X.times(mult)
      }
      let ANS = S.toNumber()
  
    
    let part: string = ''
    let dateTime = new Date()
    let startYear = (dateTime.getFullYear())-3
  
    part += '1 марта '
    part += startYear.toString()
    part += ' года Йосечка взял в банке кредит под '
    part += R1000.div(10).minus(100).toString()
    part += '% годовых. Схема выплаты кредита следующая: 1 марта каждого следующего года банк начисляет проценты на оставшуюся сумму долга (то есть увеличивает долг на '
    part += R1000.div(10).minus(100).toString()
    part += '%), затем Йосечка переводит в банк платеж. Весь долг Йосечка выплатил за 3 платежа, причем второй платеж оказался в '
    part += prp[1].toString()
    part += ' раза больше первого, а третий – в '
    part += prp[2].toString()
    if(prp[2].eq(5)) {part += ' раз '}
    else {part += ' раза '}
    part += 'больше первого. Сколько рублей взял в кредит Йосечка, если за три года он выплатил банку '
    part += prp[2].plus(prp[1]).plus(prp[0]).times(X).toString()
    part += ' рублей?'
return [part, ANS]
}
functions[15]['VPRP1'].URL = 'YOUTUBE VPRP1 URL'
functions[15]['VPRP1'].is_text = 1

functions[15]['VPRP2'] = function () {
    let R1000mas = [Big(1010), Big(1020), Big(1030), Big(1040), Big(1050), Big(1060), Big(1070), Big(1080), Big(1090), Big(1100), Big(1110), Big(1120), Big(1130), Big(1140), Big(1150), Big(1200),]
  let R1000 = R1000mas[Math.floor(Math.random() * (R1000mas.length))]
  let Nmas = [Big(3),]
  let N = Nmas[Math.floor(Math.random() * (Nmas.length))]
  let variant_uslovia = Math.floor(Math.random()*2) // Если 0 - то в два раза больше, если 1 - то в три раза больше
  let prp = [] //Массив, в котором будет храниться пропорция выплат
  if (variant_uslovia==0) {prp = [Big(1),Big(2),Big(4),]}
  if (variant_uslovia==1) {prp = [Big(1),Big(3),Big(9),]}
  

    let Denom = R1000.pow(N.toNumber())
    let Numer = Big(0)
    for (let i = 0; i < N; i++) {
        Numer = Numer.plus(R1000.pow(N.toNumber()-i-1).times(Big(1000).pow(i+1)).times(prp[i]))
    }
    let gcdNumDen = gcdBIG(Numer, Denom)

    let S = Numer.div(gcdNumDen)
    let X = Denom.div(gcdNumDen)
    let multiplicator1 = Big(5000000).div(S).round(0,Big.roundDown)
    let multiplicator2 = Big(1000000).div(S).round(0,Big.roundDown)
    if (multiplicator1.gt(0)) {
        let mult = Big(Math.random()).times(multiplicator1.plus(1).minus(multiplicator2)).plus(multiplicator2).round(0,Big.roundDown)
        if (mult.eq(0)) {mult = Big(1)}  
        S = S.times(mult)
        X = X.times(mult)
    }
    let ANS = X.toNumber()

  
  let part: string = ''
  
  part += 'Эфраим взял кредит в банке на сумму '
  part += S.toString()
  part += ' рублей. Схема выплата кредита такова: в конце каждого года банк увеличивает на '
  part += R1000.div(10).minus(100).toString()
  part += ' процентов оставшуюся сумму долга, а затем Эфраим переводит в банк свой очередной платеж. Известно, что Эфраим погасил кредит за три года, причем каждый его следующий платеж был ровно '
  if(variant_uslovia==0) {part += 'вдвое'}
  if(variant_uslovia==1) {part += 'втрое'}
  part += ' больше предыдущего. Какую сумму Эфраим заплатил в первый раз? Ответ дайте в рублях.'
return [part, ANS]
}
functions[15]['VPRP2'].URL = 'YOUTUBE VPRP2 URL'
functions[15]['VPRP2'].is_text = 1

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
                        interaction.reply('```'+'ТИПЫ 15-й ЗАДАЧИ' +
`
+--------+-----------------------------------------------------------------------------+
| КОД    | ОПИСАНИЕ ПОДТИПА ЗАДАЧИ                                                     |
+--------+-----------------------------------------------------------------------------+
| VDL    | Выплаты даны в лоб. Найти процент.                                          |
| DDL1   | Долг дан в лоб. Найти пропорцию выплаты/кредит                              |
| DDL2   | Долг дан в лоб. Каждая выплата > (или <) чего-то                            |
| DDL3   | Долг дан в лоб. Сумма выплат > (или <) чего-то, найти S                     |
| DDL4   | Долг дан в лоб. Сумма выплат > (или <) чего-то, найти r                     |
| DDL5   | Долг дан в лоб. Найти min S, чтобы каждая выплата целая                     |
| RV1Q1  | Равные выплаты. Обычная. Найти сумму кредита, зная N,X,R                    |
| RV1Q2  | Равные выплаты. Обычная. То же, что RV1Q1, только в условии не X, а сумма X |
| RV1Q3  | Равные выплаты. Обычная. Теперь надо найти выплату X, зная S                |
| RV1Q4  | Равные выплаты. Обычная. То же, что RV1Q3, только теперь в ответ сумму X    |
| RV1Q5  | Равные выплаты. Обычная. То же, что RV1Q1, только знаем NX-S, а не просто X |
| RV2    | Равные выплаты. Прикольчик с пропуском платежей (они через раз). Найти X    |
| RV3REF | Равные выплаты. Найти экономию от рефинансирования кредита (две выплаты)    |
| RV3MIN | Равные выплаты. Найти минималку лет. Прикольчик в том, чтобы тупо считать   |
| VPRP1  | Выплаты в пропорции. Найти S зная сумму выплат                              |
| VPRP2  | Выплаты в пропорции. Пропорция - растущая геометрическая прогрессия         |
+--------+-----------------------------------------------------------------------------+                        
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
