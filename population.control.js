var populationControl = {
    /** @param {Array} roles **/
    run: function (roles) {

        // Clear memory of dead creeps
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log("Clearing non-existing creep memory:", name);
            }
        }

        if (!Game.spawns["Headquaters"].spawning) {

            const keys = Object.keys(roles);

            keys.every(key => {
                let result = roles[key].controls.create(roles[key].max);
                if (result){
                    spawnCreep(result)
                    return false; // Quit Loop
                }else{
                    return true; // Continue Loop
                }
            } )

            // roles.every(role => {
            //     let result = role.controls.create(role.max);
            //     if (result){
            //         spawnCreep(result)
            //         return false; // Quit Loop
            //     }else{
            //         return true; // Continue Loop
            //     }
            // })
        }

        // Spawn Closure
        function spawnCreep(babyCreep) {

            let response = Game.spawns["Headquaters"].spawnCreep(
                babyCreep.body,
                babyCreep.name,
                {
                    memory: { role: babyCreep.role },
                }
            );

            // Notify of Birth
            if (Game.spawns["Headquaters"].spawning) {
                console.log(
                    "Spawning new " + babyCreep.role + ": " + babyCreep.name
                );
                var spawningCreep =
                    Game.creeps[Game.spawns["Headquaters"].spawning.name];
                Game.spawns["Headquaters"].room.visual.text(
                    "🛠️" + spawningCreep.memory.role,
                    Game.spawns["Headquaters"].pos.x + 1,
                    Game.spawns["Headquaters"].pos.y,
                    { align: "left", opacity: 0.8 }
                );
            } else if (response != 0) {
                let cost = 0;
                let available = Game.spawns["Headquaters"].room.energyAvailable;
                babyCreep.body.forEach((part) => {
                    cost += BODYPART_COST[part];
                });

                console.log(
                    "Insufficient energy to spawn " +
                        babyCreep.role +
                        ". Error " +
                        response,
                    "Cost :",
                    cost,
                    "Available : ",
                    available
                );
            }
        }
    },
};

module.exports = populationControl;
