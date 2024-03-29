class Player {
    constructor(name, savings, stocks) {
        this.name = name
        this.savings = savings
        this.stocks = stocks
    }
}

class Entreprise {
    constructor(name, capital, sold) {
        this.name = name
        this.capital = capital
        this.startCapital = capital
        this.capitalMax = capital * 10
        this.sold = sold
        this.value = [capital]
    }
}

class Stocks {
    constructor(name, quantity) {
        this.name = name
        this.quantity = quantity
    }
}

// Disclaimer and How to use part

document.querySelector(".btn_disclaimer").addEventListener("click", () => {
    document.querySelector(".disclaimer").style.transform = "translateX(-100%)"

    document.querySelector(".disclaimer").addEventListener("transitionend", e => {
        if (e.propertyName === "transform") {
            document.querySelector(".disclaimer").remove()
        }
    })

    document.querySelector(".guide").style.transform = "translateX(-100%)"
})

document.querySelector(".btn_guide").addEventListener("click", () => {
    document.querySelector(".guide").style.transform = "translateX(-200%)"

    document.querySelector(".guide").addEventListener("transitionend", e => {
        if (e.propertyName === "transform") {
            document.querySelector(".guide").remove()
            document.querySelector(".disc_and_rule").remove()
        }
    })
})

/////////////////////////

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let colorList = ['#864C39', '#bde0f4', '#C63883', '#de911b', '#DB2428', '#FFF004', '#60ad5b', '#0067A4']
let playerList = []
let companyList = []

let playerListObject = []
let companyListObject = []

let turn = 0

// Setup

function menuSetup(tab) {
    const selectors = {
        player: ".input_player",
        company: ".input_company",
        setting: ".input_setting",
    }

    for (const selector in selectors) {
        const element = document.querySelector(selectors[selector])
        if (selector === tab) {
            element.classList.remove("hidden")
        } else {
            element.classList.add("hidden")
        }
    }
}

let btnInputPlayer = document.querySelector(".btn_input_player")
let textInputPlayer = document.querySelector("#text_input_player")
let btnInputCompany = document.querySelector(".btn_input_company")
let textInputCompany = document.querySelector("#text_input_company")

btnInputPlayer.addEventListener("click", () => {
    if (playerList.length < 8) {
        addPlayerOrCompany(textInputPlayer.value, "player")
        textInputPlayer.value = ""
    } else {
        alert("You cannot add more than 8 players.")
    }
})

textInputPlayer.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        e.preventDefault()
        btnInputPlayer.click()
    }
})

btnInputCompany.addEventListener("click", () => {
    if (companyList.length < 4) {
        addPlayerOrCompany(textInputCompany.value, "company")
        textInputCompany.value = ""
    } else {
        alert("You cannot add more than 4 companies.")
    }
})

textInputCompany.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        e.preventDefault()
        btnInputCompany.click()
    }
})

function addPlayerOrCompany(str, type) {
    const listElement = type === "player" ? document.querySelector('.list_player') : document.querySelector('.list_company')
    const confirmationElement = type === "player" ? document.querySelector('.confirmation_player') : document.querySelector('.confirmation_company')
    const pElement = document.createElement('p')
    const textNode = document.createTextNode(str)

    pElement.style.backgroundColor = colorList[getRandomInt(colorList.length)]
    pElement.appendChild(textNode)
    listElement.appendChild(pElement)

    let pElement2 = pElement.cloneNode(true)
    confirmationElement.appendChild(pElement2)

    if (type === "player") {
        playerList.push(str)
    } else if (type === "company") {
        companyList.push(str)
    }

    pElement.addEventListener('click', () => {
        listElement.removeChild(pElement)
        confirmationElement.removeChild(pElement2)

        if (type === "player") {
            const index = playerList.indexOf(str)
            if (index > -1) {
                playerList.splice(index, 1)
            }
        } else if (type === "company") {
            const index = companyList.indexOf(str)
            if (index > -1) {
                companyList.splice(index, 1)
            }
        }
    })
}

let maxBanknoteValue = 0
let minBanknoteValue = 0 

