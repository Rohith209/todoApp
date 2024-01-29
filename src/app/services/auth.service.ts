import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public URL = 'https://todoapp-7bbab-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) { }

  registerUser(data: any) {
    return this.http.post(this.URL + '/users.json', data);
  }

  getUser(user: any) {
    return this.http.get(this.URL + '/users.json');
  }
}


