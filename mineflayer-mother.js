const vec3 = require('vec3');

const defaultOptions = {
	boats: ['oak_boat', 'spruce_boat', 'birch_boat', 'jungle_boat', 'acacia_boat', 'dark_oak_boat'],
	keepBucket: true,
	maxVelocity: 0.45,
	mlgBlocks: ['water_bucket', 'slime_block', 'sweet_berries', 'cobweb', 'hay_block'],
	vehicles: ['Boat', 'Donkey', 'Horse', 'Minecart'],
};

exports.mother = (bot)=>{
	bot.mother = defaultOptions;
	bot.mother.doingMLG = false;

	bot.on('move', ()=>{
		if (bot.entity.velocity.y < -bot.mother.maxVelocity) {
			mlg(bot);
		} else if (bot.mother.doingMLG) {
			bot.mother.doingMLG = false;
			if (bot.mother.keepBucket) {
				let waterBlock = bot.findBlock({
					matching: [26], //This means water, obviously.
					maxDistance: 6,
				});
				if (!waterBlock) return;
				bot.lookAt(waterBlock.position, true, ()=>{
					bot.activateItem();
				});
			}
			bot.emit('mother-endMLG');
		}
	});
};

async function mlg(bot) {
	if (!bot.mother.doingMLG) bot.emit('mother-beginMLG');
	bot.mother.doingMLG = true;

	let neighbour = bot.nearestEntity();
	if (neighbour && bot.mother.vehicles.includes(neighbour.mobType) && bot.entity.position.distanceTo(neighbour.position) < 6) {
		bot.mount(neighbour);
		setTimeout(bot.dismount, 100);
		return;
	}

	try {
		for (item of bot.inventory.slots) {
			if (item && bot.mother.mlgBlocks.includes(item.name)) {
				await bot.equip(item.type, 'hand');
				break;
			}
		}

		await bot.look(bot.entity.yaw, -Math.PI/2, true);
		let reference = bot.blockAtCursor(5);
		if (reference && bot.heldItem) {
			if (bot.heldItem.name.endsWith('_bucket') || bot.mother.boats.includes(bot.heldItem.name)) await bot.activateItem();
			else await bot.placeBlock(reference, vec3(0, 1, 0));
		}
		bot.look(bot.entity.yaw, 0);
	} catch(err) {
		console.log(err);
	}
}
