import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public http: HttpService) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loginData');
    this.http.navigate('/login', true);
  }

}
