

/**  ↧ Putting [html] in square bracket makes it a "destructuring assignment"
 preventing you from having to write html[0] */
Hooks.on("renderItemSheet", (app, [html]) => {
  const item = app.object;
  /** ↧ sub set of item sheet weapon select
  if weapon = continue, else return = dead end without error! :0 + :) ... (MEMORIZE THIS) */
  if (item.type !== "weapon") return;
  const valid = CONFIG.DND5E.validProperties.weapon;
  const properties = item.system.properties;
  const materials = new Set([
    /**metal*/"ada", "baatorium", "bronze", "cinnabryl", "copper",
    "darkSteel", "etherium", "gold", "iron", "orichalcum", "quickSilver", "sil",
    "stailinn", "steel", "thinaun", "tin",
    /**wood */ "ash", "birch", "bludbud",
    "bluleaf", "broon", "elder", "hazel", "holly", "ivren", "juniper", "oak",
    "pine", "willow", "yew",
    /**stone */ "aethel", "ceramic", "coldIron",
    "corundum", "crystal", "elysian", "malachite", "moonStone", "trueIce",
    /**glass*/
    'amber', "beskar", "byeshk", "dimeriti", "ebony", "glassteel", "plutite", "Shimmerring", "stygian",/**leather*/ "abyssusSkin", "dar'ether", "feyken", "heavyFur", "shortFur",
    "olyther", "peltHard", "peltRigid", "peltSoft", "pigskin",
    /**bone*/ "osso",
    "boneMold", "chitin", "ivory", "ohmu", "scale",
    /**cloth*/ "hemp", "linen", "silk", "wool"]);
  //const woodMaterials = new Set["ash", "birch", "bludbud", "bluleaf", "broon", "elder", "hazel", "holly", "ivren", "juniper", "oak", "pine", "willow", "yew"]
  //const stoneMaterials = new Set["aethel", "ceramic", "coldIron", "corundum", "crystal", "elysian", "malachite", "moonStone", "trueIce"]
  //const glassMaterials = new Set["amber", "byeshk", "Dimeriti", "Ebony", "Plutite", "Pursuit", "Shimmer_Ring", "Stygian"]
  //const leatherMaterials = new Set["abyssusSkin", "dar'ether", "feyken", "heavyFur", "shortFur", "olyther", "peltHard", "peltRigid", "peltSoft", "pigskin"]
  //const boneMaterials = new Set["osso", "boneMold", "chitin", "ivory", "ohmu", "scale"]
  //const clothMaterials = new Set["hemp", "linen", "silk", "wool"]
  //NEW CODE
  const choices = valid.intersection(materials).map(p => `<option value="${p}" ${item.flags?.moduleid?.material === p ? 'selected' : ''}>${game.i18n.localize(CONFIG.DND5E.itemProperties[p].label)}</option>`).join('')

  const material = `<div class="form-group">
    <label>Material Composition</label>
    <select name="flags.moduleid.material">
        ${!(item.flags?.moduleid?.material) ? '<option selected></option>' ? ''}
        ${choices}
    </select>
    </div>`
  html.querySelector('.form-group.stacked.weapon-properties').insertAdjacentHTML("beforebegin", material)
  /** OLD CODEconst current = materials.intersection(properties);
  materials.forEach(property => {
      if (html.querySelector(`.checkbox:has([name="system.properties.${property}"])`)) html.querySelector(`.checkbox:has([name="system.properties.${property}"])`).remove();
  });
  const c = properties.intersection(materials);
  const choices = valid.intersection(materials).reduce((acc, p) => {
      return acc + `<option value="system.properties.${p}"}>${game.i18n.localize(CONFIG.DND5E.itemProperties[p].label)}</option>`
  }, "");
  let material;
  /**  ugly little hack BELOW -  onChange="this.name = this.value
  basically makes the selected value in the dropdown useable  / "call-able?"" */
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
  html.querySelector('.form-group.stacked.weapon-properties').insertAdjacentHTML("beforebegin", material);
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
