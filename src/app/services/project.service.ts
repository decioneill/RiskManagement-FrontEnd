import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Project } from '../models/project';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private private_projects;
    private projectsSubject = new Subject();
    public projects = this.projectsSubject.asObservable();
    
    private private_project;
    private projectSubject = new Subject();
    public project = this.projectSubject.asObservable();

    private apiDir = "project";

    constructor(private router: Router, private http: HttpClient) {
    }

    // creates new project of name
    createProject(name: Project){
        return this.http.post<string>(`${environment.apiUrl}/${this.apiDir}/createproject`, name);
    }

    // removes project
    deleteProject(id: string){
        return this.http.delete(`${environment.apiUrl}/${this.apiDir}/${id}`);        
    }

    // returns list of all projects
    getAll(user: User) {
        var list = this.http.get<Project>(`${environment.apiUrl}/${this.apiDir}?uid=${user.id}`)
        return list;
    }

    // returns project of id
    getById(id: number) {
        if(id != undefined){
            return this.http.get<Project>(`${environment.apiUrl}/${this.apiDir}/${id}`).subscribe(response => {
                this.private_project = response;
                this.projectSubject.next(this.private_project);
            });
        }
    }

    // removes user from team
    removeTeamMember(pid: string, uid: string) {
        return this.http.delete(`${environment.apiUrl}/${this.apiDir}/${pid}/${uid}`);        
    }

    // retrieves list of users not on team
    getNonMembers(pid: string){
        return this.http.get<Map<string, string>>(`${environment.apiUrl}/${this.apiDir}/${pid}/getnonmembers`)
    }

    // creates user project association
    addTeamMembers(pid: string, users: Array<string>){        
        return this.http.post(`${environment.apiUrl}/${this.apiDir}/${pid}/createTeamMembers`, users);
    }

    // toggles target team members leadership role
    AddRemoveLeaderRole(pid: string, teamid: string){
        return this.http.get(`${environment.apiUrl}/${this.apiDir}/${pid}/${teamid}/switchleaderrole`);
    }

    // gets a list of projects user can access.
    getUserProjects(uid: string){
        return this.http.get(`${environment.apiUrl}/${this.apiDir}/${uid}/userprojects`).subscribe(response => {
            this.private_projects = response;
            this.projectsSubject.next(this.private_projects)
        });
    }
}