let textInputBanknote = document.querySelector("#text_input_banknote")

let btnInputStart = document.querySelector(".btn_input_start")
let setupConfirmation = document.querySelector(".setup__confirmation")

btnInputStart.addEventListener("click", () => {
    if (playerList.length > 1 && companyList.length > 0 && textInputBanknote.value !== "") {
        const banknoteValue = document.querySelector(".banknote_value")
        maxBanknoteValue = textInputBanknote.value === "" ? 0 : parseInt(textInputBanknote.value);
        banknoteValue.innerHTML = maxBanknoteValue + "€"

        const confirmationPlayerNumber = document.querySelector(".confirmation_player_number")
        confirmationPlayerNumber.innerHTML = playerList.length

        const confirmationCompanyNumber = document.querySelector(".confirmation_company_number")
        confirmationCompanyNumber.innerHTML = companyList.length

        setupConfirmation.style.transform = "translateX(100%)"
    } else {
        alert("You must have at least 2 players and 1 company and a valid max banknote value.")
    }
})

textInputBanknote.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        e.preventDefault()
        btnInputStart.click()
    }
})

setupConfirmation.addEventListener("click", () => {
    setupConfirmation.style.transform = "translateX(0%)"
})

let btnConfirmationStart = document.querySelector(".btn_confirmation_start")

btnConfirmationStart.addEventListener("click", e => {
    e.stopPropagation();
    createGameMenu()

    const setup = document.querySelector(".setup")
    setup.style.transform = "translateX(100%)"

    setup.addEventListener("transitionend", e => {
        if (e.propertyName === "transform") {
            setup.remove()
        }
    })

    const game = document.querySelector(".game")
    game.style.transform = "translateX(100%)"
})

// Game Menu

let btnTabPlayer = document.querySelector(".game__tab_player")
let btnTabCompany = document.querySelector(".game__tab_company")

btnTabPlayer.style.backgroundColor += colorList[getRandomInt(colorList.length)]
btnTabCompany.style.backgroundColor += colorList[getRandomInt(colorList.length)]

let gameMenuPlayer = document.querySelector(".game__menu_player")
let gameMenuCompany = document.querySelector(".game__menu_company")

function createGameMenu() {

    createGameObject()
    createGameView()
    turn++
    nextActionTurn()

    document.querySelector(".turn_btn").style.animation = "none"
    document.querySelector(".view_player_1").style.display = "flex"

    const numPlayers = playerList.length;
    const numCompanies = companyList.length;

    for (let i = 0; i < numPlayers; i++) {
        const liElement = document.createElement('li');
        const textNode = document.createTextNode(playerList[i]);
        liElement.style.backgroundColor = colorList[i];
        liElement.setAttribute("onclick", "gameMenu('player" + (i + 1) + "')")

        if (numPlayers === 2) {
            liElement.style.width = '50%';
        } else if (numPlayers === 3) {
            liElement.style.width = '33.33%';
        } else if (numPlayers === 4) {
            liElement.style.width = '25%';
        } else if (numPlayers === 5) {
            liElement.style.width = i < 3 ? '33.33%' : '50%';
        } else if (numPlayers === 6) {
            liElement.style.width = '33.33%';
        } else if (numPlayers === 7) {
            liElement.style.width = i < 4 ? '25%' : '33.33%';
        } else if (numPlayers === 8) {
            liElement.style.width = '25%';
        } else {
            liElement.style.width = 100 / numPlayers + '%';
        }

        liElement.appendChild(textNode);
        gameMenuPlayer.appendChild(liElement);
    }

    for (let i = 0; i < numCompanies; i++) {
        const liElement = document.createElement('li');
        const textNode = document.createTextNode(companyList[i]);
        liElement.style.backgroundColor = colorList[getRandomInt(colorList.length)];
        liElement.setAttribute("onclick", "gameMenu('company" + (i + 1) + "')")

        if (numCompanies === 1) {
            liElement.style.width = '100%';
        } else if (numCompanies === 2) {
            liElement.style.width = '50%';
        } else if (numCompanies === 3) {
            liElement.style.width = i === 2 ? '100%' : '50%';
        } else {
            liElement.style.width = '50%';
        }

        liElement.appendChild(textNode);
        gameMenuCompany.appendChild(liElement);
    }
}

