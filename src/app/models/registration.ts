import { Roles } from "./Roles";

export interface RegistrationModel {
    login: string;
    password: string;
    role: Roles
}