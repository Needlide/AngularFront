import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrationModel } from '../models/registration';
import { Roles } from '../models/Roles';
import { ApiCaller } from '../api-caller';
import { ErorService } from '../eror.service';
import { UserResponse } from '../models/userResponse';
import { TokenManager } from '../tokenManager';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-view',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registration-view.component.html',
  styleUrl: './registration-view.component.css',
})
export class RegistrationViewComponent {
  registrationData: RegistrationModel = {
    login: '',
    password: '',
    role: Roles.Unregistered,
  };

  response: string = ''

  userRoles = Roles;

  constructor(private caller: ApiCaller, private errorService: ErorService) {}

  onSubmit(): void {
    this.caller.registerUser(this.registrationData).subscribe((response: UserResponse) => {this.response = response.message; TokenManager.getInstance().setToken(response.token)},
      (error: any) => {
        this.response = error;
        this.errorService.sendError(
          'Error occured during registration process. Try again later.'
        );
      },
    );

    this.registrationData.login = '';
    this.registrationData.password = '';
    this.registrationData.role = Roles.Unregistered;
  }
}
