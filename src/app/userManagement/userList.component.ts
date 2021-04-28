import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { role } from '../models';
import { AccountService } from '../services';

@Component({ templateUrl: 'userList.component.html' })
export class UserListComponent implements OnInit {
    users = null;
    user;

    constructor(private accountService: AccountService) {}
    ngOnInit() {
        this.user = this.accountService.userValue
        this.accountService.getAll(this.user.id).subscribe(users => this.users = users);  
    }

    deleteUser(id: string){
        var hasRole = this.accountService.checkRole(role.Admin)
        if(hasRole)
        {
            const user = this.users.find(x => x.id === id);
            user.isDeleting = true;
            this.accountService.delete(id)
                .pipe(first())
                .subscribe(() => this.users = this.users.filter(x => x.id !== id));        
        }
    }
}