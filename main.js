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

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

let colorList = ['#864C39','#bde0f4','#C63883','#de911b','#DB2428','#FFF004','#60ad5b','#0067A4']
let playerList = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8"]
let companyList = ["Company 1", "Company 2", "Company 3", "Company 4"]

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
    if(playerList.length < 8) {
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
    if(companyList.length < 4) {
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

let maxBanknoteValue = 50000
let minBanknoteValue = Math.round(maxBanknoteValue / 500)

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

    const numPlayers = playerList.length;
    const numCompanies = companyList.length;

    for (let i = 0; i < numPlayers; i++) {
        const liElement = document.createElement('li');
        const textNode = document.createTextNode(playerList[i]);
        liElement.style.backgroundColor = colorList[i];
        liElement.setAttribute("onclick", "gameMenu('player" + (i + 1) +"')")

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
        liElement.setAttribute("onclick", "gameMenu('company" + (i + 1) +"')")

        if (numCompanies === 2) {
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

// to comment
createGameMenu()

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
        let company = new Entreprise(e, generateCompanyValue(50000 /*maxBanknoteValue*/), 0)
        companyListObject.push(company)
    })

    playerList.forEach(e => {
        let stocks = []
        companyList.forEach(e => {
            let stock = new Stocks(e, getRandomInt(4))
            stocks.push(stock)
        })
        let player = new Player(e, 0, stocks)
        playerListObject.push(player)
    })
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

    // let newValue = Math.round((companyListObject[0].value[turn - 1] * 1.1) / 10) * 10
    // companyListObject[0].value.push(newValue)
    // console.log(companyListObject)

    createGameView()
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
            calculSavings()
            break;
        case "stocksAndSavings":
            stocksEarning.style.display = "block"
            savingsEarning.style.display = "block"
            calculStocks()
            calculSavings()
            break;
    }
}

function calculStocks() {
    let stocksEarningList = document.querySelector(".stocks_earning_list")
    stocksEarningList.innerHTML = ""

    playerListObject.forEach(e => {
        console.log(e)
        let totalEarning = 0
        let companyNumer = 0

        e.stocks.forEach(e => {
            totalEarning += e.quantity * companyListObject[companyNumer].value[turn] / 40
            companyNumer += 1
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
        let totalEarning = Math.round(e.savings / minBanknoteValue) * minBanknoteValue
        
        savingsEarningList.innerHTML += `
            <p>${e.name} : ${totalEarning}€</p>
        `
    })
}

let tempSavingValue = 0

function createPlayerTurnView(playerObject) {
    document.querySelector(".turn__player_name").innerHTML = playerObject.name
    document.querySelector(".max_savings_value").innerHTML = maxBanknoteValue * 5

    document.querySelector(".savings_player_current_value").innerHTML = playerObject.savings + "€"

    tempSavingValue = 0

    let classBtnSavings = ["add_1", "add_2", "remove_1", "remove_2"]
    classBtnSavings.forEach((className, index) => {
        document.querySelector("." + className).addEventListener("click", () => {
            let sign = (index < 2) ? 1 : -1
            let amount = (index % 2 === 0) ? maxBanknoteValue / 50 : maxBanknoteValue / 5;
            let savings = playerObject.savings + tempSavingValue
            if (savings + sign * amount < 0 || savings + sign * amount > maxBanknoteValue * 5) {
                return
            }
            tempSavingValue += sign * amount
            updateSavingValue(tempSavingValue)
        })
    })


}

function updateSavingValue(value) {
    let savingsPlayerAddValue = document.querySelector(".savings_player_add_value")
    savingsPlayerAddValue.style.color = (value > 0) ? "green" : "red";
    savingsPlayerAddValue.innerHTML = `${(value > 0) ? "+" : "-"}${Math.abs(value)}€`;

    let savingsPlayerFinalValue = document.querySelector(".savings_player_final_value")
    savingsPlayerFinalValue.innerHTML = playerListObject[0].savings + value + "€"
}

createPlayerTurnView(playerListObject[0])