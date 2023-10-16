export default class Portfolio {
    constructor() {
        this.account = new Map();
    }

    //2.1
    //returns account
    getPortfolio(){
        return this.account;
    }

    //2.2
    //checks if size of portfolio is zero
    isEmpty() {
        return this.account.size == 0;
    }

    //2.3
    //returns num of unique stock tickers
    uniqueTicker() {
        return this.account.size;
    }

    //2.4
    //adds stock and quantity to portfolio
    buy(name, amount) {
        //stock already exists in portfolio (just adding shares)
        if (this.account.has(name)) {
            this.account.set(name, this.account.get(name) + amount);
        } 
        //adding new stock to portfolio
        else {
            this.account.set(name, amount);
        }
    }

    //2.5
    //sells stock by quantity amount
    sell(name, amount) {
        //if the stock is not already owned
        if (this.account.has(name) != true) {
            throw new Error("You do not own this stock");
        }
        //if the amount of shares is more than currently own
        else if (amount > this.account.get(name)) {
            throw new Error("ShareSaleException");
        }
        else {
            //limit sell
            this.account.set(name, this.account.get(name) - amount);
            
            //2.7
            //we can remove ticker if the quantity is zero
            if (this.account.get(name) == 0) {
                this.account.delete(name);
            }
        }
    }

    //2.6
    //Returns quantity or number of shares owned of given stock
    shareAmount(name) {
        //check to see if stock is owned
        if (this.account.has(name) == false) {
            return 0;
        }
        else {
            return this.account.get(name);
        }
    }

}