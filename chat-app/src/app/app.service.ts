import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-Cookies/ng2-Cookies'; 
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'https://chatapi.edwisor.com';
  constructor(public http:HttpClient) { }
  public signupFunction(data): Observable <any> {
    const params = new HttpParams()
      .set('firstname', data.firstname)
      .set('lastName', data.lastName)
      .set('email', data.email)
      .set('password', data.password)
      .set('apiKey',data.apiKey)
      .set('mobile',data.mobile);
    return this.http.post(`${this.url}/api/v1/users/signup`,params)
  }
  public signinFunction(data): Observable <any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
    return this.http.post(`${this.url}/api/v1/users/login`,params)
  }
  private handleError(err:HttpErrorResponse){
    let errorMessage = '';
    if(err.error instanceof Error){
      errorMessage = `An error occured: ${err.error.message} `
    }
  }
}
