import { APP_BASE_HREF } from "@angular/common";
import { NgModule, ValueProvider } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MATERIAL_SANITY_CHECKS } from "@angular/material/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { Action, Store } from "@ngrx/store";
import { AppComponent } from "app/app.component";
import { AppModule } from "app/app.module";
import { FooterComponent } from "app/footer/footer.component";
import { BookmarksPageComponent } from "app/main-page/app-pages/bookmarks-page/bookmarks-page.component";
import { ChannelComponent } from "app/main-page/app-pages/channels-page/channel/channel.component";
import { ChannelsPageComponent } from "app/main-page/app-pages/channels-page/channels-page.component";
import { NewsArticleComponent } from "app/main-page/app-pages/channels-page/news-article/news-article.component";
import { OverviewPageComponent } from "app/main-page/app-pages/overview-page/overview-page.component";
import { WidgetsPageComponent } from "app/main-page/app-pages/widgets-page/widgets-page.component";
import { ContentOverviewComponent } from "app/main-page/components/content-overview/content-overview.component";
import { MenuButtonComponent } from "app/main-page/components/menu-button/menu-button.component";
import { SearchInputComponent } from "app/main-page/components/search-input/search-input.component";
import { UserInfoComponent } from "app/main-page/components/user-info/user-info.component";
import { MainPageComponent } from "app/main-page/main-page.component";
import { LoginComponent } from "app/un-authed-page/login/login.component";
import { NotFoundComponent } from "app/un-authed-page/not-found/not-found.component";
import { SignupComponent } from "app/un-authed-page/signup/signup.component";
import { SocialLoginComponent } from "app/un-authed-page/social-login/social-login.component";
import { TextInputComponent } from "app/un-authed-page/text-input/text-input.component";
import { TitleComponent } from "app/un-authed-page/title/title.component";
import { UnAuthedPageComponent } from "app/un-authed-page/un-authed-page.component";
import { Observable, of } from "rxjs";

export function mockNgrxPipe(
  // tslint:disable-next-line:no-any
  factory: (providedSelector?: any) => Observable<any>
) {
  // tslint:disable-next-line:no-function-expression only-arrow-functions no-any
  return function ({ $selector }: any, ...otherPipeParms: any[]) {
    // this would be the simple solution, but doesn't work due to https://github.com/ReactiveX/rxjs/issues/3989
    // return factory($selector).pipe(...otherPipeParms);
    // hence, here the workaround:

    return otherPipeParms.reduce(
      // tslint:disable-next-line:no-any
      (ob: Observable<any>, op) => ob.pipe(op),
      factory($selector)
    );
  };
}

export const appBaseHrefProvider: ValueProvider = {
  provide: APP_BASE_HREF,
  useValue: "/",
};

export function mockedPipe() {
  return of();
}
export function mockedDispatch() {} // tslint:disable-line:no-empty
export function mockedSelect() {
  return of([]);
}
export const mockedStore = {
  pipe: mockNgrxPipe(mockedPipe),
  dispatch: mockedDispatch,
  select: mockedSelect,
};
export class MockedAction implements Action {
  public type = "";
}

@NgModule({
  imports: [AppModule, NoopAnimationsModule, RouterModule.forRoot([])],
  providers: [
    FormBuilder,
    appBaseHrefProvider,
    { provide: Store, useValue: mockedStore },
    { provide: MATERIAL_SANITY_CHECKS, useValue: false },
  ],
  exports: [],
})
export class BaseTestModule {}

// tslint:disable-next-line:no-empty
test("empty test to make jest happy", () => {});
