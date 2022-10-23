import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from 'src/app/services/apiurl';
import { HttpService } from 'src/app/services/http.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  movieId: any
  items: FormArray;
  constructor(private formBuilder: FormBuilder, public http: HttpService, private _router: Router, private toastr: ToastrService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      rating: ['', Validators.required],
      cast: this.formBuilder.array([]),
      genre: ['', Validators.required],
      releaseDate: ['', Validators.required],
    });
    this._route.queryParams.subscribe(params => {
      if (params['data'] != undefined) {
        this.editMovie(JSON.parse(atob(params['data'])))
      }
    });
    this._route.queryParams.subscribe(params => {
      if (params['data'] == undefined) {
        this.addNewVideoRow()
      }
    });
  }

  get videoinputForms() {
    return this.registerForm.get('cast') as FormArray;
  }
  get f() { return this.registerForm.controls; }

  addNewVideoRow() {
    let self = this;
    const videoinputArr = self.f.cast as FormArray;
    videoinputArr.push(this.formBuilder.group({
      cast: [''],
    }));

  }

  deleteVideoRow(index: number) {
    let videoinputArr = this.f.cast as FormArray;
    videoinputArr.removeAt(index);
  }

  editMovie(data: any) {
    console.log(data.cast
    )
    this.movieId = data._id
    this.registerForm.controls.name.setValue(data.name);
    this.registerForm.controls.rating.setValue(data.rating);
    const videoinputArr = this.f.cast as FormArray;
    data.cast.forEach((item: any) => {
      videoinputArr.push(this.formBuilder.group({
        cast: [item],
      }));
    });
    this.registerForm.controls.genre.setValue(data.genre);
    this.registerForm.controls.releaseDate.setValue(
      moment(data.releaseDate).format('YYYY-MM-DD')
    );
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    let array: any = []
    this.registerForm.value.cast.forEach((element: any) => {
      array.push(element.cast)
    });

    let payload = {
      name: this.registerForm.value.name,
      rating: this.registerForm.value.rating,
      cast: array,
      genre: this.registerForm.value.genre,
      releaseDate: this.registerForm.value.releaseDate,
    }

    if (this.movieId != undefined) {
      this.http.getDataParams(ApiUrl.movie, payload, this.movieId)
        .subscribe(res => {
          if (res.statusCode == 200) {
            this.toastr.success('Movie updated successfully', 'success', {
              timeOut: 2000
            });
            this._router.navigate(['/dashboard']);
          }

        });
    }
    else {
      this.http.postData(ApiUrl.movie, payload, false)
        .subscribe(res => {
          if (res.statusCode == 200) {
            this.toastr.success('Movie Added successfully', 'success', {
              timeOut: 2000
            });
            this._router.navigate(['/dashboard']);

          } else {
            this.toastr.error('Error', 'Invalid', {
              timeOut: 3000
            });

          }
        });
    }
  }

}
