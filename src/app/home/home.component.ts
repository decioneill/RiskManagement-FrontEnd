import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { User} from '../models';
import { AccountService } from '../services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

    constructor(public accountService: AccountService, private router: Router) {        
        this.user = this.accountService.userValue;
    }
}