// All roles including run and create
var roles = require('role.all');
// Activates creeps based on role and needs
var controllerSupervisor = require('controller.supervisor');
// Spawns creeps based on requirements
var populationControl = require("population.control");

// Prototype Overides and Additions
require("prototype.creep");

module.exports.loop = function () {
    // var tower = Game.getObjectById('267478cb9a6046d59f282332');
    // if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }

    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }

    populationControl.run(roles);

    controllerSupervisor.run(roles);

};
