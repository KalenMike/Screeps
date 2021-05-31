var role = {
    name: "miner",
    /** @param {Creep} creep **/
    run: function (creep) {
        // Move to Energy Source
        if (!creep.memory.mining){
            // Get closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
                filter: (s) => s.energy > 0,
            });

            // Attempt harvest and move if needed
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {
                    visualizePathStyle: { stroke: "#ffffff" },
                });
            }else{
                // If no move is needed set to mining
                creep.memory.mining = true;
            }
        }else{
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER&&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    );
                },
            });
            // Attempt transfer and move if needed
            if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {
                    visualizePathStyle: { stroke: "#ffaa00" },
                });
            }else{
                // If no move is needed set to mining complete
                creep.memory.mining = false;
            }
        }
    },
    /** @param {Number} max **/
    create: function (max = 0) {
        // Get all harvesters
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

        // Check population size
        if (alive.length < max && sources.length) {
            var newName = role.name + Game.time.toString();

            return {
                name: newName,
                role: role.name,
                body: [WORK, WORK, WORK, WORK, WORK, MOVE],
            };
        }

        return false;
    },
};

module.exports = role;
