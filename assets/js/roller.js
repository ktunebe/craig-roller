const attackDiceNumber = document.getElementById('attackDiceNumber')
const defenseDiceNumber = document.getElementById('defenseDiceNumber')
const attackDiceContainer = document.getElementById('attackDiceContainer')
const defenseDiceContainer = document.getElementById('defenseDiceContainer')
const rollButton = document.getElementById('rollButton')
const damageHeader = document.getElementById('damageHeader')


function rollDie(number) {
  const roll = {
    value: Math.ceil(Math.random() * number),
    match: false
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

function attackVsDefense(attackDice, defenseDice) {
  const attackRollResults = multiRoll(attackDice, 6)
  const defenseRollResults = multiRoll(defenseDice, 6)
  let damageResults = attackRollResults.slice()

  for (i = 0; i < defenseRollResults.length; i++) {
    for (j = 0; j < damageResults.length; j++) {
      if (defenseRollResults[i].value === damageResults[j].value) {
        defenseRollResults[i].match = true
        damageResults[j].match = true
        damageResults.splice(j, 1)
        break
      }
    }
  }
  return { damage: damageResults.length, attackRolls: attackRollResults.sort((a, b) => a.value - b.value), defenseRolls: defenseRollResults.sort((a, b) => a.value - b.value), }
}

function handleDiceRoll() {
  const { damage, attackRolls, defenseRolls, } = attackVsDefense(attackDiceNumber.value, defenseDiceNumber.value)
  attackDiceContainer.innerText = ''
  defenseDiceContainer.innerText = ''

  console.log(damage)
  console.log(attackRolls)
  console.log(defenseRolls)

  for (const roll of attackRolls) {
    const imgElement = document.createElement('img')
    imgElement.src = `assets/images/red-${roll.value}.png`
    imgElement.className = `img-fluid col-3 m-1 p-1`
    imgElement.alt = `red die ${roll.value}`
    if (roll.match === true) {
      imgElement.classList.add('custom-block', 'opacity-50')
    } else {
      imgElement.classList.add('custom-hit')
    }

    attackDiceContainer.appendChild(imgElement)
  }

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

  damageHeader.innerText = `Damage: ${damage}`

}

rollButton.addEventListener('click', handleDiceRoll)

