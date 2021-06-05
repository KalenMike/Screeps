var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleRepairer = require("role.repairer");
var roleBuilder = require("role.builder");
var roleMiner = require("role.miner");
var roleHauler = require("role.hauler");

// Set Maximums by Stage
var controllerLevel = Game.rooms[Game.spawns["Headquaters"].room.name].controller.level;

// Stage 1
if (controllerLevel <= 1){
    // Mobile Harvesters deliver to Spawn and Containers
    var MAX_HARVESTERS = 3;
    var MAX_UPGRADERS = 1;
    var MAX_BUILDERS = 1;
    var MAX_REPAIRERS = 0;
    var MAX_MINERS = 0;
    var MAX_HAULER = 0;
}else if(controllerLevel > 1){
    // Mobile Harvesters deliver to Spawn and Containers
    var MAX_HARVESTERS = 0;
    var MAX_UPGRADERS = 2;
    var MAX_BUILDERS = 2;
    var MAX_REPAIRERS = 2;
    var MAX_MINERS = 2;
    var MAX_HAULER = 2;
}

var allRoles = {
    [roleHarvester.name]: {
        controls: roleHarvester,
        max: MAX_HARVESTERS,
    },
    [roleUpgrader.name]: {
        controls: roleUpgrader,
        max: MAX_UPGRADERS,
    },
    [roleHauler.name]: {
        controls: roleHauler,
        max: MAX_HAULER,
    },
    [roleMiner.name]: {
        controls: roleMiner,
        max: MAX_MINERS,
    },
    [roleBuilder.name]: {
        controls: roleBuilder,
        max: MAX_BUILDERS,
    },
    [roleRepairer.name]: {
        controls: roleRepairer,
        max: MAX_REPAIRERS,
    },
};

module.exports = allRoles;
