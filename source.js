const account = prompt("Enter your hive username")
const symbol = "PIZZA"



async function findStaking(token) {
    let tokenData = [];
    let i = 0;
    while (tokenData.length % 500 === 0) {
      const response = await fetch(
        `https://accounts.hive-engine.com/accountHistory?account=${account}&ops=tokens_stake&symbol=${token}&offset=${i}`
      );
      const data = await response.json();
      console.log(data);
      tokenData = tokenData.concat(data);
      i = i + 500;
      if (data.length<500) {
      // if (true) {
        break;
      }
    }
    tokenData = tokenData.filter((v) => v.from === "pizza-rewards")
    console.log(tokenData)
    const quantityStakedWeek = findQuantityStaked(tokenData, 7)
    const quantityStakedMonth = findQuantityStaked(tokenData,30)
    const quantityStakedYear = findQuantityStaked(tokenData, tokenData.length)
    const main = document.getElementById("main")
    const div = document.createElement("div")
    const weekParagraph = document.createElement("p")
    const monthParagraph = document.createElement("p")
    const yearParagraph = document.createElement("p")
    weekParagraph.textContent = `${account} got ${quantityStakedWeek} this week from staking`
    monthParagraph.textContent = `${account} got ${quantityStakedMonth} this month from staking`
    yearParagraph.textContent = `${account} got ${quantityStakedYear} from the beginning of time from staking`

    div.append(weekParagraph)
    div.append(monthParagraph)
    div.append(yearParagraph)
    main.append(div)
    
  }

  function findQuantityStaked(data, instanceOfDatas) {
    let money = 0

    for (let i = 0; i <instanceOfDatas; i++) {
        if (data[i].from==="pizza-rewards") {
        money = money + parseFloat(data[i].quantity)
        }
    }
    return money
  }

  findStaking("PIZZA")
