


import {getSavedData , returnElementById, saveData} from './utils.js'
import { Bank, BankDatabase } from './Database.js';

let user = getSavedData('user')

if(!user){
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
    user.deposite(amountToAdd  , 'self' , addMoneyPin )
    displayBalance.innerText = user['balance']

    saveData('database',BankDatabase)
})


let cashOutButton = returnElementById('cash-out-button')
cashOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    let amountToOut = Number(returnElementById('cash-out-amount').value)
    let cashOutPin = returnElementById('cash-out-pin').value
    let user = BankDatabase[userId]
    user.withdraw(amountToOut , 'self' , cashOutPin)
    displayBalance.innerText = user['balance']

    saveData('database',BankDatabase)
})


//transfer 
let transferButton = returnElementById('transfer-button')

transferButton.addEventListener('click', (e) => {
    e.preventDefault();
    let receiverId = returnElementById('receiver-id').value
    let amountToTransfer = Number(returnElementById('transfer-amount').value)
    let transferPin = returnElementById('transfer-pin').value
    Bank.transferMoney(user.id , receiverId , amountToTransfer , transferPin)
    
    displayBalance.innerText = BankDatabase[userId].balance
     
    saveData('database',BankDatabase)
})


//get bonux 

let couponButton = returnElementById('coupon-button')
couponButton.addEventListener('click', (e) => {
    e.preventDefault();
    let couponNumber = returnElementById('coupon-number').value
    let couponGift  = 100
    let user = BankDatabase[userId]
    couponNumber == COUPON_NUMBER && couponUsed == false ? user.deposite(couponGift, 'bank-transfer') : alert('Ek bonus koybar nibi vai! Eto lov ken?')
    couponUsed = true  
    displayBalance.innerText = user['balance']
    saveData('database',BankDatabase)
})