import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.token
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request).pipe(
            catchError(error => {
                if (error.status === 401) {
                    // Se o token expirou ou não é válido, redirecionar para a página de login
                    this.authService.logout();
                }
                return throwError(error);
            })
        );
    }
}


// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { AuthService } from '../services/auth.service';
// import { catchError, throwError } from 'rxjs';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {

//     constructor(private authService: AuthService) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): any {
//         return next.handle(this.addTokenToRequest(request))
//             .pipe(
//                 catchError(error => {
//                     if (error instanceof HttpErrorResponse && error.status === 401)
//                         this.authService.logout();

//                     return throwError(() => error);
//                 })
//             );
//     }

//     private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
//         return request.clone({ headers: this.authService.getHeaders() });
//     }
// }
