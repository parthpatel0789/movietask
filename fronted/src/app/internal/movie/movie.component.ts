import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from 'src/app/services/apiurl';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movieList: any = []
  constructor(public http: HttpService, private _route: ActivatedRoute, private _router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMovieList()
  }
  getMovieList() {
    this.http.getData(ApiUrl.movie).subscribe((res) => {
      if (res.statusCode == 200) {
        this.movieList = res.data
      }
    })
  }
  editMovie(data: any) {
    this._router.navigate(['/add-movie'], { queryParams: { data: btoa(JSON.stringify(data)) } });
  }

  clickMethod(data: any) {
    if (confirm("Are you sure to delete " + data.name)) {
      this.http.deleteById(ApiUrl.movie, data._id).subscribe((res) => {
        this.toastr.success('Movie deleted successfully', 'success', {
          timeOut: 2000
        });
        this.getMovieList();
      });
    }
  }

}
