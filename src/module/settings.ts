

export const MODULE_NAME = 'foundryvtt-dnd5e-wildshape';

export const COMPENDIUM_WILDSHAPE_SRD_FEATURES = 'Class Features';
export const COMPENDIUM_PACK_MACRO = MODULE_NAME + ".Dnd5e Wildshape Pack Macro";


// Name of the folder in which the beasts are located
export let beastsFolder = "Beasts";

// Name of your WildShape Effect
export let wildShapeEffectName = "WildShape Effect";

// Name of the fetaure on the SRD compendium
export let wildShapeFeatureName = "";

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

	game.settings.register(MODULE_NAME, "playerActivation", {
		name: game.i18n.localize(MODULE_NAME+".playerActivation.name"),
		hint: game.i18n.localize(MODULE_NAME+".playerActivation.hint"),
		scope: "world",
		config: true,
		default: true,
		type: Boolean
	});

	// if (game.system.id === 'dnd5e') {
	// 	game.settings.register(MODULE_NAME, "checkAvailability", {
	// 		name: game.i18n.localize(MODULE_NAME+".checkAvailability.name"),
	// 		hint: game.i18n.localize(MODULE_NAME+".checkAvailability.hint"),
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

  game.settings.register(MODULE_NAME, "forceUseMacro", {
		name: game.i18n.localize(MODULE_NAME+".forceUseMacro.name"),
		hint: game.i18n.localize(MODULE_NAME+".forceUseMacro.hint"),
		scope: "world",
		config: true,
		default: false,
		type: Boolean
	});
}
