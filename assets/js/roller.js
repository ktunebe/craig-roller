const attackDiceNumber = document.getElementById('attackDiceNumber')
const defenseDiceNumber = document.getElementById('defenseDiceNumber')
const weaponSelect = document.getElementById('weaponSelect');
const attackDiceContainer = document.getElementById('attackDiceContainer')
const defenseDiceContainer = document.getElementById('defenseDiceContainer')
const rollButton = document.getElementById('rollButton')
const damageHeader = document.getElementById('damageHeader')
let selectedWeapon
let selectedEnemy

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


function rollDie(number) {
  const roll = {
    value: Math.ceil(Math.random() * number),
    match: false,
    crit: false
  }
  return roll
}

function multiRoll(numberofRolls, diceMax) {
  let rollResults = []
  for (let i = 0; i < numberofRolls; i++) {
    rollResults.push(rollDie(diceMax))
  }
  return rollResults
}
/* ---------------------------------------------------------------------------- */
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
/* ---------------------------------------------------------------------------- */
function handleDiceRoll() {
  selectedWeapon = weapons[weaponSelect.value];
  console.log(selectedWeapon)
  console.log(selectedWeapon.type)
  attackDiceContainer.innerText = ''
  defenseDiceContainer.innerText = ''
  let { unblockedRolls, attackRolls, defenseRolls, } = attackVsDefense(attackDiceNumber.value, defenseDiceNumber.value)
  let damage = 0

  console.log(unblockedRolls)
  console.log(attackRolls)
  console.log(defenseRolls)

  if (selectedWeapon === weapons.club) {
    damage = checkClubHits(attackRolls)
  } else if (selectedWeapon === weapons.sword) {
    const swordCrits = checkSixes(attackRolls)
    damage = unblockedRolls + swordCrits
    renderDefenseDice(defenseRolls)
  } else if (selectedWeapon === weapons.magicStaff) {
    const staffCrits = checkDoubles(attackRolls)
    damage = unblockedRolls + staffCrits
    renderDefenseDice(defenseRolls)
  } else {
    damage = unblockedRolls
    renderDefenseDice(defenseRolls)
  }
  renderAttackDice(attackRolls)
  damageHeader.innerText = `Damage: ${damage}`

}
/* ---------------------------------------------------------------------------- */
function renderAttackDice(attackRolls) {
  for (const roll of attackRolls) {
    const imgElement = document.createElement('img')
    imgElement.src = `assets/images/red-${roll.value}.png`
    imgElement.className = `img-fluid col-3 m-1 p-1`
    imgElement.alt = `red die ${roll.value}`

    if (selectedWeapon === weapons.club) {
      roll.value >= 4 ? imgElement.classList.add('custom-hit') : imgElement.classList.add('opacity-50')
    } else {
      roll.match === true ? imgElement.classList.add('custom-block', 'opacity-50') : imgElement.classList.add('custom-hit')
    }

    if (roll.crit === true) {
      setInterval(function () {
        imgElement.classList.toggle('custom-crit');
      }, 300)
    }

    attackDiceContainer.appendChild(imgElement)
  }
}
/* ---------------------------------------------------------------------------- */
function renderDefenseDice(defenseRolls) {
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

    defenseDiceContainer.appendChild(imgElement)
  }
}
/* ---------------------------------------------------------------------------- */
function checkClubHits(rolls) {
  let clubDamage = 0

  for (const roll of rolls) {
    if (roll.value >= 4) {
      clubDamage++
    }
  }

  return clubDamage
}
/* ---------------------------------------------------------------------------- */
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

/* ---------------------------------------------------------------------------- */
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

rollButton.addEventListener('click', handleDiceRoll)