btnTabPlayer.addEventListener("click", () => {
    gameMenuPlayer.style.display = "flex"
    gameMenuCompany.style.display = "none"
})

btnTabCompany.addEventListener("click", () => {
    gameMenuPlayer.style.display = "none"
    gameMenuCompany.style.display = "flex"
})

// Game View

function generateCompanyValue(input) {
    const minValue = 2 * input;
    const maxValue = 10 * input;
    const valueIncrement = input / 5;

    const numberOfSteps = Math.floor((maxValue - minValue) / valueIncrement) + 1;
    const index = Math.floor(Math.random() * numberOfSteps);

    return minValue + index * valueIncrement;
}

function createGameObject() {
    companyList.forEach(e => {
        let company = new Entreprise(e, generateCompanyValue(maxBanknoteValue), 0)
        companyListObject.push(company)
    })

    playerList.forEach(e => {
        let stocks = []
        companyList.forEach(e => {
            let stock = new Stocks(e, 0)
            stocks.push(stock)
        })
        let player = new Player(e, 0, stocks)
        playerListObject.push(player)
    })

    minBanknoteValue = Math.round(maxBanknoteValue / 500)
}

function createGameView() {
    const gameViewPlayer = document.querySelector(".game__view_player")

    gameViewPlayer.innerHTML = ""

    playerListObject.forEach(e => {
        let view = document.createElement("div")
        let playerNumber = playerListObject.indexOf(e) + 1
        let stockNumber = 0
        view.classList.add("view_player_" + (playerListObject.indexOf(e) + 1))
        view.style.display = "none"
        view.innerHTML = `
            <h2>${e.name}</h2>
            <h3>Savings : <span class="saving_player_${playerListObject.indexOf(e) + 1}">${e.savings}€</span></h3>
            <div class="stocks_player_${playerListObject.indexOf(e) + 1}">
                <h3>Stocks</h3>
                ${e.stocks.map(e => {
                    stockNumber += 1
                    return `
                        <div class="stock">
                            <p>${e.name} : </p>
                            <p class="player_${playerNumber}_stock_${stockNumber}">${e.quantity}</p>
                        </div>
                        `
                }).join("")}
            </div>
        `
        gameViewPlayer.appendChild(view)
    })

    const gameViewCompany = document.querySelector(".game__view_company")

    gameViewCompany.innerHTML = ""

    companyListObject.forEach(e => {
        let company = document.createElement("div")
        company.classList.add("view_company_" + (companyListObject.indexOf(e) + 1))
        company.style.display = "none"
        company.innerHTML = `
            <h2>${e.name}</h2>
            <h3>Start value : <span>${e.startCapital}€</span></h3>
            <h3>Capital : <span>${e.capital}€</span></h3>
            <h3>Stock(s) sold : <span>${e.sold}</span></h3>
            <div class="company_grid">
                <div class="turn legend">Turn</div>
                <div class="turn turn_-2">${validTurn(turn - 2)}</div>
                <div class="turn turn_-1">${validTurn(turn - 1)}</div>
                <div class="turn turn_actual">${validTurn(turn)}</div>
                <div class="value legend">Value</div>
                <div class="value value_-2">${validValue(e.value[turn - 2])}</div>
                <div class="value value_-1">${validValue(e.value[turn - 1])}</div>
                <div class="value value_actual">${validValue(e.value[turn])}</div>
            </div>
        `
        gameViewCompany.appendChild(company)
    })
}

function validTurn(turn) {
    if (turn < 0) {
        return ""
    }
    return turn
}

function validValue(value) {
    if (value === undefined) {
        return ""
    }
    return value + "€"
}

