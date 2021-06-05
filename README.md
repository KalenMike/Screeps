# Screeps

## Game Logic

-- STAGE ONE --

* Place Spawn
* Create Harvester (Min 1)
* Create Upgrader (Min 1)
* Create Harvester (Min 2)

When energyCapcaityAvailable = EnergyAvailable  

* Create Upgrader (Min 2)
* Create Upgrader  (Min 3)

Role Priorities:  
1. Harvester
2. Upgrader

-- END STAGE ONE --

-- STAGE TWO --

* Create Builder  (Min 1 Required Only -- From Source)

Loop 5x:
* Place Extension

When energyCapcaityAvailable = 550

* Place Container on Energy (Min 1)
* Create Miner (Min 1)
* Change Harvester Roler to Hauler (Harvester - Min 1, Hauler - Min 1)
* Create Repairer (Min 1 Priority Containers)

* Place Container on Energy (Min 2)
* Create Miner (Min 2)
* Change Harvester Roler to Hauler (Harvester - Min 0, Hauler - Min 2)
* Create Repairer (Min 2 Priority Containers)

Role Priorities:  
1. Harvester
2. Miner / Hauler / Builder
3. Upgrader

-- END STAGE TWO --

-- STAGE THREE --

* Change Builder Role (Min 1 Required Only -- From Container)

Loop 5x:
* Place Extension

* Place Tower

-- END STAGE THREE --

-- STAGE FOUR --

Loop 5x:
* Place Extension

-- END STAGE FOUR --
