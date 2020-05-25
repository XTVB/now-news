import { HttpClientModule } from "@angular/common/http";
import { Inject, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCommonModule, MatRippleModule } from "@angular/material/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { BookmarksPageComponent } from "./main-page/app-pages/bookmarks-page/bookmarks-page.component";
import { ChannelComponent } from "./main-page/app-pages/channels-page/channel/channel.component";
import { ChannelsPageComponent } from "./main-page/app-pages/channels-page/channels-page.component";
import { NewsArticleComponent } from "./main-page/app-pages/channels-page/news-article/news-article.component";
import { OverviewPageComponent } from "./main-page/app-pages/overview-page/overview-page.component";
import { WidgetsPageComponent } from "./main-page/app-pages/widgets-page/widgets-page.component";
import { ContentOverviewComponent } from "./main-page/components/content-overview/content-overview.component";
import { MenuButtonComponent } from "./main-page/components/menu-button/menu-button.component";
import { SearchInputComponent } from "./main-page/components/search-input/search-input.component";
import { UserInfoComponent } from "./main-page/components/user-info/user-info.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { AuthEffects } from "./store/auth/effects";
import { ContentEffects } from "./store/content/effects";
import { rootReducer } from "./store/reducer";
import { LoginComponent } from "./un-authed-page/login/login.component";
import { NotFoundComponent } from "./un-authed-page/not-found/not-found.component";
import { SignupComponent } from "./un-authed-page/signup/signup.component";
import { SocialLoginComponent } from "./un-authed-page/social-login/social-login.component";
import { TextInputComponent } from "./un-authed-page/text-input/text-input.component";
import { TitleComponent } from "./un-authed-page/title/title.component";
import { UnAuthedPageComponent } from "./un-authed-page/un-authed-page.component";
import { CommentsListComponent } from "./main-page/app-pages/channels-page/news-article/comments-list/comments-list.component";
import { CommentComponent } from "./main-page/app-pages/channels-page/news-article/comments-list/comment/comment.component";
import { CommentInputComponent } from "./main-page/app-pages/channels-page/news-article/comments-list/comment-input/comment-input.component";

const materialModules = [
  MatButtonModule,
  MatButtonToggleModule,
  MatCommonModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule,
  MatRippleModule,
  MatToolbarModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    UnAuthedPageComponent,
    MainPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    SocialLoginComponent,
    TextInputComponent,
    MenuButtonComponent,
    UserInfoComponent,
    ContentOverviewComponent,
    ChannelsPageComponent,
    BookmarksPageComponent,
    OverviewPageComponent,
    WidgetsPageComponent,
    SearchInputComponent,
    ChannelComponent,
    NewsArticleComponent,
    CommentsListComponent,
    CommentComponent,
    CommentInputComponent,
  ],
  imports: [
    ...materialModules,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([AuthEffects, ContentEffects]),
  ],
  exports: [...materialModules],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    matIconRegistry: MatIconRegistry,
    @Inject(DomSanitizer) private readonly domsanitizer: DomSanitizer
  ) {
    matIconRegistry.addSvgIcon(
      "facebook",
      this.domsanitizer.bypassSecurityTrustResourceUrl(
        "/assets/images/facebook-logo.svg"
      )
    );
    matIconRegistry.addSvgIcon(
      "google",
      this.domsanitizer.bypassSecurityTrustResourceUrl(
        "/assets/images/google-logo.svg"
      )
    );
    matIconRegistry.addSvgIcon(
      "insta",
      this.domsanitizer.bypassSecurityTrustResourceUrl(
        "/assets/images/insta-logo.svg"
      )
    );
    matIconRegistry.addSvgIcon(
      "twitter",
      this.domsanitizer.bypassSecurityTrustResourceUrl(
        "/assets/images/twitter-logo.svg"
      )
    );
    matIconRegistry.addSvgIcon(
      "now-news",
      this.domsanitizer.bypassSecurityTrustResourceUrl(
        "/assets/images/now-logo.svg"
      )
    );
    matIconRegistry.addSvgIcon(
      "mail",
      this.domsanitizer.bypassSecurityTrustResourceUrl(
        "/assets/images/mail-icon.svg"
      )
    );
    matIconRegistry.addSvgIcon(
      "lock",
      this.domsanitizer.bypassSecurityTrustResourceUrl(
        "/assets/images/lock-icon.svg"
      )
    );
    matIconRegistry.addSvgIcon(
      "channel",
      this.domsanitizer.bypassSecurityTrustResourceUrl(
        "/assets/images/channels-icon.svg"
      )
    );
    matIconRegistry.addSvgIcon(
      "search",
      this.domsanitizer.bypassSecurityTrustResourceUrl(
        "/assets/images/search-icon.svg"
      )
    );
    matIconRegistry.addSvgIcon(
      "overview",
      this.domsanitizer.bypassSecurityTrustResourceUrl(
        "/assets/images/overview-icon.svg"
      )
    );
    matIconRegistry.addSvgIcon(
      "bookmark",
      this.domsanitizer.bypassSecurityTrustResourceUrl(
        "/assets/images/bookmark-icon.svg"
      )
    );
  }
}
