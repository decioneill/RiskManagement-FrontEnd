import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '../services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService ){}

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // create alias
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        // only proceed if valid
        if (this.form.valid) {
            this.loading = true;
            this.accountService.login(this.f.email.value, this.f.password.value)
                .pipe(first())
                .subscribe({
                    next: () => {
                        // return to 'returnUrl' if exists, else default
                        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
                        this.router.navigateByUrl(returnUrl);
                    },
                    error: error => {
                        this.alertService.error(error);
                        this.loading = false;
                    }
                });
            }
    }// end onSubmit
}