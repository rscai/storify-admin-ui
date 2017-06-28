import { StorifyAdminUiPage } from './app.po';

describe('storify-admin-ui App', () => {
  let page: StorifyAdminUiPage;

  beforeEach(() => {
    page = new StorifyAdminUiPage();
  });

  it('should display Custom Collection', () => {
    page.navigateTo();
    page.navigateToCustomCollection();
    expect(page.detailTitle().getText()).toEqual('Custom Collection');
  });
});
