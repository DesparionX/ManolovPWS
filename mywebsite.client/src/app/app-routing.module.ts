import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './control-panel/projects/projects.component';
import { AboutComponent } from './pages/about/about.component';
import { CvComponent } from './pages/cv/cv.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { PostsComponent } from './control-panel/posts/posts.component';
import { AddEditComponent } from './control-panel/add-edit/add-edit.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { EditCVComponent } from './control-panel/edit-cv/edit-cv.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cv', component: CvComponent },
  { path: 'contact', component: ContactComponent },


  // Admin control panel
  {
    path: 'control-panel', component: ControlPanelComponent,
    children: [
      { path: 'posts', component: PostsComponent },
      { path: 'posts/addit/:type/:id', component: AddEditComponent },
      { path: 'posts/addit/:type', component: AddEditComponent },

      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/addit/:type/:id', component: AddEditComponent },
      { path: 'projects/addit/:type', component: AddEditComponent },

      { path: 'cv', component: EditCVComponent },
      { path: 'contact', component: PostsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
