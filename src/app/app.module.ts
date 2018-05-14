import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';


import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GithubFollowersService } from './services/github-followers.service';
import { AppErrorHandler } from './common/app-error-handler';
import { PostService } from './services/post.service';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    GithubProfileComponent,
    GithubFollowersComponent,
    NotFoundComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'followers/:id/:username',
        component:GithubProfileComponent
      },
      {
        path:'followers',
        component:GithubFollowersComponent
      },
      {
        path:'posts',
        component:PostsComponent
      },
      {
        path:'**',
        component:NotFoundComponent
      }
      
    ])
  ],
  providers: [
    GithubFollowersService,
    PostService
    ,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

