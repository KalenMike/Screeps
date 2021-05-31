var role = {
    name: "builder",
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say("🔄 harvest");
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say("🚧 build");
        }

        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {
                        visualizePathStyle: { stroke: "#ffaa00" },
                    });
                }
            } else {
                creep.moveTo(3, 17);
                creep.say("Idle");
            }
        } else {
            // Load up energy
            let success = creep.loadEnergy();

            if (!success) {
                creep.moveTo(3, 17);
                creep.say("Idle");
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
                body: [WORK, CARRY, MOVE, MOVE],
                suffix: "Small",
                cost: 250,
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
        if (
            dna &&
            alive.length < max &&
            constructionSites.length &&
            sources.length
        ) {
            return { name: newName, role: role.name, body: dna };
        }

        return false;
    },
};

module.exports = role;
