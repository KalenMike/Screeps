var role = {
    name: "builder",
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            // Prioritise Containers
            var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER;
                },
            });
            // No containers build others
            if (!target) {
                var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            }
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {
                        visualizePathStyle: { stroke: "#ffaa00" },
                    });
                }
            } else {
                creep.say("Idle");
            }
        } else {
            // Load up energy
            let success = creep.loadOrHarvestEnergy();

            if (!success) {
                creep.say("In Queue");
            }
        }
    },
    create(max = 0) {
        // Get all
        var alive = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == role.name
        );

        // Most expensive first
        let bodyTypes = [
            {
                body: [WORK, CARRY, MOVE],
                suffix: "Small",
                cost: 200,
            },
        ];

        let eneryAvailable = Game.spawns["Headquaters"].room.energyAvailable;
        let dna;
        let newName;

        // Get construction sites
        let constructionSites = Game.spawns["Headquaters"].room.find(
            FIND_CONSTRUCTION_SITES
        );

        // Check for available energy
        sources = Game.spawns["Headquaters"].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store[RESOURCE_ENERGY] > 0
                );
            },
        });

        bodyTypes.every((body) => {
            if (body.cost <= eneryAvailable) {
                dna = body.body;
                newName = `${role.name}${body.suffix}${Game.time.toString()}`;
                return false; // Leave loop
            }
            return true;
        });

        // Check population size
        if (dna && alive.length < max && constructionSites.length) {
            return { name: newName, role: role.name, body: dna };
        }

        return false;
    },
};

module.exports = role;
