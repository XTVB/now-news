import { NowNewsPage } from './app.po';

describe('now-news App', function() {
  let page: NowNewsPage;

  beforeEach(() => {
    page = new NowNewsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
