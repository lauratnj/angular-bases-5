import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interfaces';
import { Observable, catchError, of, tap, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {


  private baseUrl = environments.baseUrl;
  private user?: User;


  constructor(private http: HttpClient) { }


  //Utiliza structuredClone() para clonar el objeto de usuario en profundidad. Crea una copia totalmente nueva del objeto original. Es decir, si tu haces cambios en el clon, estos no afectan al original.
  get currentUser():User|undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  login( email: string, password: string ):Observable<User> {
    // http.post('login', { email, password });
    return this.http.get<User>(`${ this.baseUrl }/users/1`)
    .pipe(
      tap( user => this.user = user ),
      tap( user => localStorage.setItem('token', 'dgddR5.56545.4fd8f.f8d' )),
    );
  }


  checkAuthentication(): Observable<boolean> | boolean {

    if ( !localStorage.getItem('token') ) return false;

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
    .pipe(
      tap ( user => this.user = user ),
      map ( user => !!user ),
      catchError( err => of(false) ),
    );


  }


  logout() {
    this.user = undefined;
    localStorage.clear();
  }


}
