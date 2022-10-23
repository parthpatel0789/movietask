import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as constant from './constants';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpService {

    public filesData: any = [];
    modalRefArr: any = [];
    CONSTANT = constant;
    public readonly apiEndpoint: String;
    private loaderSubject = new BehaviorSubject<any>(null);
    public loaderStatus = this.loaderSubject.asObservable();

    private contactUpdatedSubject = new BehaviorSubject<any>(null);
    public contactUpdatedStatus = this.contactUpdatedSubject.asObservable();

    public eventSubject = new BehaviorSubject<any>(null);
    public eventStatus = this.eventSubject.asObservable();

    private modalSubject = new BehaviorSubject<any>(null);
    public modalStatus = this.modalSubject.asObservable();

    private searchSubject = new BehaviorSubject<any>(null);
    public searchStatus = this.searchSubject.asObservable();


    loginData: any;
    myLoader = false;

    constructor(
        private router: Router, public http: HttpClient, public toastr: ToastrService,
        @Inject(DOCUMENT) public document: any, public fb: FormBuilder,
    ) {
        this.apiEndpoint = environment.apiBaseUrl;
    }




    navigate(url: any, params: any) {
        if (params) {
            this.router.navigate([`/${url}`, params]);
        } else {
            this.router.navigate([`/${url}`]);
        }
    }



    postData(url: any, payload: any, isLoading?: boolean) {
        return this.http.post<any>(this.apiEndpoint + url, payload, { reportProgress: isLoading });
    }


    getCategoryDataParams(url: any, payload: any, id: any, isLoading?: boolean) {
        return this.http.post<any>(this.apiEndpoint + url + '/' + id, payload, { reportProgress: isLoading });
    }

    getData(url: any) {
        return this.http.get<any>(this.apiEndpoint + url);
    }

    getDataParams(url: any, payload: any, examId: any) {
        return this.http.post<any>(this.apiEndpoint + url + '/' + examId, payload);
    }

    getVideoList(url: any, obj: any, isLoading?: boolean) {

        let params = new HttpParams();
        if (obj) {
            Object.keys(obj).forEach(key => {
                if (obj[key] !== '' && obj[key] !== undefined) {
                    params = params.set(key, obj[key]);
                }
            });
        }
        return this.http.get<any>(this.apiEndpoint + url, { params: params, reportProgress: isLoading });

    }

    getVieoDetailsById(url: any, id: any) {
        return this.http.get<any>(this.apiEndpoint + url + '/' + id);
    }

    deleteById(url: any, id: any) {
        return this.http.delete(this.apiEndpoint + url + '/' + id);
    }

    videoStatusUpdate(url: any, payload: any, isLoading?: boolean) {
        return this.http.post<any>(this.apiEndpoint + url + '/' + payload, { reportProgress: isLoading });
    }

}

