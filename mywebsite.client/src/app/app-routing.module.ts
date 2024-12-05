import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './control-panel/projects/projects.component';
import { CvComponent } from './pages/cv/cv.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { PostsComponent } from './control-panel/posts/posts.component';
import { AddEditComponent } from './control-panel/add-edit/add-edit.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { EditCVComponent } from './control-panel/edit-cv/edit-cv.component';
import { InboxComponent } from './control-panel/inbox/inbox.component';
import { ReadMessageComponent } from './control-panel/inbox/read-message/read-message.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'cv', component: CvComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },


  // Admin control panel
  {
    path: 'control-panel', component: ControlPanelComponent, canMatch: [authGuard],
    children: [
      { path: 'posts', component: PostsComponent },
      { path: 'posts/addit/:type/:id', component: AddEditComponent },
      { path: 'posts/addit/:type', component: AddEditComponent },

      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/addit/:type/:id', component: AddEditComponent },
      { path: 'projects/addit/:type', component: AddEditComponent },

      { path: 'cv', component: EditCVComponent },
      { path: 'inbox', component: InboxComponent },
      { path: 'inbox/message/:id', pathMatch: 'full', component: ReadMessageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
