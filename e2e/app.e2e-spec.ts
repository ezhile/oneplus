import { OneplusProjectPage } from './app.po';

describe('oneplus-project App', () => {
  let page: OneplusProjectPage;

  beforeEach(() => {
    page = new OneplusProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
