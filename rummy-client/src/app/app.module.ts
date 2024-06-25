import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LobbyComponent } from './components/lobby/lobby.component'; // Assurez-vous que ce composant existe

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './services/user.service';
import { AppContexte } from './resources/helpers/app-contexte.helper';
import { LobbySocketService } from './services/sockets/lobby.socket.service';
import { SocketService } from './services/sockets/socket.service';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ErrorHandlingService } from './services/error-handling.service';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LobbyComponent,
    RegisterComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [AuthService, UserService, AppContexte, LobbySocketService, SocketService, ErrorHandlingService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogComponent]
})
export class AppModule { }
