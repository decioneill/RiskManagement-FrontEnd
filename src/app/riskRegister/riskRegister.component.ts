import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountService, AlertService, ProjectService } from '../services';

@Component({ templateUrl: 'riskRegister.component.html' })
export class RiskRegisterComponent implements OnInit {
    projects = null;
    user;

    constructor(private accountService: AccountService, 
        private formBuilder: FormBuilder,
        private projectService: ProjectService,
        private alertService: AlertService 
    ){}
    
    ngOnInit() {
        this.user = this.accountService.userValue;
        this.projectService.getUserProjects(this.user.id).subscribe(projects => this.projects = projects);
    }
}