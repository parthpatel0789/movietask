import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './base/header/header.component';
import { SidebarComponent } from './base/sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { InternalComponent } from './internal.component';
import { FooterComponent } from './base/footer/footer.component';


const routes: Routes = [{
  path: '', component: InternalComponent,
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule)
    },
    {
      path: 'add-movie',
      loadChildren: () => import('./add-movie/add-movie.module').then(m => m.AddMovieModule)
    }
  ]
}];


@NgModule({
  declarations: [
    InternalComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class InternalModule { }
