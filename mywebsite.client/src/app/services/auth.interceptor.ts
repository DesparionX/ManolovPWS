import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token') ?? '';
  req = req.clone({
    setHeaders: {
      ['Authorization']: token ? 'Bearer ' + token : '',
    },
  })

  return next(req).pipe(
    retry({ count: 2, delay: 2000 }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }
      return throwError(error);
    })
  );
};
