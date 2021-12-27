import { sbiUtils } from "./sbiUtils.js";
import { sbiParser } from "./sbiParser.js";
import { sbiConfig } from "./sbiConfig.js";

export class sbiWindow extends Application {

    constructor(options) {
        super(options);
    }

    static get defaultOptions() {
        const options = super.defaultOptions;
        options.id = "sbi-window";
        options.template = "modules/sw5e-npc-importer/templates/sbiWindow.html";
        options.width = 800;
        options.height = 600;
        options.resizable = true;
        options.classes = ["sbi-window"];
        options.popup = true;
        options.title = "5e Statblock Importer";

        return options;
    }

    static sbiInputWindowInstance = {}

    static async renderWindow() {
        sbiWindow.sbiInputWindowInstance = new sbiWindow();
        sbiWindow.sbiInputWindowInstance.render(true);
    }

    activateListeners(html) {
        sbiUtils.log("Listeners activated")
        super.activateListeners(html);

        let importButton = $("#sbi-import-button");
        importButton.on("click", async function () {
            sbiUtils.log("Clicked import button");

            // TODO: let user define the folder that the actor goes into

            const lines = $("#sbi-input").val().trim().split(/\n/g);

            if (sbiConfig.options.debug) {
                await sbiParser.parseInput(lines);
            } else {
                try {
                    await sbiParser.parseInput(lines);
                } catch (error) {
                    ui.notifications.error("SW5E NPC IMPORTER: An error has occured. Please report it using the module link so it can get fixed.")
                }
            }
        });

        // ###############################
        // DEBUG
        // ###############################
        if (sbiConfig.options.debug) {
            const linesToAdd = [
                "SIRONA O'KEEFE",
"Medium humanoid, chaotic light",
"Armor Class 14 (Combat Suit)",
"Hit Points 27 (6d8)",
"Speed 30 ft.",
"STR	DEX	CON	INT	WIS	CHA",
"8 (-1)	16 (+3)	10 (+0)	19 (+4)	12 (+1)	14 (+2)",
"Saving Throws Dex +6, Int +7",
"Senses passive Perception 14",
"Skills Deception +5, Insight +4, Perception +4, Persuasion +5, Piloting +10, Sleight of Hand +6, Technology +10",
"Languages Galactic Basic, Huttese, Binary",
"Challenge 5 (1800 XP)",
"Bad Feeling. When Captain O'Keefe rolls for initiative, she can move up to her speed. This movement happens before the initiative order is determined. Once she has used this feature, she can’t use it again until she finishes a long rest.",
"Cunning Action. Captain O'Keefe can take a bonus action on each of her turns in combat. This action can be used only to take the Dash, Disengage, or Hide action.",
"Defiant. Captain O'Keefe can add a d4 to a skill check or saving throw, after rolling but before the outcome is known. She must then finish a short or long rest before she can use this feature again.",
"Sneak Attack. Once per turn, Captain O'Keefe can deal an extra 3d6 damage to one creature she hits with an attack if she has advantage on the attack roll. The attack must use a finesse or a ranged weapon. She does not need advantage on the attack roll if another enemy of the target is within 5 feet of it, that enemy isn’t incapacitated, and she does not have disadvantage on the attack roll.",
"Techcasting (3/Rest). Captain O'Keefe is a 6th-level techcaster. Her techcasting ability is Intelligence (power save DC 15, +7 to hit with power attacks).",
"At-will: Encrypted Message, Mending",
"1st level: Detect Enhancement, Repair Droid, Tracker Droid Interface",
"Uncanny Dodge. When an attacker that Captain O'Keefe can see hits her with an attack, she can use her reaction to halve the attack’s damage against her.",
"ACTIONS",
"Blaster Pistol. +6 to hit, range 40/160 ft., one target. Hit 6 (1d6+3) energy damage. Reload 12.",
"Vibrodagger. Melee Weapon Attack: +6 to hit, reach 5ft., one target. Hit: 3 (1d4+3) kinetic damage.",
"Hidden blade. Melee Weapon Attack: +6 to hit, reach 5ft., one target. Hit: 5 (1d4+3) kinetic damage."

            ];

            const statBlock = linesToAdd.join("\n");

            $("#sbi-input").val(statBlock);
        }
    }
}