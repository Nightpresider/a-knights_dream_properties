Hooks.on("renderItemSheet", (app, [html]) => {
    const item = app.object;

    const eProp = {
        snaps: "Snaps",
        agile: "Agile",
        concealed: "Concealed",
        pocketed: "Pocketed",
        quickRelease: "Quick Release",
        weighted: "Weighted"

    };

    for (const [k, v] of Object.entries(eProp)) {
        CONFIG.DND5E.validProperties.equipment.add(k);
        CONFIG.DND5E.itemProperties[k] = { label: v };
    }

    if (item.type !== "equipment") return;
    const valid = CONFIG.DND5E.validProperties.weapon;
    const properties = item.system.properties;
    const materials = new Set([
      /**leather*/"deather", "orichalcum",
        /**metal*/"ada", "baatorium", "bronze", "cinnabryl", "copper",
        "darkSteel", "etherium", "gold", "iron", "quickSilver", "sil",
        "stailinn", "steel", "thinaun", "tin", "lead",
      /**wood */ "ash", "birch", "bludbud",
        "bluleaf", "broon", "elder", "hazel", "holly", "ivren", "juniper", "oak",
        "pine", "willow", "yew",
      /**stone */ "aethel", "ceramic", "coldIron",
        "corundum", "crystal", "elysian", "malachite", "moonStone", "trueIce",
        /**glass*/
        'amber', "beskar", "byeshk", "dimeriti", "ebony", "glassteel", "plutite", "Shimmerring", "stygian",/**leather*/ "abyssusSkin", "dar'ether", "feyken", "heavyFur", "shortFur",
        "olyther", "peltHard", "peltRigid", "peltSoft", "pigskin",
        /**bone*/
        "osso", "boneMold", "chitin", "ivory", "ohmu", "scale",
      /**cloth*/ "hemp", "linen", "silk", "wool"]);

    const current = materials.intersection(properties);
    materials.forEach(property => {
        if (html.querySelector(`.checkbox:has([name="system.properties.${property}"])`))
            html.querySelector(`.checkbox:has([name="system.properties.${property}"])`).remove();
    });
    const c = properties.intersection(materials);
    const choices = valid.intersection(materials).reduce((acc, p) => {
        return acc + `<option value="system.properties.${p}"}>${game.i18n.localize(
            CONFIG.DND5E.itemProperties[p].label)}</option>`
    }, "");
    /**  ugly little hack BELOW -  onChange="this.name = this.value
    basically makes the selected value in the dropdown useable  / "call-able?"" */
    let material;
    if (!current.size) {
        material = `
        <div class="form-group">
          <label>Material Composition</label>
          <select name="" onChange="this.name = this.value;">
            <option></option>
            ${choices}
          </select>
        </div>
        `
    } else {
        const p = current.values().next().value;
        material = `
        <div class="form-group">
          <label>Material Composition</label>
          <button name="clear-material">Reset Material</button>
          <select name="">
            <option value="${p}" selected disabled>${game.i18n.localize(CONFIG.DND5E.itemProperties[p].label)}</option>
          </select>
        </div>
      `
    };
    html.querySelector('.form-group.stacked.equipment-properties').insertAdjacentHTML("beforebegin", material);
    const button = html.querySelector('button[name="clear-material"]');
    if (button) {
        button.addEventListener('click', () => {
            materials.forEach(property => {
                if (properties.has(property)) properties.delete(property);
            });
        });
    };
});
/**The way Foundry's data architecture works
//the Foundry system gets to define the system property on '?something?'
//e.g. system.quantity
//or system.attributes.str.value
//Modules work underneath flags
//and within flags, you're supposed to namespace stuff by package ID */
//"ada", "baa", "bro", "bye", "cin", "cop", "Dar", "eth", "gol", "iro", "ori", "qui", "sta", "ste", "thi", "tin"
// Climate, Color, Condition, craftLevel, 

/**Hooks.on('renderItemSheet5e', (app, html, data) => {
  const { item } = data
  if (!["loot", "equipment", "weapon"].includes(item.type)) return;
  const choices = { Craft_Matterial, Craft_Source, Cursed, Blessed, } // prep the info here 
  // im guessing these are what the dropdown boxes are labeled as AKA 4 drop down boxes
  const optionString = HandlebarsHelpers.selectOptions(Craft_Matterial, Craft_Source, Cursed, Blessed)
  { hash: { selected: item.getFlag("moduleid", "craftOptions") } }
  const htmlString = `<select name="flags.moduleid.craftOptions>${optionString}</select>`
  // use jquery to add it to the right spot in the `html`
  // - this means location on item sheet
  // I need to learn what is jquery and how too. 
})
 
 */
