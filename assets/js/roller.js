const attackDiceNumber = document.getElementById('attackDiceNumber')
const defenseDiceNumber = document.getElementById('defenseDiceNumber')
const weaponSelectEl = document.getElementById('weaponSelect')
const enemySelectEl = document.getElementById('enemySelect')
const baseEnemiesToggle = document.getElementById('baseEnemies')
const arenaEnemiesToggle = document.getElementById('arenaEnemies')
const zoneFourEnemiesToggle = document.getElementById('zoneFourEnemies')
const heroDiceContainer = document.getElementById('heroDiceContainer')
const enemyDiceContainer = document.getElementById('enemyDiceContainer')
const rollButton = document.getElementById('rollButton')
const counterRollButton = document.getElementById('counterRollButton')
const damageHeader = document.getElementById('damageHeader')
const enemyStatsDisplay = document.getElementById('enemyStatsDisplay')
const enemyAttackSpan = document.getElementById('enemyAttackSpan')
const enemyPhyDefSpan = document.getElementById('enemyPhyDefSpan')
const enemyMagDefSpan = document.getElementById('enemyMagDefSpan')

let currentWeapon = null
let currentEnemy = null

/* -------- Weapon List ------------------------------------------------- */
const weapons = {
  'club': {
    name: 'Club',
    type: 'physical'
  },
  crossbow: {
    name: 'Crossbow',
    type: 'physical'
  },
  dagger: {
    name: 'Dagger',
    type: 'physical'
  },
  magicDrain: {
    name: 'Magic Drain',
    type: 'magic'
  },
  lightningStrike: {
    name: 'Lightning Strike',
    type: 'magic'
  },
  sword: {
    name: 'Sword',
    type: 'physical'
  },
  spear: {
    name: 'Spear',
    type: 'physical'
  },
  magicStaff: {
    name: 'Magic Staff',
    type: 'magic'
  },
}

/* -------- Arena Enemy List -------------------------------------------- */
const arenaEnemies = {
  brutusTheBashful: {
    name: 'Brutus the Bashful',
    attack: 2,
    armor: {
      physical: 2,
      magic: 1
    }
  },
  silasTheSlow: {
    name: 'Silas the Slow',
    attack: 2,
    armor: {
      physical: 2,
      magic: 1
    }
  },
  lenaTheLowly: {
    name: 'Lena the Lowly',
    attack: 2,
    armor: {
      physical: 2,
      magic: 1
    }
  },
  rolfTheMeek: {
    name: 'Rolf the Meek',
    attack: 2,
    armor: {
      physical: 2,
      magic: 1
    }
  },
  fionaTheFierce: {
    name: 'Fiona the Fierce',
    attack: 2,
    armor: {
      physical: 3,
      magic: 4
    }
  },
  garrickTheGallant: {
    name: 'Garrick the Gallant',
    attack: 2,
    armor: {
      physical: 3,
      magic: 4
    }
  },
  elaraTheSwift: {
    name: 'Elara the Swift',
    attack: 2,
    armor: {
      physical: 3,
      magic: 4
    }
  },
  dariusTheDominator: {
    name: 'Darius the Dominator',
    attack: 3,
    armor: {
      physical: 4,
      magic: 4
    }
  },
  vesperTheValiant: {
    name: 'Vesper the Valiant',
    attack: 3,
    armor: {
      physical: 4,
      magic: 4
    }
  },
  championCraig: {
    name: 'Champion Craig',
    attack: 4,
    armor: {
      physical: 4,
      magic: 4
    }
  } 
}

/* -------- Base Enemy List ---------------------------------------------- */
const baseEnemies = {
  phytank: {
    name: 'Phytank',
    attack: 1,
    armor: {
      physical: 4,
      magic: 0
    }
  },	
  magtank: {
    name: 'Magtank',
    attack: 1,
    armor: {
      physical: 0,
      magic: 4
    }
  },	
  defguy: {
    name: 'Defguy',
    attack: 2,
    armor: {
      physical: 3,
      magic: 3
    }
  },	
  bigpow: {
    name: 'Bigpow',
    attack: 4,
    armor: {
      physical: 1,
      magic: 1
    }
  },	
  normal: {
    name: 'Normal',
    attack: 3,
    armor: {
      physical: 2,
      magic: 2
    }
  },	
  jailer: {
    name: 'Jailer',
    attack: 1,
    armor: {
      physical: 6,
      magic: 6
    }
  },	
}

