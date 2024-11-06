import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://fakestoreapi.com/auth/login';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken()); 

  loggedIn$ = this.loggedIn.asObservable(); 

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken'); 
  }
}
