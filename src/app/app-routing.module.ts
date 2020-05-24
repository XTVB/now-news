import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookmarksPageComponent } from "./main-page/app-pages/bookmarks-page/bookmarks-page.component";
import { ChannelComponent } from "./main-page/app-pages/channels-page/channel/channel.component";
import { ChannelsPageComponent } from "./main-page/app-pages/channels-page/channels-page.component";
import { NewsArticleComponent } from "./main-page/app-pages/channels-page/news-article/news-article.component";
import { OverviewPageComponent } from "./main-page/app-pages/overview-page/overview-page.component";
import { WidgetsPageComponent } from "./main-page/app-pages/widgets-page/widgets-page.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { AuthorizationGuard } from "./store/auth/authorization.guard";
import { LoginComponent } from "./un-authed-page/login/login.component";
import { NotFoundComponent } from "./un-authed-page/not-found/not-found.component";
import { SignupComponent } from "./un-authed-page/signup/signup.component";
import { UnAuthedPageComponent } from "./un-authed-page/un-authed-page.component";

const authedRoutes: Routes = [
  {
    path: "",
    data: {
      requiresLogin: true,
    },
    component: MainPageComponent,
    children: [
      {
        path: "",
        redirectTo: "channels",
        pathMatch: "full",
      },
      {
        path: "channels",
        component: ChannelsPageComponent,
        children: [
          {
            path: "",
            redirectTo: "explore",
            pathMatch: "full",
          },
          {
            path: "trending",
            component: NewsArticleComponent,
            children: [],
          },
          {
            path: ":channelName",
            component: ChannelComponent,
            children: [],
          },
        ],
      },
      {
        path: "bookmarks",
        component: BookmarksPageComponent,
        children: [],
      },
      {
        path: "overview",
        component: OverviewPageComponent,
        children: [],
      },
      {
        path: "widgets",
        component: WidgetsPageComponent,
        children: [],
      },
    ],
  },
];

const unAuthedRoutes: Routes = [
  {
    path: "",
    component: UnAuthedPageComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
        children: [],
      },
      {
        path: "signup",
        component: SignupComponent,
        children: [],
      },
      {
        path: "404",
        component: NotFoundComponent,
        children: [],
      },
    ],
  },
];

const routes: Routes = [
  {
    path: "",
    canActivateChild: [AuthorizationGuard],
    children: [
      ...authedRoutes,
      ...unAuthedRoutes,
      {
        path: "**",
        redirectTo: "/404",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthorizationGuard],
})
export class AppRoutingModule {}
