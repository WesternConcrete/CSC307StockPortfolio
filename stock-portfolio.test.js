const StockPortfolio = require('./stock-portfolio');
const { ShareSaleException } = require('./stock-portfolio');

//2.1
test('Create an empty portfolio', () => {
  const portfolio = new StockPortfolio();
  expect(portfolio.stocks).toEqual({});
})

//2.2 
test('Test for an empty portfolio', () => {
    const portfolio = new StockPortfolio();
    expect(portfolio.isEmpty()).toBe(true);
  })

//2.3
test('Count unique ticker symbols', () => {
    const portfolio = new StockPortfolio({ GME: 5, RBLX: 10 });
    expect(portfolio.tickerCount()).toBe(2);
});

//2.4
test('Purchase shares of a stock', () => {
    const portfolio = new StockPortfolio();
    portfolio.purchase('AAPL', 5);
    expect(portfolio.stocks['AAPL']).toBe(5);
});

//2.5
test('Sell shares of a stock', () => {
    const portfolio = new StockPortfolio({ AAPL: 10 });
    portfolio.sell('AAPL', 5);
    expect(portfolio.stocks['AAPL']).toBe(5);
  });

//2.6
test('Get the number of shares for a given symbol', () => {
    const portfolio = new StockPortfolio({ AAPL: 10 });
    expect(portfolio.getShares('AAPL')).toBe(10);
  });
  
//2.7
  test('Keep only owned symbols in the portfolio', () => {
    const portfolio = new StockPortfolio({ AAPL: 10, MSFT: 0 });
    expect(portfolio.stocks).toEqual({ AAPL: 10 });
  });

//2.8
  test('Raise an exception when selling too many shares', () => {
    const portfolio = new StockPortfolio({ AAPL: 5 });
    expect(() => portfolio.sell('AAPL', 10)).toThrow(ShareSaleException);
  });