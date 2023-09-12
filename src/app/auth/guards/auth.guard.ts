import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

//Esto se haría así a partir de la versión 16 de Angular

const checkAuthStatus = (): boolean | Observable<boolean> => {
  //se inyectan el AuthService y el Router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
  .pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
      }
    })
  );
};

export const canActivateGuard: CanActivateFn = (
  //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivate');
  console.log({ route, state });

  return checkAuthStatus();
};

export const canMatchGuard: CanMatchFn = (
  //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({ route, segments });

  return checkAuthStatus();
};



/* @Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatchFn, CanActivateFn  {

  constructor(
    private authService:AuthService,
    private router:Router,
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => console.log('Authenticated:', isAuthenticated )),
        tap( isAuthenticated => {
          if (!isAuthenticated ) {
            this.router.navigate(['./auth/login'])
          }
        }),

      )
  }

  canMatchFn(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    //console.log('Can Match');
    //console.log({ route, segments });

    return this.checkAuthStatus();
  }


  canActivateFn(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    //console.log('Can Activate');
    //console.log({ route, state });

    return this.checkAuthStatus();
  }


}
 */
