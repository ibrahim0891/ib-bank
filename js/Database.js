import { getSavedData, saveData } from "./utils.js";


let savedUserInfo = getSavedData('database') || {}

let BankDatabase = {}

let Bank = {
    createAccount: (id, name, mobile, pin, initialDeposit) => {
        BankDatabase[id] = {
            id,
            name,
            pin,
            mobile,
            balance: Number(initialDeposit),
            transectionHistory: savedUserInfo[id] == undefined ? [] : savedUserInfo[id].transectionHistory , 
            deposite: function (amount, transectionType = 'self', pin) {
                switch (transectionType) {
                    case 'bank-transfer':
                        this.balance += amount
                        break;
                    case 'self' || undefined:
                        if (pin == this.pin) {
                            this.balance += amount;
                            let diposit = {
                                name: `Add money to account`,
                                time: new Date().toLocaleString(),
                                amount
                            }
                            this.transectionHistory.unshift(diposit) //feeling lazy to fix spelling
                        } else {
                            alert('wrong pin ');
                        }
                }
            },
            withdraw: function (amount, transectionType = 'self', pin) {
                switch (transectionType) {
                    case 'bank-transfer':
                        if (this.balance - amount > -1) {
                            this.balance -= amount;
                        } else {
                            alert('taka nai');
                        }
                        break;
                    case 'self' || undefined:
                        if (pin == this.pin) {
                            if (this.balance - amount > -1) {
                                this.balance -= amount;
                                let withdraw = {
                                    name: `Cash out`,
                                    time: new Date().toLocaleString(),
                                    amount
                                }
                                this.transectionHistory.unshift(withdraw) //feeling lazy to fix spelling
                            } else {
                                alert('taka nai');
                            }
                        } else {
                            alert('wrong pin ');
                        }
                }
            },
        }
    },

    transferMoney: (from, to, amount, pin) => { 
        let sender = BankDatabase[from];
        let receiver = BankDatabase[to]

        let loggedInUserId = getSavedData('user').id

        let senderRecord = {
            name: 'Sent money to ' + receiver.name,
            time: new Date().toLocaleString(),
            amount
        }
        let receiverRecord = {
            name: 'Received Money from ' + sender.name,
            time: new Date().toLocaleString(),
            amount,
        }


        sender.transectionHistory.unshift(senderRecord)
        receiver.transectionHistory.unshift(receiverRecord)

        
        if (receiver.id == loggedInUserId) {
            alert('batpari to valoi jano!')
        }
        
        if (sender.pin == pin) {
            sender.withdraw(amount, 'bank-transfer')
            receiver.deposite(amount, 'bank-transfer')
        } else {
            alert('Invalid pin')
        }
 
        saveData('database', BankDatabase)
    },

    login: (mobile, pin) => {
        let validUser;
        for (const id in BankDatabase) {
            let account = savedUserInfo[id]
            if (account.mobile == mobile && account.pin == pin) {
                validUser = { ...account, pin: null }
                break;
            }
        }
        return validUser;
    },
    getAccountById: function (id) {
        let user;
        for (const id in BankDatabase) {
            let account = BankDatabase[id]
            if (account.id == id) {
                user = { ...account, pin: null }
                break;
            }
        }
        return user;
    }
}


if (Object.keys(savedUserInfo).length != 0) {
    //jehetu amader kichu info saved ache ,sehetu amra segula use kore runtime e bankaccout create korte pari 
    //jekhane amader withdraw() deposite() method gula access kora jabe
    //eta kora lagteche because localstorage e only string rakha jay, function rakha jay na . 
    for (const key in savedUserInfo) {
        let user = savedUserInfo[key]
        Bank.createAccount(user.id, user.name, user.mobile, user.pin, user.balance , user.transectionHistory)
    }
} else {
    //localstrogae jehutu ekebare empty tai amra default information diye account khule dicchi
    Bank.createAccount('101', 'Ibrahim', '12345678', '1234', 1000);
    Bank.createAccount('102', 'Nabil', '87654321', '5678', 1000);
    saveData('database', BankDatabase)
}




export { Bank, BankDatabase }