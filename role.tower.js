var role = {
    /** @param {Structure} tower **/
    run: function (tower) {
        // Priotritise Attack
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        } else {
            var closestDamagedStructure = tower.pos.findClosestByRange(
                FIND_STRUCTURES,
                {
                    filter: (structure) => structure.hits < structure.hitsMax,
                }
            );
            // Only repair if there are attack reserves
            if (closestDamagedStructure && tower.store[RESOURCE_ENERGY] > 500) {
                tower.repair(closestDamagedStructure);
            }
        }
    },
    create(max = 0) {},
};

module.exports = role;
