import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs/observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'https://chatapi.edwisor.com';
  private socket;
  constructor(public http: HttpClient) {
    //connection is created
    //handshake
    this.socket = io(this.url);
   }
   public verifyUser = () => {
     return Observable.create((observer) => {
       this.socket.on('verifyUser',(data) => {
         observer.next(data);0
       })
     })
   }
   public onlineUserList = () => {
     return Observable.create((observer) => {
       this.socket.on('online-user-list',(userList) => {
         observer.next(userList);
       })
     })
   }
   public disconnectedSocket = () => {
     return Observable.create((observer) => {
       this.socket.on('disconnect',() => {
         observer.next();
       })
     })
   }
   public setUser = (authToken) => {
     this.socket.emit('set-user',authToken);
   }
   public handleError(err:HttpErrorResponse){
     let errorMessage = '';
     if(err.error instanceof Error) {
       errorMessage = `An error occoured: ${err.error.message}`;
     }
     else {
       errorMessage = `Server return code: ${err.status}`;
     }
     console.error(errorMessage);
     return Observable.throw(errorMessage);
   }
}