function gameMenu(tab) {
    let numPlayers = playerList.length
    let numCompanies = companyList.length

    const selectors = {};

    for (let i = 1; i <= numPlayers; i++) {
        selectors[`player${i}`] = `.view_player_${i}`;
    }

    for (let i = 1; i <= numCompanies; i++) {
        selectors[`company${i}`] = `.view_company_${i}`;
    }

    for (const selector in selectors) {
        const element = document.querySelector(selectors[selector])
        if (selector === tab) {
            element.style.display = "flex"
        } else {
            element.style.display = "none"
        }
    }
}

let actionBtn = document.querySelector(".action_btn")
let turnPopup = document.querySelector(".turn__popup")
let turnDisplay = document.querySelector(".turn__display")
let closeAction = document.querySelector(".close_action")

actionBtn.addEventListener("click", () => {
    turnPopup.style.transform = "translateX(100%)"
})

closeAction.addEventListener("click", () => {
    turnPopup.style.transform = "translateX(0%)"
})

turnPopup.addEventListener("click", e => {
    e.preventDefault()
    closeAction.click()
})

turnDisplay.addEventListener("click", e => {
    e.stopPropagation()
})

function createTurnGameView(viewType) {
    let stocksEarning = document.querySelector(".stocks_earning")
    let savingsEarning = document.querySelector(".savings_earning")

    switch (viewType) {
        case "stocks":
            stocksEarning.style.display = "block"
            savingsEarning.style.display = "none"
            calculStocks()
            break;
        case "savings":
            stocksEarning.style.display = "none"
            savingsEarning.style.display = "block"
            savingsEarning.style.borderTop = "none"
            calculSavings()
            break;
        case "stocksAndSavings":
            stocksEarning.style.display = "block"
            savingsEarning.style.display = "block"
            savingsEarning.style.borderTop = "black solid 4px"
            calculStocks()
            calculSavings()
            break;
    }
}

function calculStocks() {
    let stocksEarningList = document.querySelector(".stocks_earning_list")
    stocksEarningList.innerHTML = ""

    playerListObject.forEach(e => {
        let totalEarning = 0
        let companyNumber = 0

        e.stocks.forEach(e => {
            totalEarning += e.quantity * companyListObject[companyNumber].capital / 40
            companyNumber += 1
        })

        totalEarning = Math.round(totalEarning / minBanknoteValue) * minBanknoteValue

        stocksEarningList.innerHTML += `
            <p>${e.name} : ${totalEarning}€</p>
        `
    })
}

function calculSavings() {
    let savingsEarningList = document.querySelector(".savings_earning_list")
    savingsEarningList.innerHTML = ""

    playerListObject.forEach(e => {
        let totalEarning = Math.round(e.savings * 0.15 / minBanknoteValue) * minBanknoteValue

        savingsEarningList.innerHTML += `
            <p>${e.name} : ${totalEarning}€</p>
        `
    })
}

let tempSavingValue = 0
let tempInvestmentValue = []

function createPlayerTurnView(playerObject) {
    document.querySelector(".turn__player_name").innerHTML = playerObject.name
    document.querySelector(".max_savings_value").innerHTML = maxBanknoteValue * 5

    document.querySelector(".savings_player_current_value").innerHTML = playerObject.savings + "€"
    document.querySelector(".savings_player_add_value").innerHTML = "+0€"
    document.querySelector(".savings_player_add_value").style.color = "black"
    document.querySelector(".savings_player_final_value").innerHTML = playerObject.savings + "€"

    document.querySelector(".summary_savings_value").innerHTML = "0€"
    document.querySelector(".summary_savings_value").style.color = "black"
    document.querySelector(".summary_invest_value").innerHTML = "0€"
    document.querySelector(".summary_invest_value").style.color = "black"
    document.querySelector(".summary_total").innerHTML = "0€"
    document.querySelector(".summary_total").style.color = "black"

    tempSavingValue = 0

    updateSavingBtn(playerObject.savings)

    let stocksListPlayer = document.querySelector(".stocks_list_player")
    stocksListPlayer.innerHTML = ""

    tempInvestmentValue = []

    companyListObject.forEach((e, index) => {
        tempInvestmentValue.push(0)
        stocksListPlayer.innerHTML += `
            <div class="stocks_to_invest">
                <p class="stocks_invest_company_${index}">${e.name} (${playerObject.stocks[index].quantity}/${e.sold})</p>
                <div>
                    <input type="button" value="+" class="btn_input_invest_add invest_add_${index}" onclick="updateInvestPlayer('${playerObject.name}', ${index}, 'add')">
                    <input type="button" value="-" class="btn_input_invest_remove invest_remove_${index}" onclick="updateInvestPlayer('${playerObject.name}', ${index}, 'remove')">
                </div>
            </div>
        `
    })

    updateBtnInvest(playerObject, tempInvestmentValue)
}

