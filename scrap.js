const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })
const databases = require('./datas.json')
const colors = require('colors')
// const imessage = require('osa-imessage')
// const player = require('play-sound')(opts = {})

const actions = databases.actions
const time = 6000 * 10

// function playSound() {
//   player.play('baaah.wav', err => {
//     if (err) throw err
//   })
// }

setInterval(async () => {

  console.log(`=== ${new Date(Date.now()).toLocaleString()} ===\n`.green)

  for (let i = 0; i < actions.length; i++) {
    
    let price =  await getPrice(actions[i].url)
    let percent = await getPercent(actions[i].url)

    display(actions[i].name, actions[i].bestPrice, actions[i].acceptablePrice, price, percent)
  }
 }, time)
  
function getPrice(url) {
  
  const price = nightmare
  .goto(url)
  .wait(1000)
  .evaluate(() => document.querySelector("#main-content > div > section.l-quotepage > header > div > div > div.c-faceplate__company > div.c-faceplate__info > div > div.c-faceplate__price > span.c-instrument.c-instrument--last").innerText)

  return price
}

function getPercent(url) {

  const percent = nightmare
  .goto(url)
  .wait(1000)
  .evaluate(() => document.querySelector("#main-content > div > section.l-quotepage > header > div > div > div.c-faceplate__company > div.c-faceplate__info > div > div.c-faceplate__fluctuation > span > span").innerText)

  return percent
}


function display(name, bestPrice, acceptablePrice, price, percent) {
  
  let state = percent;

  if (price < bestPrice) {
    console.log(`
    😎   ${name.blue} => ${price.yellow} € ${state.charAt(0) == '+' ? percent.green : percent.red}
    `)
    // if (percent.replace('+', '').substring(0, 2) > 20) {
    //   playSound()
    // }
  } else if (price < acceptablePrice) {
    console.log(`
    😰   ${name.blue} => ${price.yellow} € ${state.charAt(0) == '+' ? percent.green : percent.red}
    `)

    // if (percent.replace('+', '').substring(0, 2) > 20) {
    //   // playSound()
    // }
    // sendSMS("🔥🔥", `    ${name} at ${urlProduct}`, price)
  } else {
    console.log(`
    🥶   ${name.blue} => ${price.yellow} € ${state.charAt(0) == '+' ? percent.green : percent.red}
    `)
    // if (percent.replace('+', '').substring(0, 2) > 20) {
    //   // playSound()
    // }
  }
}

// function sendSMS(power, name, price) {
//   imessage.send("+33651342155", `${power} Your ${name} is at ${price}€  💸💸`)
// }


