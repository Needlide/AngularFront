import { TokenManager } from './tokenManager';


import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({setHeaders: {Authorization: TokenManager.getInstance().getToken()}});

  return next(authReq);
};