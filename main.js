// All roles including run and create
var roles = require("role.all");
// Towers
var towerRoles = require("role.tower");
// Activates creeps based on role and needs
var controllerSupervisor = require("controller.supervisor");
// Spawns creeps based on requirements
var populationControl = require("population.control");

// Prototype Overides and Additions
require("prototype.creep");

module.exports.loop = function () {

    var towers = Game.rooms[Game.spawns["Headquaters"].room.name].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    towers.forEach(tower =>{
        towerRoles.run(tower);
    })
    // var tower = Game.getObjectById("60b5bf8cd1fef1f2795f221f");
    // if (tower) {
    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if (closestHostile) {
    //         tower.attack(closestHostile);
    //     } else {
    //         var closestDamagedStructure = tower.pos.findClosestByRange(
    //             FIND_STRUCTURES,
    //             {
    //                 filter: (structure) => structure.hits < structure.hitsMax,
    //             }
    //         );
    //         if (closestDamagedStructure) {
    //             tower.repair(closestDamagedStructure);
    //         }
    //     }
    // }

    populationControl.run(roles);

    controllerSupervisor.run(roles);
};
