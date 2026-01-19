
Hooks.once("init", () => {
    enrichers.registerCustomEnrichers();

    const effects = {
        slowed: {
            label: "Slowed",
            icon: "modules\a-knights-dream\Icon\Actor - Status Conditoins\Slowed.webp",
            reference: "Compendium.dnd5e.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.aNXVztwFYrHinfGs{Slowed}"
        }
    };

    for (const [k, v] of Object.entries(effects)) {
        CONFIG.statusEffects.push({
            _id: dnd5e.utils.staticID(k),
            id: k,
            name: v.label,
            icon: v.icon,
            reference: v.reference
        });
        CONFIG.DND5E.conditionTypes[k] = v;
    }
    // Rules
    CONFIG.DND5E.rules.v = "Compendium.world.organized-jes.JournalEntry.5bdM7VV8ehuP60I4.JournalEntryPage.0yIKw7lOsC81CbnS";
    CONFIG.DND5E.rules.vl = "Compendium.world.organized-jes.JournalEntry.5bdM7VV8ehuP60I4.JournalEntryPage.0In4JNglWXfCqDf0";
    CONFIG.DND5E.rules.vq = "Compendium.world.organized-jes.JournalEntry.5bdM7VV8ehuP60I4.JournalEntryPage.OV5uiIA1U9TV0bFb", " [[/r 2d6X5]]<sup>ft<sup>";
});
