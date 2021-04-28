import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Project } from '../models/project';
import { AccountService, AlertService, ProjectService } from '../services';

@Component({ templateUrl: 'metrics.component.html' })
export class MetricsComponent implements OnInit{
    user;
    selectedProject;

    constructor(private accountService: AccountService,
        private alertService: AlertService,
        public projectService: ProjectService
    ){}
    
    ngOnInit() {
        this.user = this.accountService.userValue;
        this.projectService.getUserProjects(this.user.id);
    }
    
    onTabClick(project: Project){
        this.selectedProject = project;
    }
}