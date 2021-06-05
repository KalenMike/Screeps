var controller = {
    run: function (roles) {
        for (var name in Game.creeps) {
            let creep = Game.creeps[name];
            let role = creep.memory.role;

            let constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
            // let controllerLevel = Game.rooms[Game.spawns["Headquaters"].room.name].controller.level;
            let energyAvailable = Game.spawns["Headquaters"].room.energyAvailable;

            // Low energy = PRIORITISE ENERGY
            // Construction Sites = PRIORITISE BUILD OVER REPAIR

            // Low Energy Prioritise Harvest
            if (
                (energyAvailable < 300 && role != "upgrader" && role != "miner") || (energyAvailable < 600 &&
                (role == "repairer" || role == "builder"|| role == "upgrader"))
            ) {
                // Overwrite role to Harvest
                roles["harvester"].controls.run(creep);
            }else if (constructions.length &&
                role == "repairer"){
                    roles["builder"].controls.run(creep);
            } else if (
                !constructions.length &&
                role == "builder"
            ) {
                // Overwrite role to Hauler
                roles["hauler"].controls.run(creep);
            } else {
                // Activate Primary Role
                roles[role].controls.run(creep);
            }
        }
    },
};

module.exports = controller;
