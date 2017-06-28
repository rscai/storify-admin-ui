import { browser, by, element } from 'protractor';

export class StorifyAdminUiPage {
  navigateTo() {
    return browser.get('/');
  }

  navigateToCustomCollection() {
    return element(by.id('menu-custom-collection')).click();
  }

  detailTitle() {
    return element(by.css(".detail-title"));
  }
}