function addOrRemoveSavings(value) {
    let savings = playerListObject[actionInTurn].savings + tempSavingValue
    switch (value) {
        case 1:
            if (savings > maxBanknoteValue * 5 - maxBanknoteValue / 50) return
            tempSavingValue += maxBanknoteValue / 50
            updateSavingValue(playerListObject[actionInTurn], tempSavingValue)
            break
        case 2:
            if (savings > maxBanknoteValue * 5 - maxBanknoteValue / 5) return
            tempSavingValue += maxBanknoteValue / 5
            updateSavingValue(playerListObject[actionInTurn], tempSavingValue)
            break
        case -1:
            if (savings < maxBanknoteValue / 50) return
            tempSavingValue -= maxBanknoteValue / 50
            updateSavingValue(playerListObject[actionInTurn], tempSavingValue)
            break
        case -2:
            if (savings < maxBanknoteValue / 5) return
            tempSavingValue -= maxBanknoteValue / 5
            updateSavingValue(playerListObject[actionInTurn], tempSavingValue)
            break
    }
}

function updateSavingValue(playerObject, value) {
    let savingsPlayerAddValue = document.querySelector(".savings_player_add_value")
    savingsPlayerAddValue.style.color = (value > 0) ? "green" : "red";
    savingsPlayerAddValue.innerHTML = `${(value > 0) ? "+" : "-"}${Math.abs(value)}€`;

    let savingsPlayerFinalValue = document.querySelector(".savings_player_final_value")
    savingsPlayerFinalValue.innerHTML = playerObject.savings + value + "€"

    let summarySavingsValue = document.querySelector(".summary_savings_value")
    if (value > 0) {
        summarySavingsValue.innerHTML = value + "€"
        summarySavingsValue.style.color = "green"
    } else {
        summarySavingsValue.innerHTML = value + "€"
        summarySavingsValue.style.color = "red";
    }

    updateSavingBtn(playerObject.savings + value)
    updateSummaryTotalValue(tempSavingValue, tempInvestmentValue)
}

function updateSavingBtn(value) {
    let classBtnSavings = ["add_1", "add_2", "remove_1", "remove_2"]
    classBtnSavings.forEach((className, index) => {
        switch (index) {
            case 0:
                if (value > maxBanknoteValue * 5 - maxBanknoteValue / 50) {
                    document.querySelector("." + className).style.backgroundColor = "grey"
                } else {
                    document.querySelector("." + className).style.backgroundColor = "green"
                }
                break;
            case 1:
                if (value > maxBanknoteValue * 5 - maxBanknoteValue / 5) {
                    document.querySelector("." + className).style.backgroundColor = "grey"
                } else {
                    document.querySelector("." + className).style.backgroundColor = "green"
                }
                break;
            case 2:
                if (value < maxBanknoteValue / 50) {
                    document.querySelector("." + className).style.backgroundColor = "grey"
                } else {
                    document.querySelector("." + className).style.backgroundColor = "red"
                }
                break;
            case 3:
                if (value < maxBanknoteValue / 5) {
                    document.querySelector("." + className).style.backgroundColor = "grey"
                } else {
                    document.querySelector("." + className).style.backgroundColor = "red"
                }
                break;
        }
    })
}

