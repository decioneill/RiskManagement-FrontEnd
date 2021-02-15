/* Implementation for basic login redirection 
*/
import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { AccountService } from '../services';

@Injectable({ providedIn: 'root' })
// implement CanActivate interface
export class AuthGuard implements CanActivate {
    constructor( private router: Router, private accountService: AccountService) {}

    // implementation of canActivate  
    canActivate() {
        const user = this.accountService.userValue;
        
        if (user != null) {
            return true;
        }

        // If not logged in, redirect to login
        this.router.navigate(['/account/login'],);
        return false;
    }
}