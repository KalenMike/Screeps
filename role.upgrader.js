var role = {
    name: 'upgrader',
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say("🔄 harvest");
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say("⚡ upgrade");
        }

        if (creep.memory.upgrading) {
            if (
                creep.upgradeController(creep.room.controller) ==
                ERR_NOT_IN_RANGE
            ) {
                creep.moveTo(creep.room.controller, {
                    visualizePathStyle: { stroke: "#ffffff" },
                });
            }
        } else {
            // Get from container
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) =>
                    s.structureType == STRUCTURE_CONTAINER &&
                    s.store[RESOURCE_ENERGY] > 0,
            });
            if (container) {
                if (
                    creep.withdraw(container, RESOURCE_ENERGY) ==
                    ERR_NOT_IN_RANGE
                ) {
                    creep.moveTo(container, {
                        visualizePathStyle: { stroke: "#ffffff" },
                    });
                }
            } else {
                // Containers empty, harvest directly
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
                    filter: (s) => s.energy > 0,
                });
                if (source) {
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, {
                            visualizePathStyle: { stroke: "#ffffff" },
                        });
                    }
                } else {
                    creep.say("In Queue");
                }
            }
        }
    },
    create(max = 1){
        // Get all harvesters
        var upgraders = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == role.name
        );
        
        // Check population size
        if (upgraders.length < max) {
            var newName = role.name + Game.time.toString();

            return { name: newName, role: role.name, body: [WORK, CARRY, MOVE] };
        }

        return false;
    }
};

module.exports = role;
