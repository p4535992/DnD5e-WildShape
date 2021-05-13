![Foundry Badge](https://img.shields.io/badge/Foundry-0.7.9-informational)

# DnD5e-WildShape

<!--- Downloads @ Latest Badge -->
<!--- replace <user>/<repo> with your username/repository -->
<!--- [Latest Release Download Count](https://img.shields.io/github/downloads/MisterHims/DnD5e-WildShape/latest/module.zip) -->

<!--- Forge Bazaar Install % Badge -->
<!--- replace <your-module-name> with the `name` in your manifest -->
<!--- [Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2F<DnD5e-WildShape>&colorB=4aa94a) -->

<!--- C'est le lien du manifest, si besoin par la suite -->
<!--- https://github.com/MisterHims/DnD5e-WildShape/releases/download/0.1.4-alpha/module.json -->

* **Author**: MisterHims
* **Special thanks to**: tposney, Ikabodo, Archer, Crymic, Kandashi and many others :)
* **Version**: 0.1.3 Alpha
* **Foundry VTT Compatibility**: 0.7.9
* **System Compatibility**: DnD5e
* **Module(s) Requirement(s)**: [The Furnace](https://github.com/kakaroto/fvtt-module-furnace), [DAE](https://gitlab.com/tposney/dae), [Token Magic FX](https://github.com/Feu-Secret/Tokenmagic), [Midi-QOL](https://gitlab.com/tposney/midi-qol)
* **Macro(s) Requirement(s)**: [WildShape Effect Macro](https://github.com/MisterHims/DnD5e-WildShape/blob/main/macros/WildShape%20Effect%20Macro.js)
* **Langage(s)**: *[EN] (current)*

## Known issue/Limitation

## Installation

It's always easiest to install modules from the in game add-on browser.

To install this module manually:
1.  Inside the Foundry "Configuration and Setup" screen, click "Add-on Modules"
2.  Click "Install Module"
3.  In the "Manifest URL" field, paste the following url:
`https://raw.githubusercontent.com/MisterHims/DnD5e-WildShape/master/src/module.json`
4.  Click 'Install' and wait for installation to complete
5.  Don't forget to enable the module in game using the "Manage Module" button

## Features 

This repository has recently been replaced to succeed the DnD5e-WildShape macro. For now, the module version of this macro is still under construction, I invite you to go to the following page to access the macro:

**[DnD5e-WildShape-Macro](https://github.com/MisterHims/DnD5e-WildShape-Macro)**

Thank you!

## Description

WildShape is a macro allowing to polymorph his token with the animations available from Token Magic FX. The actor's capabilities will thus be replaced by those of the desired shape and he will then see his token replaced.

The various DAE effects and Token Magic FX animations already present on your character will be preserved.

If the WildShape effect is removed, the new shape back to the original shape.

![WildShape-Demonstration-0.1.4-alpha](https://github.com/MisterHims/DnD5e-WildShape-Macro/blob/0.1.4-alpha/images/dem-0-1-4-alpha.gif)

## Informations

* By default, you will transfer the following capabilities from your original form to your new form:
  * Mental abilities scores (Wisdom, Intelligence, Charisma)

  * Masteries of saving throws

  * Skills

  * Biography

  * Class features

You can yourself choose which capabilities to remove or add from the macro. More information at the bottom.

## Installation

Note:

* Foundry VTT polymorph requires players to have rights to create new actors and tokens. You will need to allow them to "Create new characters" and "Create new tokens" from the Options configuration.

* You must also give the players the ownership rights to the actor of the desired shape.

1. First, you need to import into Foundry VTT the "WildShape Effect Macro", save the macro with the name of "WildShape Effect Macro". Repeat the operation with the main "WildShape Macro", you will make the necessary modifications thereafter.

    **[WildShape Effect Macro](<https://github.com/MisterHims/DnD5e-WildShape-Macro/blob/main/macros/WildShape%20Effect%20Macro.js>)**

    **[WildShape Macro](<https://github.com/MisterHims/DnD5e-WildShape-Macro/blob/main/macros/WildShape%20Macro.js>)**

2. Subsequently, you can check in the Midi-QOL configurations if the checkbox "Auto apply item effects to target" and "Add macro to call on use" has been checked.

3. Get the Wild Shape 'item' from the SRD Compendium "Class Features" and import it to your item list.

4. Access the details tab of that item and in the "Feature Attack" section, select the "Utility" or "Other" Action Type to display the "On use macro" field. Then add "WildShape Macro" without the quotes in this field.

5. Now add the Wild Shape 'item' to the original character's sheet and to the shapes you want to adopt (in the "Beasts" folder). You can also drag and drop this item onto your quick access bar.

6. Then let's take the "WildShape Macro" previously added to Foundry VTT, also accessible from the collection [WildShape Macro](<https://github.com/MisterHims/DnD5e-WildShape-Macro/blob/0.1.4-alpha/macros/WildShape.js>).

7. (Optional) Choose the name of the folder in which yours beasts are located:

    ```javascript
    // Name of the folder in which the beasts are located
    let beastsFolder = "Beasts"
    ```

    *[Line 2](https://github.com/MisterHims/DnD5e-WildShape-Macro/blob/main/macros/WildShape%20Macro.js#L2)*

8. (Optional) Choose the name of the WildShape effect when it appears on the new shape:

    ```javascript
    // Name of your WildShape Effect
    let wildShapeEffectName = "WildShape Effect"
    ```

    *[Line 5](https://github.com/MisterHims/DnD5e-WildShape-Macro/blob/main/macros/WildShape%20Macro.js#L5)*

## Tips

### Configure your Wild Shape item

You are free to configure your Wild Shape 'item' as yours needs, you can add for exemple the resource consumption for the original form (Attribute: resources.primary.values).

### Homogenize animation

For better animation quality, make the ratio size of your original token be the same as the new token form (0.5 and 0.5, 0.8 and 0.8, 1 and 1, ...). This could be automated later in a future version.

## Configuration

### Customize animation

You can choose different animations from Magic Token FX. There are 9 different types of animations (the one installed by default is number 6):

1. Simple transition

2. Dreamy

3. Twist

4. Water drop

5. TV Noise

6. Morphing

7. Take off/Put on you disguise!

8. Wind

9. Hologram

Then you need to replace the type number 6 by the animation number you want to use. Can be found in two places in the WildShape macro:

```javascript
    filterType: "polymorph",
    filterId: "polymorphToNewForm",
    type: 6,
    padding: 70,
    magnify: 1,
```

   *[Line 91 to 95](https://github.com/MisterHims/DnD5e-WildShape-Macro/blob/main/macros/WildShape%20Macro.js#L92)*

```javascript
    filterType: "polymorph",
    filterId: "polymorphToOriginalForm",
    type: 6,
    padding: 70,
    magnify: 1,
```

   *[Line 135 to 139](https://github.com/MisterHims/DnD5e-WildShape-Macro/blob/main/macros/WildShape%20Macro.js#L136)*

### Customize the size of the start and end shape

**IMPORTANT** | You are strongly advised not to make this modification if you do not have a good experience of javascript.

By default, the size of the start and end shape is automatically calculated. But if needed, you can change this size by modifying the ```width``` and ```height``` values displayed in two places on the macro.

The first is the size of the original shape:

```javascript
    target.update({
        "width": actorNewForm.data.token.width,
        "height": actorNewForm.data.token.height
```

   *[Line 128 to 129](https://github.com/MisterHims/DnD5e-WildShape-Macro/blob/main/macros/WildShape%20Macro.js#L127)*

The second is the end shape:

```javascript
    target.update({
        "width": actorOriginalForm.data.token.width,
        "height": actorOriginalForm.data.token.height
```

   *[Line 167 to 168](https://github.com/MisterHims/DnD5e-WildShape-Macro/blob/main/macros/WildShape%20Macro.js#L166)*

You will also have to repeat this operation in the new "WildShape Effect Macro" (with another name and also change on line 54).

### Customize the skills to retain during the polymorph

You can remove and / or add different abilities that will be transferred to your new form during the polymorph:

* ```keepPhysical: true``` : Keep Physical Abilities scores (Str, Dex, Con)
* ```keepMental: true``` : Keep Mental Abilities scores (Wis, Int, Cha)
* ```keepSaves: true``` : Keep Saving throw Proficiency of the Character
* ```keepSkills: true``` : Keep Skill Proficiency of the Character
* ```mergeSaves: true``` : Merge Saving throw Proficiencies (take both) this will keep proficiencies of the character intact and also grant any extra proficiencies from the dragged on actor
* ```mergeSkills: true``` : Merge Skill Proficiency (take both) this will keep proficiencies of the character intact and also grant any extra proficiencies from the dragged on actor
* ```keepClass: true``` : Keep Proficiency bonus (leaves Class items in sheet) this will leave any Class "item" of the original actor in order to keep the original level and therefore Proficiency bonus
* ```keepFeats: true``` : Keep Features
* ```keepSpells: true``` : Keep Spells
* ```keepItems: true``` : Keep Equipment
* ```keepBio: true``` : Keep Biography
* ```keepVision: true``` : Keep Vision (Character and Token) if you want to preserve the exact way a token has vision on the map, this will do that. It will also not change the characters senses in the character sheet

## Frequently Asked Questions

Q: I don't understand, I did all the steps one by one after installing the required modules and it still doesn't work, why?

A: It's necessary to have previously correctly configured these different modules for the correct functioning of the macro. It's also required to have checked the box "Auto apply item to targets" in the configuration of Midi-QOL module.

***

Q: I experience a slight lag when animating my character for the first time, why?

A: During the first animation, the image of the new token is loaded in your browser and may therefore take a little while before appearing. Unfortunately, there is nothing we can do at the moment.

***

Q: When the transfer effects takes place, the associated macro executions are launched. How to deactivate them?

A: There is currently no long term solution, although this issue is known and is being resolved. When the executed macros concern dialog box choices, simply close the window.

## Upcoming improvements

I plan to improve this macro to make it a module. This will allow a much easier installation and will also allow you to quickly create and configure different polymorphs (choice of skills to keep, the name of the macro, the name of the effect, the size of the characters, the animation type, etc.)

## [Changelog](./changelog.md)

## Issues

Any issues, bugs, or feature requests are always welcome to be reported directly to the [Issue Tracker](https://github.com/MisterHims/DnD5e-WildShape/issues ), or using the [Bug Reporter Module](https://foundryvtt.com/packages/bug-reporter/).

## Credit

Thanks to anyone who helps me with this code! I appreciate the user community's feedback on this project!

- [TorchLight](https://github.com/PhilippeKr/TorchLight) ty to PhilippeKr

## License
This Foundry VTT module is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
This work is licensed under Foundry Virtual Tabletop [EULA - Limited License Agreement for module development v 0.1.6](http://foundryvtt.com/pages/license.html).

## Acknowledgements

Bootstrapped with League of Extraordinary FoundryVTT Developers  [foundry-vtt-types](https://github.com/League-of-Foundry-Developers/foundry-vtt-types).

Mad props to the 'League of Extraordinary FoundryVTT Developers' community which helped me figure out a lot.
