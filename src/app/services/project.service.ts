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

    createProject(name: Project){
        return this.http.post<string>(`${environment.apiUrl}/${this.apiDir}/createproject`, name);
    }

    deleteProject(id: string){
        return this.http.delete(`${environment.apiUrl}/${this.apiDir}/${id}`);        
    }

    getAll(user: User) {
        var list = this.http.get<Project>(`${environment.apiUrl}/${this.apiDir}?uid=${user.id}`)
        return list;
    }

    getById(id: number) {
        if(id != undefined){
            return this.http.get<Project>(`${environment.apiUrl}/${this.apiDir}/${id}`).subscribe(response => {
                this.private_project = response;
                this.projectSubject.next(this.private_project);
            });
        }
    }

    removeTeamMember(pid: string, uid: string) {
        return this.http.delete(`${environment.apiUrl}/${this.apiDir}/${pid}/${uid}`);        
    }

    getNonMembers(pid: string){
        return this.http.get<Map<string, string>>(`${environment.apiUrl}/${this.apiDir}/${pid}/getnonmembers`)
    }

    addTeamMembers(pid: string, users: Array<string>){        
        return this.http.post(`${environment.apiUrl}/${this.apiDir}/${pid}/createTeamMembers`, users);
    }

    AddRemoveLeaderRole(pid: string, teamid: string){
        return this.http.get(`${environment.apiUrl}/${this.apiDir}/${pid}/${teamid}/switchleaderrole`);
    }

    getUserProjects(uid: string){
        return this.http.get(`${environment.apiUrl}/${this.apiDir}/${uid}/userprojects`).subscribe(response => {
            this.private_projects = response;
            this.projectsSubject.next(this.private_projects)
        });
    }
}
