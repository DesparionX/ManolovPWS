import { HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, provideNativeDateAdapter, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
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
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { EditCVComponent } from './control-panel/edit-cv/edit-cv.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'MM/DD/YYYY',  // Expected input format for parsing
  },
  display: {
    dateInput: 'DD/MMM/YYYY',  // Display format in input field
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
    AddEditComponent,
    PortfolioComponent,
    EditCVComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, ReactiveFormsModule,
    MatSelectModule, MatIconModule, MatButtonModule, MatSlideToggleModule,
    DeleteDialogComponent, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
