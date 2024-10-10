import { HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BodyComponent } from './body/body.component';
import { TopNavComponent } from './nav/top-nav/top-nav.component';
import { ProjectsComponent } from './control-panel/projects/projects.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CvComponent } from './pages/cv/cv.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { LoginComponent } from './control-panel/login/login.component';
import { PostsComponent } from './control-panel/posts/posts.component';
import { PanelComponent } from './control-panel/panel/panel.component';
import { authInterceptor } from './services/auth.interceptor';
import { AddEditComponent } from './control-panel/add-edit/add-edit.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DeleteDialogComponent } from './custom-components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BodyComponent,
    TopNavComponent,
    ProjectsComponent,
    AboutComponent,
    ContactComponent,
    CvComponent,
    ControlPanelComponent,
    LoginComponent,
    PostsComponent,
    PanelComponent,
    AddEditComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, ReactiveFormsModule,
    MatSelectModule, MatIconModule, MatButtonModule, DeleteDialogComponent
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
