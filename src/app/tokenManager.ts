import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class TokenManager {
private static instance: TokenManager | null = null;

private constructor(){}

public static getInstance(): TokenManager {
    if(!TokenManager.instance){
        TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
}

    public setToken(newToken: string): void {
        localStorage.setItem('TokenValue', newToken);
    }

    public getToken(): string {
        let token = localStorage.getItem('TokenValue');
        return token !== null ? token : '';
    }
}