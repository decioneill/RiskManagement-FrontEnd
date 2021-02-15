import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(private router: Router, private http: HttpClient) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email, password) {
        return this.http.post<User>(`${environment.apiUrl}/user/authenticate`, { email, password })
            .pipe(map(user => {
                // add details & token to local storage to stay logged after refresh
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove details from local storage redirect to login.
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/user/register`, user);
    }

    getAll() {
        var list = this.http.get<User[]>(`${environment.apiUrl}/user`)
        return list;
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
    }

    //Check Id has user role before proceeding.
    checkRole(role: string)
    {
        const id = this.userValue.id.toString();
        return this.http.get<boolean>(`${environment.apiUrl}/user/${id}/${role}`);
    }
    
    update(id, params) {
        return this.http.put(`${environment.apiUrl}/user/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/user/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == (this.userValue.id.toString())) {
                    this.logout();
                }
                return x;
            }));
    }
}
