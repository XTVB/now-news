import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthEffects } from './store/auth/effects';
import { rootReducer } from './store/reducer';
import { UnAuthedPageComponent } from './un-authed-page/un-authed-page.component';
import { TitleComponent } from './un-authed-page/title/title.component';
import { NotFoundComponent } from './un-authed-page/not-found/not-found.component';
import { LoginComponent } from './un-authed-page/login/login.component';
import { SignupComponent } from './un-authed-page/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    UnAuthedPageComponent,
    MainPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([
      AuthEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
