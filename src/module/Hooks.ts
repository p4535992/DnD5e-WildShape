
import { i18n, warn } from '../foundryvtt-dnd5e-wildshape';
import { MODULE_NAME } from './settings';
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

  // Register custom sheets (if any)

}

export let setupHooks = () => {
 
}



export let initHooks = () => {
  warn("Init Hooks processing");
  
  

}
