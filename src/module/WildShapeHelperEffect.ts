import { error } from "../foundryvtt-dnd5e-wildshape";
import { COMPENDIUM_WILDSHAPE_SRD_FEATURES, getCanvas, wildShapeEffectName, wildShapeFeatureName } from "./settings";

export const getEffectForActor = function(actor:Actor, toggleEvent) {
  let togglableEffect = actor.effects.find((effect:ActiveEffect) => effect.data.label == toggleEvent.target.dataset.effectName);
  if (!togglableEffect) { return; }

  let effect = retrieveEffectWildShapeFromCompendium();
  // effect.data.origin = "Actor." + actor.id;
  return effect;
}

export const handleEffectToggleEvent = async function(token:Token,toggledEffect) {
    const updates = [];
    // for (let token of getCanvas().tokens.controlled ) {
        const actor = token.actor;
    //for (let actor of getCanvas().tokens.controlled.map(token => token.actor)) {
        // let toggledEffect = await getEffectForActor(actor, toggleEvent).then(effect => {return effect;});
        // if (!toggledEffect) { 
            
        // }
        // if(toggledEffect.effects){
        //     toggledEffect = toggledEffect.effects.find(effect => effect.label == toggledEffect.label);
        // }
        let effectToRemove = actor.data.effects.find(effect => effect.label == toggledEffect.label);
        if(effectToRemove){
            actor.deleteEmbeddedEntity("ActiveEffect", effectToRemove._id);
        }else{
            actor.createEmbeddedEntity("ActiveEffect", toggledEffect);
        }
    // }
    if(updates.length>0){
        // use canvase.tokens.updateMany instead of token.update to prevent race conditions
        // (meaning not all updates will be persisted and might only show locally)
        getCanvas().tokens.updateMany(updates);
    }

}

export const retrieveEffectWildShapeFromCompendium = async function() {
  // return {
  //     name: "Barkskin",
  //     label: "Toggled Effect: Barkskin",
  //     icon: "modules/ThandulsTogglableEffects/media/effects/barkskin.jpg",
  //     duration: getDurationData(60),
  //     changes: [
  //         {key: "data.attributes.ac.value", mode: 4, value: 16, priority: 60},
  //       ],
  // };
  let effect = await retrieveEffectFromCompendium(COMPENDIUM_WILDSHAPE_SRD_FEATURES,wildShapeFeatureName)
  .then(effect => {
      return effect;
  });
  return effect;
}

/**
 * Manage a more dynamic patter
 * @param {*} compendiumPackName
 * @param {*} effectName
 */
 export const retrieveEffectFromCompendium = async function(compendiumPackName,effectName){
  //const compendiumPackName = 'pf2e.feature-effects';
  //const effectName = 'Effect: Rage';
  const pack = game.packs.get(compendiumPackName);
  if(pack){
      try{
          await pack.getIndex();
          // .catch(error => {
          //     console.error(error)
          // });
      }catch(e){
          console.error(e);
      }

      //const effectId = pack.index.find(e => e.name === effectName)._id;
      const packItem = pack.index.find(e => e.name === effectName);
      if(packItem){
          const packItemId = packItem._id;
          const packItemImg = packItem.img;
          //let packItemEntry = await pack.getEntry(packItemId);
          let effect = await pack.getEntry(packItemId).then(effect => {
              if(!effect.name){
                  effect.name = effectName;
              }
              if(!effect.label){
                  effect.label = effectName;
              }
              if(!effect.icon){
                  effect.icon = packItemImg;
              }
              return effect;
          });
          //const actor = game.user.character;
          //await pack.getEntry(effectId).then(effect => actor.createOwnedItem(effect) );
          //return packItemEntry.effects[0];
          return effect;
      }else{
          error("Can't find effect '"+effectName+"' on compendium '"+compendiumPackName+"");
          //DEFAULT VALUE
          return  {
                  name: effectName,
                  label: effectName,
                  icon: "",
                  duration: getDurationData(1),
                  changes: [],
              };
      }
  }else{
      error("Can't find compendium with name '"+compendiumPackName+"'");
      //DEFAULT VALUE
      return  {
          name: effectName,
          label: effectName,
          icon: "",
          duration: getDurationData(1),
          changes: [],
      };
  }
}

/**
 * type the name of the effect in "EFFECT NAME"
 * @href https://www.reddit.com/r/FoundryVTT/comments/jwev5i/dynamic_active_effects_macro_to_toggle_effect/
*/
export const toogleDAEEffect = async function(token,effect_name) {
  //const effect_name = "EFFECT NAME";
  const effect = token.actor.effects.entries;
  for (let i = 0; i < effect.length; i++){
      let condition = effect[i].data.label;
      let status = effect[i].data.disabled;
      let effect_id = effect[i].data._id;
      if ((condition === effect_name) && (status === false)) {
          await token.actor.updateEmbeddedEntity("ActiveEffect", {"_id": effect_id, "disabled" : true});
      }
      if ((condition === effect_name) && (status === true)){
          await token.actor.updateEmbeddedEntity("ActiveEffect", {"_id": effect_id, "disabled" : false});
      }
  }
}

/**
 *
 * @param minutes
 * @param turns
 * @returns
 */
 export const getDurationData = function (minutes, turns=0) {
  return game.combat
  ? {
      startRound: game.combat.round,
      rounds: turns > 0 ? 0 : 10 * minutes,
      turns: turns
  }
  : {
      startTime: game.time.worldTime,
      seconds: 60 * minutes
  }
}

/**
* A escamotage for set a active effect like a temporary
* @returns
*/
export const getDurationDataForEffect = function(){
  // let duration = {
  //     rounds: 100,
  //     seconds: 600,
  //     startRound: null,
  //     startTime: null,
  //     startTurn: null,
  //     turns: null
  // };
  // return duration;
  return getDurationData(60,0);
}

export const ACTIVE_EFFECT_MODES = {
  CUSTOM: 0,
  MULTIPLY: 1,
  ADD: 2,
  DOWNGRADE: 3,
  UPGRADE: 4,
  OVERRIDE: 5
};

