import { StorifyAdminUiPage } from './app.po';

describe('storify-admin-ui App', () => {
  let page: StorifyAdminUiPage;

  beforeEach(() => {
    page = new StorifyAdminUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
