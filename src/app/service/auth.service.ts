import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'https://jsonplaceholder.typicode.com/posts/';

  constructor(private http: HttpClient) {}

  register(form: any): Observable<Object> {
    return this.http.post(this.baseUrl, form);
  }

  login(form: any): Observable<Object> {
    return this.http.post(this.baseUrl, form);
  }
}
