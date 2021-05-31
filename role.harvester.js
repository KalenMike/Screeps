var role = {
    name: 'harvester',
    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.store.getFreeCapacity() > 0) {
            creep.harvestEnergy();
        } else {
            let success = creep.depositEnergy();

            if (!success) {
                creep.moveTo(24, 24);
                creep.say("Idle");
            }
        }
    },
    /** @param {Number} max **/
    create: function (max = 0) {
        // Get all
        var alive = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == role.name
        );

        // Most expensive first
        let bodyTypes = [
            {
                body: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
                suffix: "Big",
                cost: 350,
            },
            {
                body: [WORK, CARRY, CARRY, MOVE, MOVE],
                suffix: "Medium",
                cost: 300,
            },
            {
                body: [WORK, CARRY, MOVE],
                suffix: "Small",
                cost: 200,
            },
        ];

        let eneryAvailable = Game.spawns["Headquaters"].room.energyAvailable;
        let dna;
        let newName;

        bodyTypes.every((body) => {
            if (body.cost <= eneryAvailable) {
                dna = body.body;
                newName = `${role.name}${body.suffix}${Game.time.toString()}`;
                return false; // Leave loop
            }
            return true;
        });

        // Check population size
        if (dna && alive.length < max) {
            return { name: newName, role: role.name, body: dna };
        }

        return false;
    }
};

module.exports = role;
