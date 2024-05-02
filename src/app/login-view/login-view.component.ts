import { Component } from '@angular/core';
import { LoginModel } from '../models/login';
import { ApiCaller } from '../api-caller';
import { ErorService } from '../eror.service';
import { FormsModule } from '@angular/forms';
import { UserResponse } from '../models/userResponse';
import { TokenManager } from '../tokenManager';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css',
})
export class LoginViewComponent {
  loginData: LoginModel = { login: '', password: '' };
  response: string = ''

  constructor(private caller: ApiCaller, private errorService: ErorService) {}

  onSubmit(): void {
    this.caller.loginUser(this.loginData).subscribe((response: UserResponse) => {this.response = response.message; TokenManager.getInstance().setToken(response.token); console.log(TokenManager.getInstance().getToken())}, 
      (error: any) => {
        this.response = error;
        this.errorService.sendError(
          'Error occured during login process. Try again later.'
        );
      },
    );

    this.loginData.login = '';
    this.loginData.password = '';
  }
}
