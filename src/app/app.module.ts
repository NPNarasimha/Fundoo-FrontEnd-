import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { CreatenoteComponent } from './Components/createnote/createnote.component';
import { IconsComponent } from './Components/icons/icons.component';
import { MatMenuModule } from '@angular/material/menu';
import { DisplaynotesComponent } from './Components/displaynotes/displaynotes.component';
import { DisplayAllNotesComponent } from './Components/display-all-notes/display-all-notes.component';
import { ArchiveComponent } from './Components/archive/archive.component';
import { TrashComponent } from './Components/trash/trash.component';
import { MatDialogModule } from '@angular/material/dialog'; 
import { FormsModule } from '@angular/forms';
import { UpdateNoteComponent } from './Components/update-note/update-note.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ForgetPasswordComponent,
    CreatenoteComponent,
    IconsComponent,
    DisplaynotesComponent,
    DisplayAllNotesComponent,
    ArchiveComponent,
    TrashComponent,
    UpdateNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule
    
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
