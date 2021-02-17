import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { role } from '../models';
import { AccountService, AlertService, ProjectService } from '../services';

@Component({ templateUrl: 'projectList.component.html',
styleUrls: ['projectList.component.css'] })
export class ProjectListComponent implements OnInit {
    projects = null;
    user;

    constructor(private accountService: AccountService, 
        private projectService: ProjectService,
        private alertService: AlertService ){}
    
    ngOnInit() {
        this.user = this.accountService.userValue
        this.projectService.getAll().subscribe(projects => this.projects = projects);  
    }

    addTeamMember(Pid: string){
        
    }

    removeTeamMember(Pid: string, Uid: string){
        var hasRole = this.accountService.checkRole(role.Admin)
        .subscribe(hasRole => 
            {
                if(hasRole)
                {
                    this.alertService.error("temp message")
                    //this.projectService.removeTeamMember(Pid,Uid)
                    //    .pipe(first())
                    //   .subscribe();        
                }
                else
                {
                    this.alertService.error("not authorized")
                }
            })
    }
}