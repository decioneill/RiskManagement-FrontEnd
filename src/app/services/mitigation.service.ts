import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Mitigation } from '../models';
import { Risk } from '../models/risk';

@Injectable({  providedIn: 'root'})
export class MitigationService {
  private private_mitigationList;
  private mitigationListSubject = new Subject();
  public mitigationList = this.mitigationListSubject.asObservable();
  
  private private_mitigation;
  private mitigationSubject = new Subject();
  public mitigation = this.mitigationSubject.asObservable();

  private apiDir = "mitigation";

  public success = false;

  constructor(private router: Router, private http: HttpClient) {     
  }

  getMitigationsByRiskId(rid: string){
    return this.http.get(`${environment.apiUrl}/${this.apiDir}/${rid}/mitigations`).subscribe(response => {
        this.private_mitigationList = response;
        this.mitigationListSubject.next(this.private_mitigationList);
    });    
  }

  getMitigationById(mid: string){
    return this.http.get(`${environment.apiUrl}/${this.apiDir}/${mid}`).subscribe(response => {
      this.private_mitigation = response;
      this.mitigationSubject.next(this.private_mitigation);
    });  
  }

  updateMitigation(mid: string, params){
    return this.http.put(`${environment.apiUrl}/${this.apiDir}/${mid}`, params);
  }
  
  createMitigation(rid: Number, params)
  {
    return this.http.post<Mitigation>(`${environment.apiUrl}/${this.apiDir}/newmitigation/${rid}`, params);
  }

  deleteMitigationFromRisk(mid: string, rid: string)
  {
    return this.http.delete(`${environment.apiUrl}/${this.apiDir}/${mid}/${rid}`);
  }
}