function updateInvestPlayer(player, compId, type) {
    for (let i = 0; i < playerListObject.length; i++) {
        if (playerListObject[i].name === player) {
            if (type === "add") {
                if (companyListObject[compId].sold + tempInvestmentValue[compId] < 10) {
                    tempInvestmentValue[compId] += 1
                    document.querySelector(".stocks_invest_company_" + compId).innerHTML = `${companyListObject[compId].name} (${playerListObject[i].stocks[compId].quantity + tempInvestmentValue[compId]}/${companyListObject[compId].sold + tempInvestmentValue[compId]})`
                }
            }
            if (type === "remove") {
                if (playerListObject[i].stocks[compId].quantity + tempInvestmentValue[compId] > 0) {
                    tempInvestmentValue[compId] -= 1
                    document.querySelector(".stocks_invest_company_" + compId).innerHTML = `${companyListObject[compId].name} (${playerListObject[i].stocks[compId].quantity + tempInvestmentValue[compId]}/${companyListObject[compId].sold + tempInvestmentValue[compId]})`
                }
            }

            let summaryInvestValue = document.querySelector(".summary_invest_value")
            let totalInvestValue = 0
            for (let i = 0; i < tempInvestmentValue.length; i++) {
                totalInvestValue += tempInvestmentValue[i] * Math.round((companyListObject[i].capital / 10) / minBanknoteValue ) * minBanknoteValue
            }
            if (totalInvestValue > 0) {
                summaryInvestValue.innerHTML = totalInvestValue + "€"
                summaryInvestValue.style.color = "green"
            } else {
                summaryInvestValue.innerHTML = totalInvestValue + "€"
                summaryInvestValue.style.color = "red"
            }

            updateBtnInvest(playerListObject[i], tempInvestmentValue)
            updateSummaryTotalValue(tempSavingValue, tempInvestmentValue)
        }
    }
}

function updateBtnInvest(playerObject, tempInvestmentValue) {
    for (let i = 0; i < companyListObject.length; i++) {
        if (companyListObject[i].sold + tempInvestmentValue[i] < 10) {
            document.querySelector(".invest_add_" + i).style.backgroundColor = "green"
        }
        if (playerObject.stocks[i].quantity + tempInvestmentValue[i] > 0) {
            document.querySelector(".invest_remove_" + i).style.backgroundColor = "red"
        }
        if (companyListObject[i].sold + tempInvestmentValue[i] === 10) {
            document.querySelector(".invest_add_" + i).style.backgroundColor = "grey"
        }
        if (playerObject.stocks[i].quantity + tempInvestmentValue[i] === 0) {
            document.querySelector(".invest_remove_" + i).style.backgroundColor = "grey"
        }
    }
}

function updateSummaryTotalValue(tempSavingValue, tempInvestmentValue) {
    let summaryTotal = document.querySelector(".summary_total")
    let totalValue = 0
    for (let i = 0; i < tempInvestmentValue.length; i++) {
        totalValue += tempInvestmentValue[i] * Math.round((companyListObject[i].capital / 10) / minBanknoteValue ) * minBanknoteValue
    }
    totalValue += tempSavingValue
    summaryTotal.innerHTML = totalValue + "€"

    if (totalValue > 0) {
        summaryTotal.style.color = "green"
    } else {
        summaryTotal.style.color = "red"
    }
}

function createCompanyTurnView(companyObject) {
    document.querySelector(".turn__company_name").innerHTML = companyObject.name
    document.querySelector(".company_result").innerHTML = ""
    document.querySelector(".company_result").style.backgroundImage = "none"

    let companySold = companyObject.sold
    let min = 0
    let max = 0

    switch (true) {
        case companySold >= 0 && companySold < 4:
            min = -5
            max = 10
            break
        case companySold >= 4 && companySold < 7:
            min = -10
            max = 20
            break
        case companySold >= 7 && companySold <= 10:
            min = -15
            max = 30
            break
    }

    for (let i = 1; i <= 12; i++) {
        let percentage = generateRandomNumber(min, max)
        let className = document.querySelector(".grid_" + i)
        className.innerHTML = percentage
        if (percentage > 0) {
            className.style.color = "green"
            className.style.border = "2px solid green"
            className.style.backgroundColor = "rgb(188, 212, 170)"

        } else {
            className.style.color = "red"
            className.style.border = "2px solid red"
            className.style.backgroundColor = "rgb(247, 158, 158)"
        }
    }
}

