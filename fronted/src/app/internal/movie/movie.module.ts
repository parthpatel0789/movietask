import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from 'src/app/services/authguard.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
const routes: Routes = [
  {
    path: '', children: [
      {
        path: '',
        component: MovieComponent,
        canActivate: [AuthGuard],
        data: { title: 'Movie' },
      }
    ]
  }
];

@NgModule({
  declarations: [
    MovieComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    MatPaginatorModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieModule { }
