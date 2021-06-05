Creep.prototype.harvestEnergy = function () {
    // Find closest available energy source
    var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE, {
        filter: (s) => s.energy > 0,
    });
    if (source) {
        if (this.harvest(source) == ERR_NOT_IN_RANGE) {
            this.moveTo(source, {
                visualizePathStyle: { stroke: "#ffffff" },
            });
        }
        this.say('Harvest');
        return true;
    } else {
        return false;
    }
};

Creep.prototype.loadEnergy = function (min = 0) {
    // Find closest container with energy
    var container = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) =>
            s.structureType == STRUCTURE_CONTAINER &&
            s.store[RESOURCE_ENERGY] > min,
    });
    if (container) {
        if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(container, {
                visualizePathStyle: { stroke: "#ffffff" },
            });
        }
        this.say('Load');
        return true;
    } else {
        return false;
    }
};

Creep.prototype.sweepEnergy = function () {
    var dropped = this.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
        filter: (s) => s.resourceType == RESOURCE_ENERGY,
    });

    if (dropped) {
        if (this.pickup(dropped, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(dropped, {
                visualizePathStyle: { stroke: "#ffffff" },
            });
        }
        this.say("Sweep");
        return true;
    } else {
        return false;
    }
};

Creep.prototype.loadOrHarvestEnergy = function () {
    let success = this.sweepEnergy();

    // console.log('Sweep: ' + success);

    if (!success) {
        success = this.loadEnergy(50);
        // console.log('Load: ' + success);
    }

    if (!success) {
        success = this.harvestEnergy();
        // console.log('Harvest: ' + success);
    }
    
    if (success) {
        return true;
    } else {
        return false;
    }
};

Creep.prototype.depositEnergy = function () {
    // Prioritise Spawn and Extension
    let result = this.depositEnergyToSpawn();
    if (!result) {
        result = this.depositEnergyToContainer();
    }
    if (result) {
        return true;
    } else {
        return false;
    }
};

Creep.prototype.depositEnergyToSpawn = function () {
    // Prioritise Spawn and Extension
    var target = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (
                (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            );
        },
    });
    // There is available storage
    if (target) {
        if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(target, {
                visualizePathStyle: { stroke: "#ffaa00" },
            });
        }
        return true;
    } else {
        return false;
    }
};

Creep.prototype.depositEnergyToContainer = function () {
    let target = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (
                structure.structureType == STRUCTURE_CONTAINER &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            );
        },
    });
    // There is available storage
    if (target) {
        if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(target, {
                visualizePathStyle: { stroke: "#ffaa00" },
            });
        }
        return true;
    } else {
        return false;
    }
};

Creep.prototype.depositEnergyToTower = function () {
    let target = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (
                structure.structureType == STRUCTURE_TOWER &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            );
        },
    });
    // There is available storage
    if (target) {
        if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(target, {
                visualizePathStyle: { stroke: "#ffaa00" },
            });
        }
        return true;
    } else {
        return false;
    }
};
