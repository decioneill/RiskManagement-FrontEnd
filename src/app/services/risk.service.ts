import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Risk } from '../models/risk';

@Injectable({  providedIn: 'root'})
export class RiskService {
  private private_riskList;
  private riskListSubject = new Subject();
  public risklist = this.riskListSubject.asObservable();
  
  private private_risk;
  private riskSubject = new Subject();
  public risk = this.riskSubject.asObservable();
  
  private private_riskproperties;
  private riskpropertiesSubject = new Subject();
  public riskproperties = this.riskpropertiesSubject.asObservable();
  
  private apiDir = "risk";

  public success = false;

  constructor(private router: Router, private http: HttpClient) {     
  }

  getSimpleRisksByUserId(pid: string, uid: string){
    return this.http.get(`${environment.apiUrl}/${this.apiDir}/${pid}/${uid}/short`).subscribe(response => {
        this.private_riskList = response;
        this.riskListSubject.next(this.private_riskList);
    });    
  }

  getRiskById(rid: string){
    var result = this.http.get<Risk>(`${environment.apiUrl}/${this.apiDir}/${rid}`);
    result.pipe(first())
    .subscribe(response => {
      this.private_risk = response;
      this.riskSubject.next(this.private_risk[0]);
    });
    return result
  }

  getRiskProperties(rid: string)
  {
    var result = this.http.get(`${environment.apiUrl}/${this.apiDir}/${rid}/riskproperties`);
    result.pipe(first())
    .subscribe(response => {
      this.private_riskproperties = response;
      this.riskpropertiesSubject.next(this.private_riskproperties);
    });
    return result
  }

  updateRisk(id: Number, params){    
    return this.http.put(`${environment.apiUrl}/${this.apiDir}/${id}`, params);
  }

  createRisk(pid: Number, params)
  {
    return this.http.post<Risk>(`${environment.apiUrl}/${this.apiDir}/newrisk/${pid}`, params);
  }

  deleteRisk(rid: Number)
  {
    return this.http.delete(`${environment.apiUrl}/${this.apiDir}/${rid}`);
  }
}
