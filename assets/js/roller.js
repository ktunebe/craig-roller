const attackDiceNumber = document.getElementById('attackDiceNumber')
const defenseDiceNumber = document.getElementById('defenseDiceNumber')
const weaponSelect = document.getElementById('weaponSelect');
const attackDiceContainer = document.getElementById('attackDiceContainer')
const defenseDiceContainer = document.getElementById('defenseDiceContainer')
const rollButton = document.getElementById('rollButton')
const damageHeader = document.getElementById('damageHeader')

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

let selectedWeapon


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
function checkClubHits(attackRolls) {
  let clubDamage = 0

  for (const roll of attackRolls) {
    if (roll.value >= 4) {
      clubDamage++
    }
  }

  return clubDamage
}
/* ---------------------------------------------------------------------------- */

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

