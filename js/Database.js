import { getSavedData, saveData } from "./utils.js";


let savedUserInfo =  getSavedData('database')

let BankDatabase = {}

let Bank = {
    createAccount: (id, name, mobile, pin, initialDeposit) => {
        BankDatabase[id] = {
            id,
            name,
            pin,
            mobile,
            balance: Number(initialDeposit),
            deposite: function (amount, transectionType = 'self', pin) {
                switch (transectionType) {
                    case 'bank-transfer':
                        this.balance += amount
                        break;
                    case 'self' || undefined:
                        pin == this.pin ? this.balance += amount : alert('wrong pin ')
                }
            },
            withdraw: function (amount, transectionType = 'self', pin) {
                switch (transectionType) {
                    case 'bank-transfer':
                        this.balance -= Number(amount)
                        break;
                    case 'self' || undefined:
                        pin == this.pin ? this.balance -= amount : alert('wrong pin ')
                }
            }
        }
    },

    transferMoney: (from, to, amount, pin) => {
        let sender = BankDatabase[from];
        let receiver = BankDatabase[to]

        let loggedInUserId = getSavedData('user').id
        if (receiver.id == loggedInUserId) {
            alert('batpari to valoi jano!')
        }
        console.log(loggedInUserId);
        if (sender.pin == pin) {
            sender.withdraw(amount, 'bank-transfer')
            receiver.deposite(amount, 'bank-transfer')
        } else {
            alert('Invalid pin')
        }
    },

    login: (mobile, pin) => {
        let validUser;
        for (const id in BankDatabase) {
            let account = BankDatabase[id]
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


if (!savedUserInfo) {
    for (const key in savedUserInfo) {
        let user = savedUserInfo[key]
        Bank.createAccount(user.id, user.name, user.mobile, user.pin, user.balance)
    }
} else {
    Bank.createAccount('101', 'Alice', '12345678', '1234', 5000);
    Bank.createAccount('102', 'Bob', '87654321', '5678', 3000);
    saveData('database', BankDatabase)
}


console.log(BankDatabase , savedUserInfo);


export { Bank, BankDatabase }