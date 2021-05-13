
import { error, i18n, warn } from '../foundryvtt-dnd5e-wildshape';
import { COMPENDIUM_PACK_MACRO, MODULE_NAME } from './settings';
import { WildShapeHUD } from './WildShapeHUD';


export let readyHooks = async () => {

  // setup all the hooks

  Hooks.on('renderTokenHUD', (app, html, data) => {
    WildShapeHUD.addWildShapeHUDButtons(app, html, data)
  });

	Hooks.on('renderControlsReference', (app, html, data) => {
		html.find('div').first().append('<h3>WildShapeHUD</h3><ol class="hotkey-list"><li><h4>'+
			i18n(MODULE_NAME+".turnOffAllLights")+
			'</h4><div class="keys">'+
			i18n(MODULE_NAME+".holdCtrlOnClick")+
			'</div></li></ol>');
	});

	game.socket.on("module."+MODULE_NAME, request => {
		WildShapeHUD.handleSocketRequest(request);
	});

  // ===============================================================
  // AUTOMATIC IMPORT OF THE COMPENDIUM MACRO PACK
  // ===============================================================

  // const pack = game.packs.find(p => p.collection === COMPENDIUM_PACK_MACRO);
  // if(!pack){
  //   error("Cannot find the compendium '" + COMPENDIUM_PACK_MACRO + "'");
  // }else{
  //   const contents = await pack.getContent();
  //   const createData = contents.map(async (i:any) => {
  //     let item = i.data;
  //     await Macro.create(item);
  //   });
  // }

  // Register custom sheets (if any)

}

export let setupHooks = () => {

}



export let initHooks = () => {
  warn("Init Hooks processing");



}
