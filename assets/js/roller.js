const attackDiceNumber = document.getElementById('attackDiceNumber')
const defenseDiceNumber = document.getElementById('defenseDiceNumber')
const attackDiceContainer = document.getElementById('attackDiceContainer')
const defenseDiceContainer = document.getElementById('defenseDiceContainer')
const rollButton = document.getElementById('rollButton')
const damageHeader = document.getElementById('damageHeader')


function rollDie(number) {
  let result = Math.ceil(Math.random() * number)
  return result
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
      if (defenseRollResults[i] === damageResults[j]) {
        damageResults.splice(j, 1)
        break
      }
    }
  }
  return { damage: damageResults.length, attackRolls: attackRollResults.sort(), defenseRolls: defenseRollResults.sort() }
}

function handleDiceRoll() {
  const { damage, attackRolls, defenseRolls } = attackVsDefense(attackDiceNumber.value, defenseDiceNumber.value)
  attackDiceContainer.innerText = ''
  defenseDiceContainer.innerText = ''

  console.log(damage)
  console.log(attackRolls)
  console.log(defenseRolls)

  for (const roll of attackRolls) {
    const imgElement = document.createElement('img')
    imgElement.src = `assets/images/red-${roll}.png`
    imgElement.className = `img-fluid col-3 m-1`
    imgElement.alt = `red die ${roll}`

    attackDiceContainer.appendChild(imgElement)
  }

  for (const roll of defenseRolls) {
    const imgElement = document.createElement('img')
    imgElement.src = `assets/images/blue-${roll}.png`
    imgElement.className = `img-fluid col-3 m-1`
    imgElement.alt = `red die ${roll}`

    defenseDiceContainer.appendChild(imgElement)
  }

  damageHeader.innerText = `Damage: ${damage}`

}

rollButton.addEventListener('click', handleDiceRoll)

