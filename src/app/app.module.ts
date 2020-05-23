import { HttpClientModule } from '@angular/common/http';
import { Inject, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthEffects } from './store/auth/effects';
import { rootReducer } from './store/reducer';
import { LoginComponent } from './un-authed-page/login/login.component';
import { NotFoundComponent } from './un-authed-page/not-found/not-found.component';
import { TextInputComponent } from './un-authed-page/text-input/text-input.component';
import { SignupComponent } from './un-authed-page/signup/signup.component';
import { SocialLoginComponent } from './un-authed-page/social-login/social-login.component';
import { TitleComponent } from './un-authed-page/title/title.component';
import { UnAuthedPageComponent } from './un-authed-page/un-authed-page.component';

const materialModules = [
  MatInputModule,
  MatIconModule,
  MatRippleModule,
  MatButtonModule,
  MatCommonModule
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
    TextInputComponent
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
    EffectsModule.forRoot([
      AuthEffects
    ])
  ],
  exports: [
    ...materialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    matIconRegistry: MatIconRegistry,
    @Inject(DomSanitizer) private readonly domsanitizer: DomSanitizer
  ) {
    matIconRegistry.addSvgIcon('facebook', this.domsanitizer.bypassSecurityTrustResourceUrl('/assets/images/facebook-logo.svg'));
    matIconRegistry.addSvgIcon('google', this.domsanitizer.bypassSecurityTrustResourceUrl('/assets/images/google-logo.svg'));
    matIconRegistry.addSvgIcon('insta', this.domsanitizer.bypassSecurityTrustResourceUrl('/assets/images/insta-logo.svg'));
    matIconRegistry.addSvgIcon('twitter', this.domsanitizer.bypassSecurityTrustResourceUrl('/assets/images/twitter-logo.svg'));
    matIconRegistry.addSvgIcon('now-news', this.domsanitizer.bypassSecurityTrustResourceUrl('/assets/images/now-logo.svg'));
    matIconRegistry.addSvgIcon('mail', this.domsanitizer.bypassSecurityTrustResourceUrl('/assets/images/mail-icon.svg'));
    matIconRegistry.addSvgIcon('lock', this.domsanitizer.bypassSecurityTrustResourceUrl('/assets/images/lock-icon.svg'));
  }
}
