/* Implementation for admin login redirection 
*/
import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { AccountService } from '../services';
import { role } from '../models'

@Injectable({ providedIn: 'root' })
// implement CanActivate interface
export class AdminAuthGuard implements CanActivate {
    constructor( private router: Router, private accountService: AccountService) {}

    // AdminGuard implementation of canActivate  
    canActivate() {        
        // return result of role check
        var hasRole = this.accountService.checkRole(role.Admin);
        return hasRole;
    }
}        