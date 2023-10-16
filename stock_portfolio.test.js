import Portfolio from './stock_portfolio';

//2.1
//Testing getPortfolio() function
test('TEST #1: getPortfolio() EMPTY -- success', () => {
  const portfolio = new Portfolio();
  expect(portfolio.getPortfolio()).toEqual(new Map());
});

//2.2
//Testing isEmpty() with nothing added
test('TEST #2: isEmpty() EMPTY -- success', () => {
    const portfolio = new Portfolio();
    expect(portfolio.isEmpty()).toEqual(true)
});

//2.2
//Testing isEmpty() with stock
test('TEST #3: isEmpty() (100 shares : LCID) -- success', () => {
  const portfolio = new Portfolio();
  portfolio.account.set("LCID", 100);
  expect(portfolio.isEmpty()).toEqual(false)
});

//2.3
//Testing uniqueTicker() with nothing added
test('TEST #4: uniqueTicker() EMPTY -- success', () => {
    const portfolio = new Portfolio();
    expect(portfolio.uniqueTicker()).toEqual(0);
});

//2.3
//Testing uniqueTicker() with 5 shares of GME 
test('TEST #5: uniqueTicker() (5 shares : GME) -- success', () => {
    const portfolio = new Portfolio();
    portfolio.account.set("GME", 5);
    expect(portfolio.uniqueTicker()).toEqual(1);
});

//2.3
//Testing uniqueTicker() with GME and RBLX
test('TEST #6: uniqueTicker() (with GME and RBLX) -- success', () => {
  const portfolio = new Portfolio();
  portfolio.account.set("GME", 5);
  portfolio.account.set("RBLX", 2);
  expect(portfolio.uniqueTicker()).toEqual(2);
});

//2.4
//Testing buy()
test('TEST #7: buy() (with 1 stock) -- success', () => {
  const portfolio = new Portfolio();
  portfolio.buy("TSLA", 5);
  expect(portfolio.uniqueTicker()).toEqual(1);
  expect(portfolio.isEmpty()).toEqual(false);
});

//2.4
//Testing buy() w 2 unique stocks
test('TEST #8: buy() (with 2 stocks [3 buys]) -- success', () => {
  const portfolio = new Portfolio();
  portfolio.buy("TSLA", 5);
  portfolio.buy("LCID", 5);
  portfolio.buy("LCID", 2);
  expect(portfolio.uniqueTicker()).toEqual(2);
  expect(portfolio.isEmpty()).toEqual(false);
});

//2.5
//Selling shares w 1 unique stock (5-4)
test('TEST #9: sell() (with 2 stocks [5-4]) -- success', () => {
  const portfolio = new Portfolio();
  portfolio.buy("TSLA", 5);
  portfolio.sell("TSLA", 4);
  expect(portfolio.uniqueTicker()).toEqual(1);
  expect(portfolio.isEmpty()).toEqual(false);
});

//2.5 & 2.7
//Selling whole position
test('TEST #10: sell() complete position (with 1 stock) -- success', () => {
  const portfolio = new Portfolio();
  portfolio.buy("TSLA", 5);
  portfolio.sell("TSLA", 5);
  expect(portfolio.uniqueTicker()).toEqual(0);
  expect(portfolio.isEmpty()).toEqual(true);
});

//2.5
//ERROR CHECK: selling unowned stock
test('TEST #11: sell() unowned stock -- success', () => {
  const portfolio = new Portfolio();
  expect(() => {portfolio.sell("NIO", 5);}).toThrow("You do not own this stock");
});

//2.8
//ERROR CHECK: selling more stock than owned
test('TEST #12: sell() more shares than bought -- success', () => {
  const portfolio = new Portfolio();
  portfolio.buy("NIO", 5);
  expect(() => {portfolio.sell("NIO", 6);}).toThrow("ShareSaleException");
});

//2.6 & 2.7
//shareAmount() check
test('TEST #13: shareAmount() when 0 shares owned -- success', () => {
  const portfolio = new Portfolio();
  portfolio.buy("TSLA", 5);
  portfolio.sell("TSLA", 5);
  expect(portfolio.uniqueTicker()).toEqual(0);
  expect(portfolio.isEmpty()).toEqual(true);
  expect(portfolio.shareAmount("TSLA")).toEqual(0);
  expect(portfolio.shareAmount("LCID")).toEqual(0);
});

//2.6
//shareAmount() check double add, subtract, and add/sub
test('TEST #14: shareAmount() (TSLA sub, LCID add, RIVN add/sub) -- success', () => {
  const portfolio = new Portfolio();
  portfolio.buy("TSLA", 5);
  portfolio.buy("LCID", 10);
  portfolio.sell("TSLA", 3);
  portfolio.buy("LCID", 11);
  portfolio.buy("RIVN", 7);
  portfolio.sell("RIVN", 6);
  portfolio.buy("RIVN", 8);
  expect(portfolio.uniqueTicker()).toEqual(3);
  expect(portfolio.isEmpty()).toEqual(false);
  expect(portfolio.shareAmount("TSLA")).toEqual(2);
  expect(portfolio.shareAmount("LCID")).toEqual(21);
  expect(portfolio.shareAmount("RIVN")).toEqual(9);
});

