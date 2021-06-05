var role = {
    name: 'upgrader',
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
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
            // Load up energy
            let success = creep.loadOrHarvestEnergy();

            if (!success) {
                creep.say("In Queue");
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
