import { error, log } from "../foundryvtt-dnd5e-wildshape";
import { getCanvas, MODULE_NAME, wildShapeFeatureName } from "./settings";
import { WildShapeMacro } from "./WildShapeMacro";

export class WildShapeHUD {
	static async addWildShapeHUDButtons(app, html, data) {

		// Visually and functionally enable a WildShapeHUD button
		function enableWildShapeButton(tbutton) {
			// Remove the disabled status, if any
			tbutton.find('i').removeClass('fa-disabled');

			// If a WildShapeHUD button is clicked
			tbutton.find('i').click(async (ev) => {
				//log("Clicked on a Button.");
				ev.preventDefault();
				ev.stopPropagation();

				// Are we dealing with the Light Button
				if (tbutton === tbuttonWildShape1) {
					// Check if the token has the wildshape spell on
					if (statusWildShape1) {
						// The token has the wildshap spell on
						log("Clicked on the wildshape button when the shape is on.");
						statusWildShape1 = false;
						await app.object.setFlag(MODULE_NAME, "statusWildShape", false);
						tbuttonWildShape1.removeClass("active");

					// Wildshape is inactive, enable the relevant wildshape sources according to parameters
					
					enableRelevantButtons();

					// Restore the initial wildshape source

					WildShapeMacro();

				} else {

					// The token does not have the wildshape spell on
					log("Clicked on the wildshape button when the shape is off.");
					statusWildShape1 = true;
					await app.object.setFlag(MODULE_NAME, "statusWildShape", true);
					tbuttonWildShape1.addClass("active");

					// Wildshape is active, disable the other wildshape sources
					WildShapeMacro();

				}
				}else{
					error("tbutton is not equal to any wildshape");
					// There is no torch wildshape to consume, signal and disable the button
					// ChatMessage.create({
					//     user: game.user._id,
					//     speaker: game.actors.get(data.actorId),
					//     content: "No WildShape to consume !"
					// });
					disableWildShapeButton(tbuttonWildShape1);
				}
			});
		}

		// Visually and functionally disable a wildshape button
		function disableWildShapeButton(tbutton) {
			tbutton.find('i').addClass('fa-disabled');
			tbutton.find('i').off( "click" );
			tbutton.removeClass("active");
		}

		// Enable or disable buttons according to parameters
		function enableRelevantButtons() {

			// Stores if checks need to be made to enable buttons
			//enableWildShapeButton(tbuttonWildShape1);

			// Only GM can metamorph (for now)
			if(game.user.isGM){
				enableWildShapeButton(tbuttonWildShape1);
			}else{
				disableWildShapeButton(tbuttonWildShape1);
			}

			// seem not to work disable for now
			// if (hasItemInInventory(wildShapeFeatureName)){
			// 	enableWildShapeButton(tbuttonWildShape1);
			// }else{
			// 	disableWildShapeButton(tbuttonWildShape1);
			// }

            /*
			let noCheck = game.system.id !== 'dnd5e';
			if (!noCheck){
				noCheck = (data.isGM && !game.settings.get(MODULE_NAME, "dmAsPlayer")) || !game.settings.get(MODULE_NAME, "checkAvailability");
            }
			if (noCheck || canCastLight()){
				enableWildShapeButton(tbuttonWildShape1);
            }else {
				disableWildShapeButton(tbuttonWildShape1);
            }
			if (noCheck || (hasItemInInventory("Oil (flask)") && (hasItemInInventory("Lantern, Hooded") || hasItemInInventory("Lantern, Bullseye")))){
				enableWildShapeButton(tbuttonWildShape2);
            }else{
				disableWildShapeButton(tbuttonWildShape2);
            }
			if (noCheck || hasItemInInventory("Torch")){
				enableWildShapeButton(tbuttonWildShape3);
            }else{
				disableWildShapeButton(tbuttonWildShape3);
            }
            */
		}

		// Define all three buttons
		let tbuttonWildShape1   = $(`<div class="control-icon foundryvtt-dnd5e-wildshape" title="Toggle WildShape Spell 1"><i class="fas fa-paw"></i></div>`);
		// let tbuttonWildShape2 = $(`<div class="control-icon foundryvtt-dnd5e-wildshape" title="Toggle WildShape Spell 2"><i class="fas fa-lightbulb"></i></div>`);
		// let tbuttonWildShape3   = $(`<div class="control-icon foundryvtt-dnd5e-wildshape" title="Toggle WildShape Spell 3"><i class="fas fa-fire"></i></div>`);

		// Get the position of the column
		let position = game.settings.get(MODULE_NAME, 'position');

		// Create the column
		let buttonsdiv =  $(`<div class="col foundryvtt-dnd5e-wildshape-column-${position}"></div>`);

/*
		// Wrap the previous icons
		let newdiv = '<div class="foundryvtt-dnd5e-wildshape-container"></div>';
		html.find('.col.left').wrap(newdiv);

		// Add the column
		html.find('.col.left').before(buttonsdiv);
*/

		// Wrap the previous icons
		let newdiv = '<div class="foundryvtt-dnd5e-wildshape-container"></div>';
		html.find('.col.left').before(newdiv);

		// Add the column
		html.find('.foundryvtt-dnd5e-wildshape-container').prepend(buttonsdiv);


		log("Initialisation");

		// Get the status of the three types of lights
		let statusWildShape1 = app.object.getFlag(MODULE_NAME, "statusWildShape1");
		//log("Initial statusWildShape1:" + statusWildShape1);
		if (statusWildShape1 == undefined || statusWildShape1 == null) {
			statusWildShape1 = false;
			await app.object.setFlag(MODULE_NAME, "statusWildShape1", false);
		}
		// let statusWildShape2 = app.object.getFlag(MODULE_NAME, "statusWildShape2");
		// //log("Initial statusWildShape2:" + statusWildShape2);
		// if (statusWildShape2 == undefined || statusWildShape2 == null) {
		// 	statusWildShape2 = false;
		// 	await app.object.setFlag(MODULE_NAME, "statusWildShape2", false);
		// }
		// let statusWildShape3 = app.object.getFlag(MODULE_NAME, "statusWildShape3");
		// //log("Initial statusWildShape3:" + statusWildShape3);
		// if (statusWildShape3 == undefined || statusWildShape3 == null) {
		// 	statusWildShape3 = false;
		// 	await app.object.setFlag(MODULE_NAME, "statusWildShape3", false);
		// }
		//log("Initialised statusWildShape1:" + statusWildShape1);
		//log("Initialised statusWildShape2:" + statusWildShape2);
		//log("Initialised statusWildShape3:" + statusWildShape3);

		// Initial button state when the HUD comes up
		if (statusWildShape1) tbuttonWildShape1.addClass("active");
		// if (statusWildShape2) tbuttonWildShape2.addClass("active");

		// Check the permissions to manage the lights
		if (data.isGM === true || game.settings.get(MODULE_NAME, "playerActivation") === true) {

			// If the a specific light is on, enable only that light otherwise enable all three of them
			if (statusWildShape1) {
				enableWildShapeButton(tbuttonWildShape1);
				// disableWildShapeButton(tbuttonWildShape2);
				// disableWildShapeButton(tbuttonWildShape3);
				tbuttonWildShape1.addClass("active");
			// } else if (statusWildShape2) {
			// 	disableWildShapeButton(tbuttonWildShape1);
			// 	enableWildShapeButton(tbuttonWildShape2);
			// 	disableWildShapeButton(tbuttonWildShape3);
			// 	tbuttonWildShape2.addClass("active");
			// } else if (statusWildShape3) {
			// 	disableWildShapeButton(tbuttonWildShape1);
			// 	disableWildShapeButton(tbuttonWildShape2);
			// 	enableWildShapeButton(tbuttonWildShape3);
			// 	tbuttonWildShape3.addClass("active");
			} else {
				enableRelevantButtons();
            }
		} else {
			// If no permission exists, disable all the buttons
			tbuttonWildShape1.find('i').addClass('fa-disabled');
			//tbuttonWildShape2.find('i').addClass('fa-disabled');
			//tbuttonWildShape3.find('i').addClass('fa-disabled');
			disableWildShapeButton(tbuttonWildShape1);
			// disableWildShapeButton(tbuttonWildShape2);
			// disableWildShapeButton(tbuttonWildShape3);
		}


		// // Returns true if the character can use the Light spell
		// // This also returns true if the game system is not D&D 5e...
		// function canCastLight() {
		// 	let actor = game.actors.get(data.actorId);
		// 	if (actor === undefined)
		// 		return false;
		// 	let hasLight = false;
		// 	actor.data.items.forEach(item => {
		// 		if (item.type === 'spell') {
		// 			if (item.name === 'Light')
		// 				hasLight = true;
		// 		}
		// 	});
		// 	return hasLight;
		// }

		// Returns true if the character has a specific item in his inventory
		// This also returns true if the game system is not D&D 5e...
		function hasItemInInventory(itemToCheck:string) {
			let actor = game.actors.get(data.actorId);
			if (actor === undefined){
				return false;
      }
			let hasItem = false;
			actor.data.items.forEach(item => {
				if (item.name.toLowerCase() === itemToCheck.toLowerCase()) {
					if (item.data.quantity > 0)
						hasItem = true;
				}
			});
			return hasItem;
		}

		// // Returns true if either the character does not need to consume an item
		// // or if he can indeed consume it (and it is actually consumed)
		// function consumeItem(itemToCheck) {
		// 	let consume = game.system.id !== 'dnd5e';
		// 	if (!consume)
		// 		consume = (data.isGM && !game.settings.get(MODULE_NAME, "dmAsPlayer")) ||
		// 						!game.settings.get(MODULE_NAME, "checkAvailability") ||
		// 						!game.settings.get(MODULE_NAME, "consumeItem");
		// 	if (!consume) {
		// 		let actor = game.actors.get(data.actorId);
		// 		if (actor === undefined)
		// 			return false;
		// 		let hasItem = false;
		// 		actor.data.items.forEach((item, offset) => {
		// 			if (item.name.toLowerCase() === itemToCheck.toLowerCase()) {
		// 				if (item.data.quantity > 0) {
		// 					hasItem = true;
		// 					actor.updateOwnedItem({"_id": actor.data.items[offset]._id, "data.quantity": actor.data.items[offset].data.quantity - 1});
		// 				}
		// 			}
		// 		});
		// 		consume = hasItem
		// 	}
		// 	return consume;
		// }

		// /*
		//  * Returns the first GM id.
		//  */
		// function firstGM() {
		// 	let i;

		// 	for (i=0; i<game.users.entities.length; i++) {
		// 		if (game.users.entities[i].data.role >= 4 && game.users.entities[i].active)
		// 			return game.users.entities[i].data._id;
		// 	}
		// 	ui.notifications.error("No GM available for Dancing Lights!");
		// }

		// async function sendRequest(req) {
		// 	req.sceneId = getCanvas().scene._id
		// 	req.tokenId = app.object.id;

		// 	if (!data.isGM) {
		// 		req.addressTo = firstGM();
		// 		game.socket.emit("module."+MODULE_NAME, req);
		// 	}
		// 	else {
		// 		WildShapeHUD.handleSocketRequest(req);
		// 	}
		// }

		// Finally insert the buttons in the column
		// html.find('.col.foundryvtt-dnd5e-wildshape-column-'+position).prepend(tbuttonWildShape3);
		// html.find('.col.foundryvtt-dnd5e-wildshape-column-'+position).prepend(tbuttonWildShape2);
		html.find('.col.foundryvtt-dnd5e-wildshape-column-'+position).prepend(tbuttonWildShape1);
	}

	static async handleSocketRequest(req) {
		if (req.addressTo === undefined || req.addressTo === game.user._id) {
			let scn = game.scenes.get(req.sceneId);
			let tkn = scn.data.tokens.find(({_id}) => _id === req.tokenId);
			// let dltoks=[];

			// switch(req.requestType) {
			// 	case 'removeDancingLights':
			// 		scn.data.tokens.forEach(tok => {
			// 			if (tok.actorId === tkn.actorId &&
			// 			    tok.name === 'Dancing Light' &&
			// 			    tok.dimLight === 20 &&
			// 			    tok.brightLight === 10) {
			// 				//let dltok = getCanvas().tokens.get(tok._id);
			// 				dltoks.push(scn.getEmbeddedEntity("Token", tok._id)._id);
			// 			}
			// 		});
			// 		await scn.deleteEmbeddedEntity("Token", dltoks);
			// 		break;
			// }
		}
	}
}