const zoneFourEnemies = {
  undeadKnight1: {
    name: 'Undead Knight 1',
    attack: 1,
    armor: {
      physical: 4,
      magic: 2
    }
  },
  undeadKnight2: {
    name: 'Undead Knight 2',
    attack: 2,
    armor: {
      physical: 4,
      magic: 2
    }
  },
  undeadKnight3: {
    name: 'Undead Knight 3',
    attack: 3,
    armor: {
      physical: 4,
      magic: 2
    }
  },
  undeadKnight4: {
    name: 'Undead Knight 4',
    attack: 4,
    armor: {
      physical: 4,
      magic: 2
    }
  },
  dragon4: {
    name: 'Dragon 4',
    attack: 4,
    armor: {
      physical: 2,
      magic: 4
    }
  },
  dragon5: {
    name: 'Dragon 5',
    attack: 5,
    armor: {
      physical: 2,
      magic: 4
    }
  },
  dragon6: {
    name: 'Dragon 6',
    attack: 6,
    armor: {
      physical: 2,
      magic: 4
    }
  },
}

/* -------- Populate List of enemies ------------------------------------ */
function populateEnemyList(enemies) {
  enemySelectEl.innerHTML = '<option selected>Select</option>'

  Object.keys(enemies).forEach(key => {
    const enemy = enemies[key];
    const option = document.createElement('option');
    option.value = key;
    option.textContent = enemy.name;
    enemySelectEl.appendChild(option);
  });
}

/* -------- Single Die Roll --------------------------------------------- */
function rollDie(number) {
  const roll = {
    value: Math.ceil(Math.random() * number),
    match: false,
    crit: false
  }
  return roll
}

/* -------- Multiple Dice Roll ==---------------------------------------- */
function multiRoll(numberofRolls, diceMax) {
  let rollResults = []
  for (let i = 0; i < numberofRolls; i++) {
    rollResults.push(rollDie(diceMax))
  }
  return rollResults
}
/* -------- Dice roll with defense -------------------------------------- */
function attackVsDefense(attackDice, defenseDice) {
  const attackRollArray = multiRoll(attackDice, 6)
  const defenseRollArray = multiRoll(defenseDice, 6)
  let unblockedRollsArray = attackRollArray.slice()

  for (i = 0; i < defenseRollArray.length; i++) {
    for (j = 0; j < unblockedRollsArray.length; j++) {
      if (defenseRollArray[i].value === unblockedRollsArray[j].value) {
        defenseRollArray[i].match = true
        unblockedRollsArray[j].match = true
        unblockedRollsArray.splice(j, 1)
        break
      }
    }
  }
  return { unblockedRolls: unblockedRollsArray.length, attackRolls: attackRollArray.sort((a, b) => a.value - b.value), defenseRolls: defenseRollArray.sort((a, b) => a.value - b.value), }
}
/* -------- Handle Hero Roll -------------------------------------------- */
function handleHeroRoll() {
  const currentEnemyArmor = currentEnemy.armor[currentWeapon.type]

  heroDiceContainer.innerText = ''
  enemyDiceContainer.innerText = ''
  let { unblockedRolls, attackRolls, defenseRolls, } = attackVsDefense(attackDiceNumber.value, currentEnemyArmor)
  let damage = 0

  if (currentWeapon === weapons.club) {
    damage = checkClubHits(attackRolls)
  } else if (currentWeapon === weapons.magicDrain) {
    attackRolls = multiRoll(1, 6)
    damage = attackRolls[0].value - currentEnemy.armor.magic
    renderAttackDice(attackRolls, heroDiceContainer)
    damageHeader.innerText = `Damage: ${damage}`
    return
  } else if (currentWeapon === weapons.sword) {
    const swordCrits = checkSixes(attackRolls)
    damage = unblockedRolls + swordCrits
    renderDefenseDice(defenseRolls, enemyDiceContainer)
  } else if (currentWeapon === weapons.magicStaff) {
    const staffCrits = checkDoubles(attackRolls)
    damage = unblockedRolls + staffCrits
    renderDefenseDice(defenseRolls, enemyDiceContainer)
  } else {
    damage = unblockedRolls
    renderDefenseDice(defenseRolls, enemyDiceContainer)
  }
  renderAttackDice(attackRolls, heroDiceContainer)
  damageHeader.innerText = `Damage: ${damage}`
  counterRollButton.classList.remove('d-none')
}

