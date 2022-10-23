import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMovieComponent } from './add-exam.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from 'src/app/services/authguard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxInputStarRatingModule } from 'ngx-input-star-rating';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: '',
        component: AddMovieComponent,
        canActivate: [AuthGuard],
        data: { title: 'AddMovie' },
      }
    ]
  }
];

@NgModule({
  declarations: [
    AddMovieComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxInputStarRatingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddMovieModule { }
