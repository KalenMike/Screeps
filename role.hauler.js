var role = {
    name: "hauler",
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            creep.loadEnergy();
        } else {
            let success = creep.depositEnergyToSpawn();

            if (!success) {
                let success = creep.depositEnergyToTower();

                if (!success) {
                    creep.say("Idle");
                }
            }
        }
    },
    /** @param {Number} max **/
    create: function (max = 0) {
        // Get all
        let alive = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == role.name
        );

        // Check for available energy
        let sources = Game.spawns["Headquaters"].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store[RESOURCE_ENERGY] > 0
                );
            },
        });

        let storageAvailable =
            Game.spawns["Headquaters"].room.energyCapacityAvailable -
            Game.spawns["Headquaters"].room.energyAvailable;

        // Spawn is not at capacity
        if (alive.length < max && sources.length && storageAvailable > 0) {
            var newName = role.name + Game.time.toString();

            return {
                name: newName,
                role: role.name,
                body: [CARRY, MOVE],
            };
        }

        return false;
    },
};

module.exports = role;
