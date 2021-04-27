import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '../services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
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
            Email: ['', Validators.required],
            username: ['', [Validators.required, Validators.minLength(6)]],
            Password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // create alias
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        //only proceed if form is valid
        if (this.form.valid) {
            this.loading = true;
            this.accountService.register(this.form.value)
                .pipe(first())
                .subscribe({
                    next: () => {
                        this.alertService.success('Thank you for registering', { keepAfterRouteChange: true });
                        this.router.navigate(['../login'], { relativeTo: this.route });
                    },
                    error: error => {
                        this.alertService.error(error);
                        this.loading = false;
                    }
                });
            }
    }// end onSubmit
}