let gridMiddle = document.querySelector(".grid_middle")
let roll = false

gridMiddle.addEventListener("click", function () {
    if (roll === false) {
        roll = true

        companyWheel()
        setTimeout(() => {
            gridMiddle.style.backgroundColor = "hsl(94, 33%, 45%)"
        }, 50)
        setTimeout(() => {
            gridMiddle.style.backgroundColor = "hsl(94, 33%, 75%)"
        }, 400)
    }
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function companyWheel() {
    let move = 24 + generateRandomNumber(0, 12)
    let i = 1
    let p = 0
    let a = 0
    while(move > 0) {
        if (i === 13) {
            i = 1
        }
        a = i
        p = i - 1
        if (i === 1) {
            p = 12
            a = 1
        }
        let caseP = document.querySelector(".grid_" + p)
        let caseA = document.querySelector(".grid_" + a)
        if (caseP.innerHTML > 0) {
            caseP.style.backgroundColor = "hsl(94, 33%, 75%)"
        } else {
            caseP.style.backgroundColor = "hsl(0, 85%, 85%)"
        }
        if (caseA.innerHTML > 0) {
            caseA.style.backgroundColor = "hsl(94, 33%, 45%)"
        } else {
            caseA.style.backgroundColor = "hsl(0, 85%, 70%)"
        }
        
        let companyResult = document.querySelector(".company_result")
        if (move === 1) {
            let opacity = 0
            if (caseA.innerHTML > 0) {
                companyResult.style.backgroundImage = "url('img/stonks.webp')"
            } else {
                companyResult.style.backgroundImage = "url('img/not-stonks.webp')"
            }
            for (let i = 0; i < 100; i++) {
                opacity += 0.01
                companyResult.style.opacity = opacity
                await sleep(4)
            }
            for (let i = 0; i < companyListObject.length; i++) {
                if (companyListObject[i].name === document.querySelector(".turn__company_name").innerHTML) {
                    companyResult.innerHTML += `<p>${companyListObject[i].capital}€</p>`
                    await sleep(200)
                    if (caseA.innerHTML > 0) {
                        companyResult.innerHTML += `<img src="img/arrow-green.webp" alt="+" style="background-color: hsl(94, 33%, 75%);">`
                        await sleep(200)
                        companyResult.innerHTML += `<p style="background-color: hsl(94, 33%, 75%); color: green;">${calculateCompanyNewCapital(companyListObject[i].capital, caseA.innerHTML)}€</p>`
                    } else {
                        companyResult.innerHTML += `<img src="img/arrow-red.webp" alt="-" style="background-color: hsl(0, 85%, 85%);">`
                        await sleep(200)
                        companyResult.innerHTML += `<p style="background-color: hsl(0, 85%, 85%); color: red;">${calculateCompanyNewCapital(companyListObject[i].capital, caseA.innerHTML)}€</p>`
                    }
                }
            }
        }
        await sleep(50 + ((1 / move * 10) * 100))
        i++
        move--
    }
}

let newCapital = 0

function calculateCompanyNewCapital(capital, percentage) {
    if (percentage == 0) return capital
    newCapital = Math.round(Math.round(capital * (1 + (parseInt(percentage) / 100))) / minBanknoteValue) * minBanknoteValue
    if (newCapital > companyListObject[actionInTurn - playerListObject.length].capitalMax) newCapital = companyListObject[actionInTurn - playerListObject.length].capitalMax
    return newCapital
}

// Game turn functions

let actionInTurn = -1
let confirmationTurn = true
let specialTurn = false
let skipTurnSpecial= 1

function nextActionTurn() {
    if (skipTurnSpecial=== 1) {
        if (confirmationTurn === false) {
            return
        }
    }
    skipTurnSpecial= 1
    document.querySelector(".action_btn").style.animation = "glow 1s ease-in-out infinite alternate"
    document.querySelector(".turn_btn").style.animation = "none"

    confirmationTurn = false
    actionInTurn++

    if (actionInTurn >= 0 && actionInTurn < playerListObject.length) {
        createPlayerTurnView(playerListObject[actionInTurn])
        document.querySelector(".turn__finish").style.display = "none"
        document.querySelector(".turn__player").style.display = "block"
    }

    if (actionInTurn >= playerListObject.length && actionInTurn < playerListObject.length + companyListObject.length) {
        createCompanyTurnView(companyListObject[actionInTurn - playerListObject.length])
        roll = false
        document.querySelector(".turn__finish").style.display = "none"
        document.querySelector(".turn__company").style.display = "flex"
    }

    if (specialTurn === true) {
        specialTurn = false
        //test if special turn
        if ((turn % 2 === 0 && turn !== 0) || (turn % 3 === 0 && turn !== 0)) {
            if (turn % 2 === 0 && turn !== 0) {
                createTurnGameView("savings")
                document.querySelector(".turn__finish").style.display = "none"
                document.querySelector(".turn__game").style.display = "flex"
            }
            if (turn % 3 === 0 && turn !== 0) {
                createTurnGameView("stocks")
                document.querySelector(".turn__finish").style.display = "none"
                document.querySelector(".turn__game").style.display = "flex"
            }
            if (turn % 6 === 0 && turn !== 0) {
                createTurnGameView("stocksAndSavings")
                document.querySelector(".turn__finish").style.display = "none"
                document.querySelector(".turn__game").style.display = "flex"
            }
            actionInTurn = -1
            turn++
        } else {
            actionInTurn = -1
            turn++
            skipTurnSpecial++
            return nextActionTurn()
        }
    }
}

function turnConfirmation() {
    if (actionInTurn === playerListObject.length + companyListObject.length - 1) {
        //end turn
        specialTurn = true
    }

    if (actionInTurn >= 0 && actionInTurn < playerListObject.length) {
        document.querySelector(".turn__finish").style.display = "flex"
        document.querySelector(".turn__player").style.display = "none"
        updateData("player")
        document.querySelector(".action_btn").style.animation = "none"
        document.querySelector(".turn_btn").style.animation = "glow 1s ease-in-out infinite alternate"
    }

    if (actionInTurn >= playerListObject.length && actionInTurn < playerListObject.length + companyListObject.length) {
        if (roll === false) {
            return
        }
        document.querySelector(".turn__finish").style.display = "flex"
        document.querySelector(".turn__company").style.display = "none"
        updateData("company")
        document.querySelector(".action_btn").style.animation = "none"
        document.querySelector(".turn_btn").style.animation = "glow 1s ease-in-out infinite alternate"
    }

    if (actionInTurn === -1) {
        //test if special turn
        document.querySelector(".turn__finish").style.display = "flex"
        document.querySelector(".turn__game").style.display = "none"
        document.querySelector(".action_btn").style.animation = "none"
        document.querySelector(".turn_btn").style.animation = "glow 1s ease-in-out infinite alternate"
    }
    confirmationTurn = true
    createGameView()

    let toDisplay = ""
    if (actionInTurn >= 0 && actionInTurn < playerListObject.length) {
        toDisplay = `player${actionInTurn + 2}`
    }
    if (actionInTurn >= playerListObject.length - 1 && actionInTurn < playerListObject.length + companyListObject.length - 1) {
        toDisplay = `company${actionInTurn - playerListObject.length + 2}`
    }
    if (actionInTurn === playerListObject.length + companyListObject.length - 1 || actionInTurn === -1) {
        toDisplay = "player1"
    }
    gameMenu(toDisplay)
}

function updateData(type) {
    switch(type) {
        case "player":
            playerListObject[actionInTurn].savings += tempSavingValue
            for (let i = 0; i < tempInvestmentValue.length; i++) {
                playerListObject[actionInTurn].stocks[i].quantity += tempInvestmentValue[i]
                companyListObject[i].sold += tempInvestmentValue[i]
            }
            break
        case "company":
            companyListObject[actionInTurn - playerListObject.length].capital = newCapital
            companyListObject[actionInTurn - playerListObject.length].value.push(newCapital)
            break
    }    
}
