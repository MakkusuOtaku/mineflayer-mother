# Mineflayer-mother
Mineflayer plugin for keeping your bots safe.

## Example
```js
const mineflayer = require('mineflayer');
const mother = require('./mineflayer-mother.js').mother;

const bot = mineflayer.createBot({
	host: "localhost",
	username: "Machine",
});

bot.loadPlugin(mother);
```

## Events
* mother-BeginMLG
* mother-EndMLG

## To-do List
- Auto eat
- Sneak on cliffs
- Auto extinguish
- Fix stuff
- Add bed MLG
- Finish Readme
