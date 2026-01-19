
Hooks.on("renderItemSheet", (app, [html]) => {
    const item = app.object;
    if (item.type !== "weapon") return;
    const valid = CONFIG.DND5E.validProperties.weapon;
    const properties = item.system.properties;
    const metalMaterials = new Set(["ada", "baatorium", "bronze", "byeshk", "cinnabryl", "copper", "darkSteel", "etherium", "gold", "iron", "orichalcum", "quickSilver", "sil", "stailinn", "steel", "thinaun", "tin"]);
    const woodMaterials = new Set(["pine", "willow"]);
    const currentMetal = metalMaterials.intersection(properties);
    const currentWood = woodMaterials.intersection(properties);
    metalMaterials.forEach(property => {
        if (html.querySelector(`.checkbox:has([name="system.properties.${property}"])`)) html.querySelector(`.checkbox:has([name="system.properties.${property}"])`).remove();
    });
    woodMaterials.forEach(property => {
        if (html.querySelector(`.checkbox:has([name="system.properties.${property}"])`)) html.querySelector(`.checkbox:has([name="system.properties.${property}"])`).remove();
    });
    const cMetal = properties.intersection(metalMaterials);
    const cWood = properties.intersection(woodMaterials);
    const choicesMetal = valid.intersection(metalMaterials).reduce((acc, p) => {
        return acc + `<option value="system.properties.${p}"}>${game.i18n.localize(CONFIG.DND5E.itemProperties[p].label)}</option>`
    }, "");
    const choicesWood = valid.intersection(woodMaterials).reduce((acc, p) => {
        return acc + `< option value = "system.properties.${p}"}> ${game.i18n.localize(CONFIG.DND5E.itemProperties[p].label)}</option > `
    }, "");
    let materialMetal;
    let materialWood;
    if (!currentMetal.size) {
        materialMetal = `
  < div class="form-group" >
         <label>Metal Composition</label>
         <select name="" onChange="this.name = this.value;">
           <option></option>
           ${choicesMetal}
         </select>
       </div >
  `
    } else {
        const p = currentMetal.values().next().value;
        materialMetal = `
  < div class="form-group" >
         <label>Metal Composition</label>
         <button name="clear-metal">Metal CM Reset</button>
         <select name="">
           <option value="${p}" selected disabled>${game.i18n.localize(CONFIG.DND5E.itemProperties[p].label)}</option>
         </select>
       </div >
  `
    };
    if (!currentWood.size) {
        materialWood = `
  < div class="form-group" >
         <label>Wood Composition</label>
         <select name="" onChange="this.name = this.value;">
           <option></option>
           ${choicesWood}
         </select>
       </div >
  `
    } else {
        const p = currentWood.values().next().value;
        materialWood = `
  < div class="form-group" >
         <label>Wood Composition</label>
         <button name="clear-wood">Wood CM Reset</button>
         <select name="">
           <option value="${p}" selected disabled>${game.i18n.localize(CONFIG.DND5E.itemProperties[p].label)}</option>
         </select>
       </div >
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