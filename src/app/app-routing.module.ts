import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthorizationGuard } from './store/auth/authorization.guard';
import { LoginComponent } from './un-authed-page/login/login.component';
import { NotFoundComponent } from './un-authed-page/not-found/not-found.component';
import { SignupComponent } from './un-authed-page/signup/signup.component';
import { UnAuthedPageComponent } from './un-authed-page/un-authed-page.component';

const authedRoutes: Routes = [
  {
    path: '',
    data: {
      requiresLogin: true
    },
    component: MainPageComponent,
    // resolve: {
    //   dataLoaded: ReservationLogsAccountLevelResolverService
    // }
    children: []
  }
];

const unAuthedRoutes: Routes = [
  {
    path: '',
    component: UnAuthedPageComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        children: []
      },
      {
        path: 'signup',
        component: SignupComponent,
        children: []
      },
      {
        path: '404',
        component: NotFoundComponent,
        children: []
      }
    ]
  }
];

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthorizationGuard],
    children: [
      ...authedRoutes,
      ...unAuthedRoutes,
      {
        path: '**',
        redirectTo: '/404'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthorizationGuard]
})
export class AppRoutingModule { }
