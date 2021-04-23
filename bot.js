const mineflayer = require('mineflayer');
const mother = require('./mineflayer-mother.js').mother;

const bot = mineflayer.createBot({
	host: "localhost",
	username: "ClutchMachine",
});

bot.loadPlugin(mother);

bot.on('mother-beginMLG', ()=>{
	bot.chat("Oh no!");
});

bot.on('mother-endMLG', ()=>{
	bot.chat("Anyway...");
});