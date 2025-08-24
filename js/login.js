
import { Bank  } from "./Database.js"
import {returnElementById, saveData} from './utils.js'

let mobileInput = returnElementById('mobile')
let pinInput = returnElementById('pin')
let loginForm = returnElementById('login-form')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let mobile = mobileInput.value
    let pin = pinInput.value

    let result = Bank.login(mobile, pin)
    if (result) {
        saveData('user', result)
        window.location.href = '/main.html'
    } else {
        alert('Invalid Credentail')
    }
})

