import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExternalAuthguardService } from './services/externalAuthguard.service';
import { HttpService } from './services/http.service';
import { InterceptorService } from './services/interceptor.service';
import { SharedService } from './services/shared.service';
import { LoginComponent } from './external/login/login.component';
import { RegisterComponent } from './external/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    HttpService,
    ExternalAuthguardService,
    SharedService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
