import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from 'src/app/services/apiurl';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, public http: HttpService, private _router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.http.postData(ApiUrl.login, this.registerForm.value, false)
      .subscribe(res => {
        if (res.statusCode == 200) {
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('loginData', JSON.stringify(res.data));
          this.toastr.success('Login successfully', 'success', {
            timeOut: 2000
          });
          window.location.href = "dashboard";

        } else {
          this.toastr.error('Error', 'Invalid', {
            timeOut: 3000
          });

        }
      });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
