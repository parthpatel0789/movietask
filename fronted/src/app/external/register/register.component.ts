import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from 'src/app/services/apiurl';
import { HttpService } from 'src/app/services/http.service';
import { MustMatch } from '../../services/validation/validation';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, public http: HttpService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    },
    );
  }
  get f() { return this.registerForm.controls; }
  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.http.postData(ApiUrl.register, this.registerForm.value, false)
      .subscribe(res => {

        if (res.statusCode == 200) {
          this.toastr.success('Register', 'success', {
            timeOut: 2000
          });
          this._router.navigate(['/login']);

        } else {
          this.toastr.error('error', 'Error', {
            timeOut: 3000
          });

        }
      },
        () => {
        });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
