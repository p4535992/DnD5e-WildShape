import { getCanvas } from "./settings"


export const WildShapeEffectMacro = function(
    target:Token,
    shapeOnOff:string, 
    actorOriginalFormId:string, 
    actorOriginalFormImagePath:string, 
    actorNewFormId:string,
    actorNewShapeName:string):ActiveEffect.Data{

    //let target = getCanvas().tokens.controlled[0]
    //let actorOriginalFormId = args[1]
    let actorOriginalForm = game.actors.get(actorOriginalFormId)
    let actorOriginalFormName = actorOriginalForm.data.name
    //let actorOriginalFormImagePath = args[2]
    //let actorNewForm = game.actors.get(args[3])
    let actorNewForm = game.actors.get(actorNewFormId);
    //let actorNewShapeName = args[4]
    let actor = game.actors.get(actorOriginalFormId);
    // TODO WE NEED THIS ????
    // let transferDAEEffects = async function (actor) {
    //     //@ts-ignore
    //     if (actor.data.flags.dnd5e?.isPolymorphed) {
    //         let actorNewShape:DeepPartial<Data> = game.actors.getName(actorNewShapeName);
    //         let actorNewShapeEffectsData = actorNewShape.effects.map(ef => ef.data);
    //         await actorOriginalForm.createEmbeddedEntity("ActiveEffect", actorNewShapeEffectsData);
    //     }
    // }
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    //@ts-ignore
    if (actor.data.flags.dnd5e?.isPolymorphed && shapeOnOff === "off") {
        actorOriginalFormImagePath = actorOriginalForm.data.token.img
        let paramsBack =
            [{
                filterType: "polymorph",
                filterId: "polymorphToOriginalForm",
                type: 6,
                padding: 70,
                magnify: 1,
                imagePath: actorOriginalFormImagePath,
                animated:
                {
                    progress:
                    {
                        active: true,
                        animType: "halfCosOscillation",
                        val1: 0,
                        val2: 100,
                        loops: 1,
                        loopDuration: 1000
                    }
                }
            }]
        target.update({
            "width": actorOriginalForm.data.token.width,
            "height": actorOriginalForm.data.token.height
        })
        async function backAnimation(token:Token) {
            await Hooks.once("sightRefresh", async function () {
                //@ts-ignore
                await token.TMFXdeleteFilters("polymorphToOriginalForm")
            });
            //@ts-ignore
            await token.TMFXhasFilterId("polymorphToOriginalForm")
            //@ts-ignore
            await token.TMFXaddUpdateFilters(paramsBack)
            await delay(1100)
            //@ts-ignore
            await actor.revertOriginalForm()
        }
        backAnimation(target);
    }
    let actorNewShape:Actor = game.actors.getName(actorNewShapeName)
    let actorNewShapeEffectsData = actorNewShape.effects.map((ef:ActiveEffect) => ef.data)
    return actorNewShapeEffectsData[0];
}