import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Project } from '../models/project';
import { AccountService, AlertService, ProjectService } from '../services';

@Component({ templateUrl: 'riskRegister.component.html' })
export class RiskRegisterComponent implements OnInit{
    selectedProject;
    user;

    constructor(private accountService: AccountService, 
        private formBuilder: FormBuilder,
        public projectService: ProjectService,
        private alertService: AlertService 
    ){}
    
    ngOnInit() {
        this.user = this.accountService.userValue;
        this.projectService.getUserProjects(this.user.id);
    }

    onTabClick(project: Project){
        this.selectedProject = project;
    }
    
}