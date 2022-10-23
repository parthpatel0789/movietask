import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './external/login/login.component';
import { RegisterComponent } from './external/register/register.component';
import { ExternalAuthguardService } from './services/externalAuthguard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [ExternalAuthguardService] },
  { path: 'register', component: RegisterComponent, canActivate: [ExternalAuthguardService] },
  { path: '', loadChildren: () => import('./internal/internal.module').then(m => m.InternalModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
