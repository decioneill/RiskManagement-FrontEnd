import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Project } from '../models/project';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private projectSubject: BehaviorSubject<Project>;
    public project: Observable<Project>;

    private apiDir = "project";

    constructor(private router: Router, private http: HttpClient) {
        this.projectSubject = new BehaviorSubject<Project>(JSON.parse(localStorage.getItem('project')));
        this.project = this.projectSubject.asObservable();
    }

    public get projectValue(): Project {
        return this.projectSubject.value;
    }

    getAll() {
        var list = this.http.get<Project[]>(`${environment.apiUrl}/${this.apiDir}`)
        return list;
    }

    getById(id: string) {
        return this.http.get<Project>(`${environment.apiUrl}/${this.apiDir}/${id}`);
    }

    remove(Pid: string, Uid: string) {
    }
}
