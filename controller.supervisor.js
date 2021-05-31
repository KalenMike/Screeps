var controller = {
    run: function (roles) {

        for (var name in Game.creeps) {
            let creep = Game.creeps[name];
            let role = creep.memory.role;

            // Low Energy Prioritise Harvest
            if (Game.spawns["Headquaters"].room.energyAvailable < 300) {
                if (role == "repairer" || role == "builder") {
                    // Overwrite role to Harvest
                    roles["harvester"].controls.run(creep);
                } else {
                    // Activate Primary Role
                    roles[role].controls.run(creep);
                }
            } else {
                // Activate Primary Role
                roles[role].controls.run(creep);
            }
        }
    },
};

module.exports = controller;
