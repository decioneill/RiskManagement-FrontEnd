import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import { role } from '../models';
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
    
    ngOnInit() {
        this.user = this.accountService.userValue
        this.form = this.formBuilder.group({
            name: ['', Validators.required]});
        this.projectService.getAll().subscribe(projects => this.projects = projects);  
    }

    // create alias
    get f() { return this.form.controls; }

    getNonMembers(pid: string){
        this.projectService.getNonMembers(pid).subscribe(nonMembers => this.nonMembers = nonMembers);
    }

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
                            this.projectService.getAll().subscribe(projects => this.projects = projects);  
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

    deleteProject(pid: string)
    {
        var hasRole = this.accountService.checkRole(role.Admin)
        .subscribe(hasRole => 
            {
                if(hasRole)
                {
                    this.projectService.deleteProject(pid)
                    .pipe(first())
                    .subscribe({
                        next: () => {
                            this.alertService.success('Delete successful',{ autoClose: true});
                            this.projectService.getAll().subscribe(projects => this.projects = projects);
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

    addTeamMember(pid: string){
    }

    removeTeamMember(pid: string, uid: string){
        var hasRole = this.accountService.checkRole(role.Admin)
        .subscribe(hasRole => 
            {
                if(hasRole)
                {
                    this.projectService.removeTeamMember(pid, uid)
                    .pipe(first())
                    .subscribe({
                        next: () => {
                            this.alertService.success('Team Member removed successfully',{ autoClose: true});
                            this.projectService.getAll().subscribe(projects => this.projects = projects);
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