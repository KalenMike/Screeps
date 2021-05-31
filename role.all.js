var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleRepairer = require("role.repairer");
var roleBuilder = require("role.builder");
var roleMiner = require("role.miner");
var roleHauler = require("role.hauler");

// Set Maximums by Stage

// Stage 1
// Mobile Harvesters deliver to Spawn and Containers
const MAX_HARVESTERS = 0;
const MAX_UPGRADERS = 4;
const MAX_BUILDERS = 2;
const MAX_REPAIRERS = 4;
const MAX_MINERS = 2;
const MAX_HAULER = 4;

// Stage 2
// Stationary Miners deliver to on spot container, haulers move energy to Spawn
// const MAX_HARVESTERS = 0;
// const MAX_UPGRADERS = 1;
// const MAX_BUILDERS = 1;
// const MAX_REPAIRERS = 0;
// const MAX_MINERS = 2;

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
