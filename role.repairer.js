var role = {
    name: "repairer",
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say("🔄 harvest");
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say("🚧 repair");
        }

        if (creep.memory.repairing) {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.hits < structure.hitsMax;
                },
            });
            if (target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {
                        visualizePathStyle: { stroke: "#ffaa00" },
                    });
                }
            }
        } else {
            // Load up energy
            let success = creep.loadEnergy();

            if (!success) {
                creep.moveTo(14, 24);
                creep.say("Idle");
            }
        }
    },
    create(max = 0) {
        // Get all harvesters
        var repairers = _.filter(
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

        let damaged = Game.spawns["Headquaters"].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.hits < structure.hitsMax;
            },
        });

        // One repairer per damaged structure capping at max
        if (repairers.length < damaged.length && repairers.length < max && sources.length) {
            var newName = "Repairer" + Game.time.toString();

            return {
                name: newName,
                role: role.name,
                body: [WORK, CARRY, MOVE, MOVE],
            };
        }

        return false;
    },
};

module.exports = role;
