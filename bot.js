"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var config_json_1 = require("./config.json");
var fs_1 = require("fs");
var graceful_fs_1 = require("graceful-fs");
var mathjax_node_1 = require("mathjax-node");
var sharp_1 = require("sharp");
var exit_hook_1 = require("exit-hook");
mathjax_node_1["default"].config({
    displayMessages: false,
    displayErrors: false,
    MathJax: {
        displayAlign: 'left'
    }
});
mathjax_node_1["default"].start();
var client = new discord_js_1.Client({
    intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'],
    partials: ['CHANNEL']
});
var gcd = function (aa, bb) {
    var a = aa, b = bb;
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
};
var User = /** @class */ (function () {
    function User(id) {
        this.id = id;
        this.is_solving = false;
        this.problems = [];
    }
    return User;
}());
var functions = [];
//@ts-ignore
//functions = JSON.parse(readFileSync('./functions.json'))
functions[0] = function () {
    var a = Math.floor(Math.random() * 100);
    var b = Math.floor(Math.random() * 100);
    return [a + ' + ' + b, a + b];
};
functions[7] = function () {
    var NN = [2, 3, 4];
    var R1000mas = [
        1010, 1020, 1030, 1040, 1050, 1060, 1070, 1080, 1090, 1100, 1125,
    ];
    var N = NN[Math.floor(Math.random() * (NN.length - 1))];
    var R1000 = R1000mas[Math.floor(Math.random() * (R1000mas.length - 1))];
    var r = R1000 / 10 - 100;
    var Denom = Math.pow(R1000, N);
    var Numer = 0;
    for (var i = 0; i < N; i++) {
        Numer = Numer + Math.pow(1000, N - i) * Math.pow(R1000, i);
    }
    var gcdNumDen = gcd(Numer, Denom);
    var S = Math.floor(Numer / gcdNumDen);
    var X = Math.floor(Denom / gcdNumDen);
    var multiplicator1 = Math.floor(1000000 / X);
    var multiplicator2 = Math.floor(100000 / X);
    if (multiplicator1 > 0) {
        var mult = Math.floor(Math.random() * (multiplicator2 + 1 - multiplicator1 + 1) +
            multiplicator1 +
            1);
        S = S * mult;
        X = X * mult;
    }
    var ANS = S;
    var part = '';
    part +=
        '\\text{В июле 2023 года планируется взять кредит в банке на некоторую сумму.}\\newline\\text{Условия его возврата таковы:}\\newline\\text{- каждый январь долг возрастает на }';
    part += r;
    part +=
        '\\text{% по сравнению с концом предыдущего года;}\\newline\\text{- с февраля по июнь каждого года необходимо выплатить часть долга, равную }';
    part += X;
    part += '\\text{ рубль(-я,-ей).}\\newline';
    part +=
        '\\text{Сколько рублей было взято в банке, если известно, что он был полностью погашен }';
    part += N;
    part += '\\text{ равными платежами (то есть за }';
    part += N;
    part += '\\text{ года)?}';
    return [part, ANS];
};
var UserBase = [];
(0, exit_hook_1["default"])(function () {
    var buf = JSON.stringify(UserBase);
    graceful_fs_1["default"].writeFileSync('./graph.json', buf);
    //let buf1 = JSON.stringify(functions)
    ///fs.writeFileSync('./functions.json', buf1)
    console.log('backup');
});
client.once('ready', function () {
    //client.user.setAvatar('./avatar.png')
    //@ts-ignore
    UserBase = JSON.parse((0, fs_1.readFileSync)('./graph.json'));
    console.log('Ready!');
});
function inBase(cc) {
    if (UserBase[cc.id] === undefined) {
        UserBase[cc.id] = new User(+cc.id);
        UserBase[cc.id].tag = cc.tag;
    }
    if (UserBase[cc.id].tag !== cc.tag)
        UserBase[cc.id].tag = cc.tag;
}
client.on('messageCreate', function (message) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (message.author.bot)
            return [2 /*return*/];
        inBase(message.author);
        if (UserBase[message.author.id].is_solving === true) {
            if (+message.content !== UserBase[message.author.id].current_answer[1]) {
                UserBase[message.author.id].current_answer[2]++;
                message.react('❌');
            }
            else {
                UserBase[message.author.id].problems.push(UserBase[message.author.id].current_answer[0], UserBase[message.author.id].current_answer[2]);
                UserBase[message.author.id].is_solving = false;
                message.react('✅');
            }
        }
        else if (message.content[0] === '/')
            message.author.send("Isn't such command");
        return [2 /*return*/];
    });
}); });
client.on('interactionCreate', function (interaction) {
    if (!interaction.isCommand())
        return;
    inBase(interaction.user);
    switch (interaction.commandName) {
        case 'getfullrating':
            var sortable = [];
            for (var c_1 in UserBase) {
                sortable.push([
                    UserBase[c_1].tag,
                    UserBase[c_1].problems.length / 2,
                ]);
            }
            sortable.sort(function (a, b) { return b[1] - a[1]; });
            var out_1 = 'RATING\n';
            sortable.forEach(function (a, ind) {
                out_1 += ind + 1 + '.' + a[0] + ' - ' + a[1] + '\n';
            });
            if (out_1.length != 0)
                interaction.reply(out_1);
            break;
        case 'showproblemtypes':
            interaction.reply(config_json_1.ProblemsLine);
            break;
        case 'getproblem':
            var ccc_1 = interaction.options.getInteger('number');
            if (functions[ccc_1] === undefined) {
                interaction.reply("Isn't such problem number");
                return;
            }
            UserBase[interaction.user.id].is_solving = true;
            var k_1 = functions[ccc_1]();
            mathjax_node_1["default"].typeset({
                math: k_1[0],
                format: 'TeX',
                svg: true
            }, function (data) {
                (0, sharp_1["default"])(Buffer.from(data.svg), { density: 300 })
                    //@ts-ignore
                    .modulate({ lightness: 255 })
                    .png()
                    .toFile('buf.png')
                    .then(function () {
                    if (functions[ccc_1].URL === undefined)
                        interaction.reply({ files: ['./buf.png'] });
                    else
                        interaction.reply({
                            content: functions[ccc_1].URL,
                            files: ['./buf.png']
                        });
                    k_1.push(0);
                    UserBase[interaction.user.id].current_answer = k_1;
                });
            });
            break;
        case 'seturl':
            if (+interaction.user.id !== 706909530126155900) {
                interaction.reply('Do not have permission');
                break;
            }
            var c = interaction.options.getInteger('number');
            var kk = interaction.options.getString('url');
            if (functions[c] !== undefined) {
                functions[c].URL = kk;
                interaction.reply('confirmed');
            }
            else
                interaction.reply('There is no such function');
            break;
    }
});
client.login(config_json_1.token);
