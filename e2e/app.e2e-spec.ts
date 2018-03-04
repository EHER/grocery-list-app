import { GroceriesListPage } from './app.po';

describe('groceries-list App', () => {
  let page: GroceriesListPage;

  beforeEach(() => {
    page = new GroceriesListPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