/* -------- Handle Counter Roll ------------------------------------------ */
function handleCounterRoll() {
  const currentEnemyAttack = currentEnemy.attack
  heroDiceContainer.innerText = ''
  enemyDiceContainer.innerText = ''
  let { unblockedRolls, attackRolls, defenseRolls, } = attackVsDefense(currentEnemyAttack, defenseDiceNumber.value)
  let damage = unblockedRolls

  renderDefenseDice(defenseRolls, heroDiceContainer)
  renderAttackDice(attackRolls, enemyDiceContainer)
  damageHeader.innerText = `Damage: ${damage}`
  counterRollButton.classList.add('d-none')
}
/* -------- Render attack dice ------------------------------------------- */
function renderAttackDice(attackRolls, container) {
  for (const roll of attackRolls) {
    const imgElement = document.createElement('img')
    imgElement.src = `assets/images/red-${roll.value}.png`
    imgElement.className = `img-fluid col-3 m-1 p-1`
    imgElement.alt = `red die ${roll.value}`

    if (currentWeapon === weapons.club) {
      roll.value >= 4 ? imgElement.classList.add('custom-hit') : imgElement.classList.add('opacity-50')
    } else {
      roll.match === true ? imgElement.classList.add('custom-block', 'opacity-50') : imgElement.classList.add('custom-hit')
    }

    if (roll.crit === true) {
      setInterval(function () {
        imgElement.classList.toggle('custom-crit');
      }, 300)
    }

    container.appendChild(imgElement)
  }
}
/* -------- Render defense dice ------------------------------------------ */
function renderDefenseDice(defenseRolls, container) {
  for (const roll of defenseRolls) {
    const imgElement = document.createElement('img')
    imgElement.src = `assets/images/blue-${roll.value}.png`
    imgElement.className = `img-fluid col-3 m-1 p-1`
    imgElement.alt = `blue die ${roll.value}`
    if (roll.match === true) {
      imgElement.classList.add('custom-block', 'opacity-50')
    } else {
      imgElement.classList.add('opacity-25')
    }

    container.appendChild(imgElement)
  }
}
/* -------- Check for rolls of 4+ -------------------------------------- */
function checkClubHits(rolls) {
  let clubDamage = 0

  for (const roll of rolls) {
    if (roll.value >= 4) {
      clubDamage++
    }
  }

  return clubDamage
}
/* -------- Check for sets of doubles for magic staff ----------------- */
function checkDoubles(rolls) {
  let crits = 0
  for (i = 0; i < rolls.length; i++) {
    const dieOne = rolls[i]
    console.log([dieOne.match, dieOne.crit])
    for (j = 0; j < rolls.length; j++) {
      const dieTwo = rolls[j]
      if (!dieOne.match && !dieOne.crit && !dieTwo.match && !dieTwo.crit && dieOne.value === dieTwo.value && i !== j) {
        dieOne.crit = true
        dieTwo.crit = true
        crits++
      }
    }
  }
  return crits
}

/* -------- Check for sixes for sword roll -------------------------- */
function checkSixes(attackRolls) {
  let crits = 0
  for (const roll of attackRolls) {
    if (roll.match === false && roll.value === 6) {
      crits++
      roll.crit = true
    }
  }
  return crits
}


/* -------------------------------- INIT -------------------------------------------- */
// Begin with base enemies in list
populateEnemyList(baseEnemies)

// Listen for base enemy toggle
baseEnemiesToggle.addEventListener('change', function() {
  if (this.checked) {
      populateEnemyList(baseEnemies);
  }
})

// Listen for arena enemy toggle
arenaEnemiesToggle.addEventListener('change', function() {
  if (this.checked) {
      populateEnemyList(arenaEnemies);
  }
})

// Listen for zone 4 enemy toggle
zoneFourEnemiesToggle.addEventListener('change', function() {
  if (this.checked) {
      populateEnemyList(zoneFourEnemies);
  }
})

// Listen for enemy select
enemySelectEl.addEventListener('change', function() {
  const selectedEnemy = this.value;
  if (selectedEnemy === 'Select') {
      currentEnemy = null;
  } else {
      // Choose enemy list based on what is checked
      let enemies
      if (document.getElementById('baseEnemies').checked) {
        enemies = baseEnemies
      } else if (document.getElementById('arenaEnemies').checked) {
        enemies = arenaEnemies
      } else if (document.getElementById('zoneFourEnemies').checked) {
        enemies = zoneFourEnemies
        counterRollButton.classList.remove('d-none')
      }
      currentEnemy = enemies[selectedEnemy]
      console.log(currentEnemy.attack)
      // Display enemy stats
      enemyStatsDisplay.classList.remove('d-none')
      enemyAttackSpan.innerText = `${currentEnemy.attack}`
      enemyPhyDefSpan.innerText = `${currentEnemy.armor.physical}`
      enemyMagDefSpan.innerText = `${currentEnemy.armor.magic}`
  }
  console.log(currentEnemy)
})

// Listen for weapon select
weaponSelectEl.addEventListener('change', function() {
  const selectedWeapon = this.value;
  if (selectedWeapon === 'Select') {
      currentWeapon = null;
  } else {
      currentWeapon = weapons[selectedWeapon]
  }
  console.log(currentWeapon)
})

// Listen for roll button click
rollButton.addEventListener('click', handleHeroRoll)

// Listen for counter roll button click
counterRollButton.addEventListener('click', handleCounterRoll)

