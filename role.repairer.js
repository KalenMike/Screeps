var role = {
    name: "repairer",
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
        }

        if (creep.memory.repairing) {
            // Prioritise Containers
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER &&
                        structure.hits < structure.hitsMax
                    );
                },
            });
            // No containers fix others
            if (!target) {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.hits < structure.hitsMax;
                    },
                });
            }
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
        if (
            repairers.length < damaged.length &&
            repairers.length < max &&
            sources.length
        ) {
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
