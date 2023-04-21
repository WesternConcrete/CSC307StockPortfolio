class ShareSaleException extends Error {
    constructor(message) {
      super(message);
      this.name = 'ShareSaleException';
    }
  }

class StockPortfolio {
    constructor(initialStocks = {}) {
        this.stocks = {};
    
        for (const symbol in initialStocks) {
          if (initialStocks[symbol] > 0) {
            this.stocks[symbol] = initialStocks[symbol];
          }
        }
    }
  
    isEmpty() {
        return Object.keys(this.stocks).length === 0;
    }

    tickerCount() {
        return Object.keys(this.stocks).length;
    }

    purchase(symbol, shares) {
        if(shares > 0) {
            if (this.stocks[symbol]) {
                this.stocks[symbol] += shares;
            } else {
                this.stocks[symbol] = shares;
            }
        }
    }

    sell(symbol, shares) {
        if (this.stocks[symbol]) {
            if (this.stocks[symbol] < shares) {
              throw new ShareSaleException('Not enough shares to sell.');
            }
            this.stocks[symbol] -= shares;
      
            if (this.stocks[symbol] === 0) {
              delete this.stocks[symbol];
            }
          }
      }

    getShares(symbol) {
        return this.stocks[symbol] || 0;
    }      
}

module.exports = StockPortfolio
module.exports.ShareSaleException = ShareSaleException;
