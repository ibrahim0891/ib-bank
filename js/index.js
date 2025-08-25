


import { getSavedData, returnElementById, saveData } from './utils.js'
import { Bank, BankDatabase } from './Database.js';

let user = getSavedData('user')

if (!user) {
    window.location.href = './login.html'
}

let displayBalance = returnElementById('current-balance')
let showUserInfo = returnElementById('show-user-info')

let userId = user.id
let currentBalance = BankDatabase[userId].balance


displayBalance.textContent = currentBalance
showUserInfo.textContent = `${user.name} - Id: ${user.id}`

let COUPON_NUMBER = '2025'
let couponUsed = false;



let addMoneyButton = returnElementById('add-money-button')
addMoneyButton.addEventListener('click', (e) => {
    e.preventDefault()
    let amountToAdd = Number(returnElementById('amount-to-add').value)
    let addMoneyPin = returnElementById('add-money-pin').value

    let user = BankDatabase[userId]
    user.deposite(amountToAdd, 'self', addMoneyPin)
    displayBalance.innerText = user['balance']
    saveData('database', BankDatabase)
    loadTransection()
})


let cashOutButton = returnElementById('cash-out-button')
cashOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    let amountToOut = Number(returnElementById('cash-out-amount').value)
    let cashOutPin = returnElementById('cash-out-pin').value
    let user = BankDatabase[userId]
    user.withdraw(amountToOut, 'self', cashOutPin)
    displayBalance.innerText = user['balance']
    saveData('database', BankDatabase)
    loadTransection()
})


//transfer 
let transferButton = returnElementById('transfer-button')
let displayTransection = returnElementById('load-transection')

let loadTransection = () => {
    displayTransection.innerHTML = ''
    if (BankDatabase[userId].transectionHistory.length == 0 ) {
        return displayTransection.innerHTML = `<div class='h-full aspect-video w-full flex items-center justify-center text-gray-500'> You have no transections yet! </div>`
    } else {
        BankDatabase[userId].transectionHistory.forEach(element => {
            return displayTransection.innerHTML += `
              <div class="flex flex-col gap-4">
                  <div class="flex items-center justify-start bg-white rounded-lg p-4 gap-4">
                      <img class="w-12 bg-gray-100 p-2 rounded-md" src="./assets/money1.png" alt="">
                      <div>
                          <h3 class='font-bold text-lg'> ${element.name} </h3>
                          <p>
                              <span>
                                  ${element.amount}$ 
                              </span> at 
                              <span> ${element.time} </span>
                          </p>
                      </div>
                  </div>
              </div>
              `
        });
    }

}

loadTransection()

transferButton.addEventListener('click', (e) => {
    e.preventDefault();
    let receiverId = returnElementById('receiver-id').value
    let amountToTransfer = Number(returnElementById('transfer-amount').value)
    let transferPin = returnElementById('transfer-pin').value
    Bank.transferMoney(user.id, receiverId, amountToTransfer, transferPin)

    displayBalance.innerText = BankDatabase[userId].balance
    loadTransection()
})


//get bonux 

let couponButton = returnElementById('coupon-button')
couponButton.addEventListener('click', (e) => {
    e.preventDefault();
    let couponNumber = returnElementById('coupon-number').value
    let couponGift = 100
    let user = BankDatabase[userId]
    if (couponNumber == COUPON_NUMBER && couponUsed == false) {
        user.deposite(couponGift, 'bank-transfer')
        let bonusTransection = {
            name: 'Got coupon bonus',
            time: new Date().toLocaleString(),
            amount: couponGift
        }
        user.transectionHistory.unshift(bonusTransection)
        loadTransection()
    } else {
        alert('Ek bonus koybar nibi vai! Eto lov ken?')
    }

    couponUsed = true
    displayBalance.innerText = user['balance']
    saveData('database', BankDatabase)
})


