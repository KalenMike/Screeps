var role = {
    name: "miner",
    /** @param {Creep} creep **/
    run: function (creep) {
        // Move to Energy Source
        if (!creep.memory.loaded) {
            // Get closest source regardless of whether active or empty
            var source = creep.pos.findClosestByPath(FIND_SOURCES);

            // Attempt harvest and move if needed
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {
                    visualizePathStyle: { stroke: "#ffffff" },
                });
                creep.say("To Source");
            } else if (!source) {
                creep.say("In Queue");
            } else {
                // If no move is needed set to mining
                creep.say("Mining");
                creep.memory.loaded = true;
            }
        } else {
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    );
                },
            });

            // Attempt transfer and move if needed
            if (
                creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
            ) {
                creep.memory.loaded = false;
            } else if (container == null) {
                Game.rooms[Game.spawns["Headquaters"].room.name].createConstructionSite(
                    creep.pos.x,
                    creep.pos.y,
                    STRUCTURE_CONTAINER
                );
                creep.say("Builder!");
                creep.memory.loaded = false;
            } else {
                // If no move is needed set to mining complete
                creep.memory.loaded = false;
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
        var sources = Game.spawns["Headquaters"].room.find(
            FIND_SOURCES_ACTIVE,
            {
                filter: (s) => s.energy > 0,
            }
        );

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
