import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { role } from '../models';
import { Project } from '../models/project';
import { AccountService, AlertService, ProjectService } from '../services';

@Component({ templateUrl: 'projectList.component.html',
styleUrls: ['projectList.component.css'] })
export class ProjectListComponent implements OnInit {
    form: FormGroup;
    projects = null;
    nonMembers = null;
    user;

    constructor(private accountService: AccountService, 
        private formBuilder: FormBuilder,
        private projectService: ProjectService,
        private alertService: AlertService ){}
        loading = false;
        submitted = false;
        selectedUsers = [];
    
    ngOnInit() {
        this.user = this.accountService.userValue
        this.form = this.formBuilder.group({
            name: ['', Validators.required]});
        this.projectService.getAll(this.user).subscribe(projects => this.projects = projects);  
    }

    // create alias
    get f() { return this.form.controls; }

    // returns list of users that can be added (not already added)
    getNonMembers(pid: string){
        this.projectService.getNonMembers(pid).subscribe(nonMembers => this.nonMembers = nonMembers);
    }

    // creates a new project
    addProject(){
        this.submitted = false;
        if (this.form.valid) {
            this.loading = true;
            var hasRole = this.accountService.checkRole(role.Admin)
            .subscribe(hasRole => 
            {
                if(hasRole)
                {
                    this.projectService.createProject(this.form.value)
                    .pipe(first())
                    .subscribe({
                        next: () => {
                            this.alertService.success('Add successful',{ autoClose: true});
                            this.projectService.getAll(this.user).subscribe(projects => this.projects = projects);  
                            this.form.reset();
                        },
                        error: error => {
                            this.alertService.error(error, { autoClose: true});
                            this.loading = false;
                        }
                    });
                }
                else
                {
                    this.alertService.error("Not Authorized",{ autoClose: true})
                }
                this.loading = false;
            })
        }
    }

    // removes project
    deleteProject(project: any)
    {
        var pid = project.id;
        var hasRole = this.accountService.checkRole(role.Admin)
        .subscribe(hasRole => 
        {
            if(hasRole && confirm(`Are you sure you wish to remove Project "${project.name}"?`))
            {
                this.projectService.deleteProject(pid)
                .pipe(first())
                .subscribe({
                    next: () => {
                        this.alertService.success('Delete successful',{ autoClose: true});
                        // splice removes element without refreshing
                        var index: number = this.projects.indexOf(project);
                        if(index !== -1)
                        {
                            this.projects.splice(index, 1);
                        }
                    },
                    error: error => {
                        this.alertService.error(error,{ autoClose: true});
                        this.loading = false;
                    }
                });
            }
            else
            {
                this.alertService.error("Not Authorized",{ autoClose: true})
            }
            this.loading = false;
        });
    }

    // adds list of user ids as team members on project.
    addTeamMembers(pid: string)
    {
        var hasRole = this.accountService.checkRole(role.RiskManager)
        .subscribe(hasRole => 
        {
            if(hasRole)
            {
                this.projectService.addTeamMembers(pid, this.selectedUsers)
                .pipe(first())
                .subscribe({
                    next: () => {
                        this.alertService.success('Added Team Members successfully',{ autoClose: true});
                        this.selectedUsers = [];
                        this.projectService.getAll(this.user).subscribe(projects => this.projects = projects);
                    },
                    error: error => {
                        this.alertService.error(error,{ autoClose: true});
                        this.loading = false;
                    }
                });
            }
            else
            {
                this.alertService.error("Not Authorized",{ autoClose: true})
            }
            this.loading = false;
        });
    }

    // promotes or demotes target user as team leader. 
    promote(pid: string, user: any, project: Project){
        var hasRole = this.accountService.checkRole(role.RiskManager)
        .subscribe(hasRole => 
        {
            if(hasRole)
            {
                var proceed;
                if(user.teamLeader){
                    proceed = confirm(`Are you sure you wish to demote user ${user.name}? from Team Leader?`)
                }
                else{
                    proceed = confirm(`Are you sure you wish to promote user ${user.name} to Team Leader?`)
                }
                if(proceed)
                {
                    this.projectService.AddRemoveLeaderRole(pid, user.userId)
                    .subscribe({
                        next: () => {
                            user.teamLeader = !user.teamLeader;
                            project.team = project.team.sort((x, y) => {
                                if(x.teamLeader < y.teamLeader) { return 1; }
                                if(x.teamLeader > y.teamLeader){ return -1; }
                                return 0;
                            });
                        },
                        error: error => 
                        {
                            this.alertService.error(error,{ autoClose: true});
                            this.loading = false;
                        }

                    });
                }
            }
        });
    }

    // removes selcted user from team.
    removeTeamMember(project: any, user: any){
        var pid, uid: string;
        uid = user.userId;
        pid = project.id;
        var hasRole = this.accountService.checkRole(role.Admin)
        .subscribe(hasRole => 
        {
            if(hasRole && confirm(`Are you sure you wish to remove user ${user.name} as a Team Member?`))
            {
                this.projectService.removeTeamMember(pid, uid)
                .pipe(first())
                .subscribe({
                    next: () => {
                        this.alertService.success('Team Member removed successfully',{ autoClose: true});
                        // splice removes element without refreshing
                        var index: number = project.team.indexOf(user);
                        if(index !== -1)
                        {
                            project.team.splice(index, 1);
                        }
                    },
                    error: error => {
                        this.alertService.error(error,{ autoClose: true});
                        this.loading = false;
                    }
                });
            }
            else
            {
                this.alertService.error("Not Authorized",{ autoClose: true})
            }
            this.loading = false;
        });
    }
}