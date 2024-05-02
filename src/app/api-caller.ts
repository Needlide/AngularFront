import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UrlModel } from './models/url';
import { UserResponse } from './models/userResponse';
import { RegistrationModel } from './models/registration';
import { LoginModel } from './models/login';

@Injectable({
  providedIn: 'root',
})
export class ApiCaller {
  private readonly getAllUrlPath = 'https://localhost:7111/all';
  private readonly getInfoUrlPath = 'https://localhost:7111/info';
  private readonly deleteUrlPath = 'https://localhost:7111/delete';
  private readonly postUrlPath = 'https://localhost:7111/add';
  private readonly getUsersUrlsPath = 'https://localhost:7111/getUsers';

  private readonly registerUserPath = 'https://localhost:7111/registration';
  private readonly loginUserPath = 'https://localhost:7111/login';
  private readonly getUserRolePath = 'https://localhost:7111/getRole';

  constructor(private http: HttpClient) {}

  getAllUrls(): Observable<UrlModel[]> {
    return this.http
      .get<UrlModel[]>(this.getAllUrlPath)
      .pipe(catchError(this.handleError));
  }

  getInfo(urlId: number): Observable<UrlModel> {
    return this.http
      .post<UrlModel>(this.getInfoUrlPath, urlId)
      .pipe(catchError(this.handleError));
  }

  deleteUrl(urlId: number): Observable<string> {
    return this.http
      .delete<string>(this.deleteUrlPath, {
        params: { urlId: urlId.toString() },
      })
      .pipe(catchError(this.handleError));
  }

  postUrl(url: string): Observable<string> {
    return this.http
      .post<string>(this.postUrlPath, url)
      .pipe(catchError(this.handleError));
  }

  getUsersUrl(): Observable<UrlModel[]> {
    return this.http
      .get<UrlModel[]>(this.getUsersUrlsPath)
      .pipe(catchError(this.handleError));
  }

  registerUser(user: RegistrationModel): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(this.registerUserPath, user)
      .pipe(catchError(this.handleError));
  }

  loginUser(user: LoginModel): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(this.loginUserPath, user)
      .pipe(catchError(this.handleError));
  }

  getUserRole(): Observable<number> {
    return this.http
      .get<number>(this.getUserRolePath)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred: ', error);

    return throwError(
      () => new Error("Couldn't retrieve data; please try again later.")
    );
  }
}
