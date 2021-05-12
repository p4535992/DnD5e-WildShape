

export const MODULE_NAME = 'foundryvtt-dnd5e-wildshape';

/**
 * Because typescript doesn't know when in the lifecycle of foundry your code runs, we have to assume that the
 * canvas is potentially not yet initialized, so it's typed as declare let canvas: Canvas | {ready: false}.
 * That's why you get errors when you try to access properties on canvas other than ready.
 * In order to get around that, you need to type guard canvas.
 * Also be aware that this will become even more important in 0.8.x because no canvas mode is being introduced there.
 * So you will need to deal with the fact that there might not be an initialized canvas at any point in time.
 * @returns
 */
 export function getCanvas(): Canvas {
	if (!(canvas instanceof Canvas) || !canvas.ready) {
		throw new Error("Canvas Is Not Initialized");
	}
	return canvas;
}


export const registerSettings = function () {

  game.settings.register(MODULE_NAME, 'position', {
		name: game.i18n.localize(MODULE_NAME+".position.name"),
		hint: game.i18n.localize(MODULE_NAME+".position.hint"),
		scope: "world",
		config: true,
		type: String,
		default: "left",
		choices: {
			"left": game.i18n.localize(MODULE_NAME+".position.left"),
			"right": game.i18n.localize(MODULE_NAME+".position.right"),
			"top": game.i18n.localize(MODULE_NAME+".position.top"),
			"bottom": game.i18n.localize(MODULE_NAME+".position.bottom"),
		}
	});
	// game.settings.register(MODULE_NAME, "playerActivation", {
	// 	name: game.i18n.localize(MODULE_NAME+".playerActivation.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".playerActivation.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	default: true,
	// 	type: Boolean
	// });

	// if (game.system.id === 'dnd5e') {
	// 	game.settings.register(MODULE_NAME, "checkAvailability", {
	// 		name: game.i18n.localize(MODULE_NAME+".checkAvailability.name"),
	// 		hint: game.i18n.localize(MODULE_NAME+".checkAvailability.hint"),
	// 		scope: "world",
	// 		config: true,
	// 		default: true,
	// 		type: Boolean
	// 	});
	// 	game.settings.register(MODULE_NAME, "consumeItem", {
	// 		name: game.i18n.localize(MODULE_NAME+".consumeItem.name"),
	// 		hint: game.i18n.localize(MODULE_NAME+".consumeItem.hint"),
	// 		scope: "world",
	// 		config: true,
	// 		default: true,
	// 		type: Boolean
	// 	});
	// 	game.settings.register(MODULE_NAME, "dmAsPlayer", {
	// 		name: game.i18n.localize(MODULE_NAME+".dmAsPlayer.name"),
	// 		hint: game.i18n.localize(MODULE_NAME+".dmAsPlayer.hint"),
	// 		scope: "world",
	// 		config: true,
	// 		default: false,
	// 		type: Boolean
	// 	});
	// }

	// // Light Parameters
	// game.settings.register(MODULE_NAME, "lightBrightRadius", {
	// 	name: game.i18n.localize(MODULE_NAME+".lightBrightRadius.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lightBrightRadius.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	default: 20,
	// 	type: Number
	// });
	// game.settings.register(MODULE_NAME, "lightDimRadius", {
	// 	name: game.i18n.localize(MODULE_NAME+".lightDimRadius.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lightDimRadius.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	default: 40,
	// 	type: Number
	// });
	// game.settings.register(MODULE_NAME, 'lightType', {
	// 	name: game.i18n.localize(MODULE_NAME+".lightType.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lightType.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	type: String,
	// 	default: "Type1",
	// 	choices: {
	// 		"Type0": game.i18n.localize(MODULE_NAME+".lightType.type0"),
	// 		"Type1": game.i18n.localize(MODULE_NAME+".lightType.type1"),
	// 		"Type2": game.i18n.localize(MODULE_NAME+".lightType.type2"),
	// 		"Type3": game.i18n.localize(MODULE_NAME+".lightType.type3"),
	// 		"Type4": game.i18n.localize(MODULE_NAME+".lightType.type4"),
	// 		"Type5": game.i18n.localize(MODULE_NAME+".lightType.type5"),
	// 		"Type6": game.i18n.localize(MODULE_NAME+".lightType.type6"),
	// 		"Type7": game.i18n.localize(MODULE_NAME+".lightType.type7"),
	// 		"Type8": game.i18n.localize(MODULE_NAME+".lightType.type8"),
	// 		"Type9": game.i18n.localize(MODULE_NAME+".lightType.type9"),
	// 		"Type10": game.i18n.localize(MODULE_NAME+".lightType.type10"),
	// 		"Type11": game.i18n.localize(MODULE_NAME+".lightType.type11"),
	// 		"Type12": game.i18n.localize(MODULE_NAME+".lightType.type12"),
	// 		"Type13": game.i18n.localize(MODULE_NAME+".lightType.type13"),
	// 		"Type14": game.i18n.localize(MODULE_NAME+".lightType.type14"),
	// 		"Type15": game.i18n.localize(MODULE_NAME+".lightType.type15"),
	// 		"TypeC": game.i18n.localize(MODULE_NAME+".lightType.typeC"),
	// 	}
	// });



	// game.settings.register(MODULE_NAME, "customLightColor", {
	// 	name: game.i18n.localize(MODULE_NAME+".lightType.customColor.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lightType.customColor.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	restricted: false,
	// 	type: String,
	// 	default: "#a2642a"
	// });
	// game.settings.register(MODULE_NAME, "customLightColorIntensity", {
	// 	name: game.i18n.localize(MODULE_NAME+".lightType.customIntensity.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lightType.customIntensity.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	restricted: true,
	// 	type: Number,
	// 	default: 0.5,
	// 	range: {
	// 		min: 0.0,
	// 		step: 0.05,
	// 		max: 1,
	// 	}
	// });
	// game.settings.register(MODULE_NAME, 'customLightAnimationType', {
	// 	name: game.i18n.localize(MODULE_NAME+".lightType.customAnimationType.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lightType.customAnimationType.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	type: String,
	// 	default: "none",
	// 	choices: {
	// 		"none": game.i18n.localize(MODULE_NAME+".animationType.none"),
	// 		"torch": game.i18n.localize(MODULE_NAME+".animationType.torch"),
	// 		"pulse": game.i18n.localize(MODULE_NAME+".animationType.pulse"),
	// 		"chroma": game.i18n.localize(MODULE_NAME+".animationType.chroma"),
	// 		"wave": game.i18n.localize(MODULE_NAME+".animationType.wave"),
	// 		"fog": game.i18n.localize(MODULE_NAME+".animationType.fog"),
	// 		"sunburst": game.i18n.localize(MODULE_NAME+".animationType.sunburst"),
	// 		"dome": game.i18n.localize(MODULE_NAME+".animationType.dome"),
	// 		"emanation": game.i18n.localize(MODULE_NAME+".animationType.emanation"),
	// 		"hexa": game.i18n.localize(MODULE_NAME+".animationType.hexa"),
	// 		"ghost": game.i18n.localize(MODULE_NAME+".animationType.ghost"),
	// 		"energy": game.i18n.localize(MODULE_NAME+".animationType.energy"),
	// 		"roiling": game.i18n.localize(MODULE_NAME+".animationType.roiling"),
	// 		"hole": game.i18n.localize(MODULE_NAME+".animationType.hole"),
	// 	}
	// });
	// game.settings.register(MODULE_NAME, "customLightAnimationSpeed", {
	// 	name: game.i18n.localize(MODULE_NAME+".lightType.customAnimationSpeed.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lightType.customAnimationSpeed.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	restricted: true,
	// 	type: Number,
	// 	default: 5,
	// 	range: {
	// 		min: 1,
	// 		step: 1,
	// 		max: 10,
	// 	}
	// });
	// game.settings.register(MODULE_NAME, "customLightAnimationIntensity", {
	// 	name: game.i18n.localize(MODULE_NAME+".lightType.customAnimationIntensity.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lightType.customAnimationIntensity.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	restricted: true,
	// 	type: Number,
	// 	default: 5,
	// 	range: {
	// 		min: 1,
	// 		step: 1,
	// 		max: 10,
	// 	}
	// });




	// // Lantern Parameters
	// game.settings.register(MODULE_NAME, "lanternBrightRadius", {
	// 	name: game.i18n.localize(MODULE_NAME+".lanternBrightRadius.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lanternBrightRadius.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	default: 20,
	// 	type: Number
	// });
	// game.settings.register(MODULE_NAME, "lanternDimRadius", {
	// 	name: game.i18n.localize(MODULE_NAME+".lanternDimRadius.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lanternDimRadius.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	default: 40,
	// 	type: Number
	// });
	// game.settings.register(MODULE_NAME, 'lanternType', {
	// 	name: game.i18n.localize(MODULE_NAME+".lanternType.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lanternType.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	type: String,
	// 	default: "Type1",
	// 	choices: {
	// 		"Type0": game.i18n.localize(MODULE_NAME+".lanternType.type0"),
	// 		"Type1": game.i18n.localize(MODULE_NAME+".lanternType.type1"),
	// 		"Type2": game.i18n.localize(MODULE_NAME+".lanternType.type2"),
	// 		"Type3": game.i18n.localize(MODULE_NAME+".lanternType.type3"),
	// 		"Type4": game.i18n.localize(MODULE_NAME+".lanternType.type4"),
	// 		"Type5": game.i18n.localize(MODULE_NAME+".lanternType.type5"),
	// 		"Type6": game.i18n.localize(MODULE_NAME+".lanternType.type6"),
	// 		"Type7": game.i18n.localize(MODULE_NAME+".lanternType.type7"),
	// 		"Type8": game.i18n.localize(MODULE_NAME+".lanternType.type8"),
	// 		"Type9": game.i18n.localize(MODULE_NAME+".lanternType.type9"),
	// 		"TypeC": game.i18n.localize(MODULE_NAME+".lanternType.typeC"),
	// 	}
	// });


	// game.settings.register(MODULE_NAME, "customLanternColor", {
	// 	name: game.i18n.localize(MODULE_NAME+".lanternType.customColor.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lanternType.customColor.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	restricted: false,
	// 	type: String,
	// 	default: "#a2642a"
	// });
	// game.settings.register(MODULE_NAME, "customLanternColorIntensity", {
	// 	name: game.i18n.localize(MODULE_NAME+".lanternType.customIntensity.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lanternType.customIntensity.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	restricted: true,
	// 	type: Number,
	// 	default: 0.5,
	// 	range: {
	// 		min: 0.0,
	// 		step: 0.05,
	// 		max: 1,
	// 	}
	// });
	// game.settings.register(MODULE_NAME, 'customLanternAnimationType', {
	// 	name: game.i18n.localize(MODULE_NAME+".lanternType.customAnimationType.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lanternType.customAnimationType.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	type: String,
	// 	default: "none",
	// 	choices: {
	// 		"none": game.i18n.localize(MODULE_NAME+".animationType.none"),
	// 		"torch": game.i18n.localize(MODULE_NAME+".animationType.torch"),
	// 		"pulse": game.i18n.localize(MODULE_NAME+".animationType.pulse"),
	// 		"chroma": game.i18n.localize(MODULE_NAME+".animationType.chroma"),
	// 		"wave": game.i18n.localize(MODULE_NAME+".animationType.wave"),
	// 		"fog": game.i18n.localize(MODULE_NAME+".animationType.fog"),
	// 		"sunburst": game.i18n.localize(MODULE_NAME+".animationType.sunburst"),
	// 		"dome": game.i18n.localize(MODULE_NAME+".animationType.dome"),
	// 		"emanation": game.i18n.localize(MODULE_NAME+".animationType.emanation"),
	// 		"hexa": game.i18n.localize(MODULE_NAME+".animationType.hexa"),
	// 		"ghost": game.i18n.localize(MODULE_NAME+".animationType.ghost"),
	// 		"energy": game.i18n.localize(MODULE_NAME+".animationType.energy"),
	// 		"roiling": game.i18n.localize(MODULE_NAME+".animationType.roiling"),
	// 		"hole": game.i18n.localize(MODULE_NAME+".animationType.hole"),
	// 	}
	// });
	// game.settings.register(MODULE_NAME, "customLanternAnimationSpeed", {
	// 	name: game.i18n.localize(MODULE_NAME+".lanternType.customAnimationSpeed.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lanternType.customAnimationSpeed.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	restricted: true,
	// 	type: Number,
	// 	default: 5,
	// 	range: {
	// 		min: 1,
	// 		step: 1,
	// 		max: 10,
	// 	}
	// });
	// game.settings.register(MODULE_NAME, "customLanternAnimationIntensity", {
	// 	name: game.i18n.localize(MODULE_NAME+".lanternType.customAnimationIntensity.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".lanternType.customAnimationIntensity.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	restricted: true,
	// 	type: Number,
	// 	default: 5,
	// 	range: {
	// 		min: 1,
	// 		step: 1,
	// 		max: 10,
	// 	}
	// });



	// if (game.system.id === 'dnd5e') {
	// 	game.settings.register(MODULE_NAME, "nameConsumableLantern", {
	// 		name: game.i18n.localize(MODULE_NAME+".nameConsumableLantern.name"),
	// 		hint: game.i18n.localize(MODULE_NAME+".nameConsumableLantern.hint"),
	// 		scope: "world",
	// 		config: true,
	// 		default: "Oil (flask)",
	// 		type: String
	// 	});
	// }

	// // Torch Parameters
	// game.settings.register(MODULE_NAME, "torchBrightRadius", {
	// 	name: game.i18n.localize(MODULE_NAME+".torchBrightRadius.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".torchBrightRadius.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	default: 20,
	// 	type: Number
	// });
	// game.settings.register(MODULE_NAME, "torchDimRadius", {
	// 	name: game.i18n.localize(MODULE_NAME+".torchDimRadius.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".torchDimRadius.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	default: 40,
	// 	type: Number
	// });
	// game.settings.register(MODULE_NAME, 'torchType', {
	// 	name: game.i18n.localize(MODULE_NAME+".torchType.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".torchType.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	type: String,
	// 	default: "Type1",
	// 	choices: {
	// 		"Type0": game.i18n.localize(MODULE_NAME+".torchType.type0"),
	// 		"Type1": game.i18n.localize(MODULE_NAME+".torchType.type1"),
	// 		"Type2": game.i18n.localize(MODULE_NAME+".torchType.type2"),
	// 		"Type3": game.i18n.localize(MODULE_NAME+".torchType.type3"),
	// 		"Type4": game.i18n.localize(MODULE_NAME+".torchType.type4"),
	// 		"Type5": game.i18n.localize(MODULE_NAME+".torchType.type5"),
	// 		"Type6": game.i18n.localize(MODULE_NAME+".torchType.type6"),
	// 		"Type7": game.i18n.localize(MODULE_NAME+".torchType.type7"),
	// 		"Type8": game.i18n.localize(MODULE_NAME+".torchType.type8"),
	// 		"Type9": game.i18n.localize(MODULE_NAME+".torchType.type9"),
	// 		"TypeC": game.i18n.localize(MODULE_NAME+".torchType.typeC"),
	// 	}
	// });


	// game.settings.register(MODULE_NAME, "customTorchColor", {
	// 	name: game.i18n.localize(MODULE_NAME+".torchType.customColor.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".torchType.customColor.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	restricted: false,
	// 	type: String,
	// 	default: "#a2642a"
	// });
	// game.settings.register(MODULE_NAME, "customTorchColorIntensity", {
	// 	name: game.i18n.localize(MODULE_NAME+".torchType.customIntensity.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".torchType.customIntensity.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	restricted: true,
	// 	type: Number,
	// 	default: 0.5,
	// 	range: {
	// 		min: 0.0,
	// 		step: 0.05,
	// 		max: 1,
	// 	}
	// });
	// game.settings.register(MODULE_NAME, 'customTorchAnimationType', {
	// 	name: game.i18n.localize(MODULE_NAME+".torchType.customAnimationType.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".torchType.customAnimationType.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	type: String,
	// 	default: "none",
	// 	choices: {
	// 		"none": game.i18n.localize(MODULE_NAME+".animationType.none"),
	// 		"torch": game.i18n.localize(MODULE_NAME+".animationType.torch"),
	// 		"pulse": game.i18n.localize(MODULE_NAME+".animationType.pulse"),
	// 		"chroma": game.i18n.localize(MODULE_NAME+".animationType.chroma"),
	// 		"wave": game.i18n.localize(MODULE_NAME+".animationType.wave"),
	// 		"fog": game.i18n.localize(MODULE_NAME+".animationType.fog"),
	// 		"sunburst": game.i18n.localize(MODULE_NAME+".animationType.sunburst"),
	// 		"dome": game.i18n.localize(MODULE_NAME+".animationType.dome"),
	// 		"emanation": game.i18n.localize(MODULE_NAME+".animationType.emanation"),
	// 		"hexa": game.i18n.localize(MODULE_NAME+".animationType.hexa"),
	// 		"ghost": game.i18n.localize(MODULE_NAME+".animationType.ghost"),
	// 		"energy": game.i18n.localize(MODULE_NAME+".animationType.energy"),
	// 		"roiling": game.i18n.localize(MODULE_NAME+".animationType.roiling"),
	// 		"hole": game.i18n.localize(MODULE_NAME+".animationType.hole"),
	// 	}
	// });
	// game.settings.register(MODULE_NAME, "customTorchAnimationSpeed", {
	// 	name: game.i18n.localize(MODULE_NAME+".torchType.customAnimationSpeed.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".torchType.customAnimationSpeed.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	restricted: true,
	// 	type: Number,
	// 	default: 5,
	// 	range: {
	// 		min: 1,
	// 		step: 1,
	// 		max: 10,
	// 	}
	// });
	// game.settings.register(MODULE_NAME, "customTorchAnimationIntensity", {
	// 	name: game.i18n.localize(MODULE_NAME+".torchType.customAnimationIntensity.name"),
	// 	hint: game.i18n.localize(MODULE_NAME+".torchType.customAnimationIntensity.hint"),
	// 	scope: "world",
	// 	config: true,
	// 	restricted: true,
	// 	type: Number,
	// 	default: 5,
	// 	range: {
	// 		min: 1,
	// 		step: 1,
	// 		max: 10,
	// 	}
	// });


	// if (game.system.id === 'dnd5e') {
	// 	game.settings.register(MODULE_NAME, "nameConsumableTorch", {
	// 		name: game.i18n.localize(MODULE_NAME+".nameConsumableTorch.name"),
	// 		hint: game.i18n.localize(MODULE_NAME+".nameConsumableTorch.hint"),
	// 		scope: "world",
	// 		config: true,
	// 		default: "Torch",
	// 		type: String
	// 	});
	// }
}
