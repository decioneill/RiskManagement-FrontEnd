import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({  providedIn: 'root'})
export class RiskService {
  private private_riskList;
  private riskListSubject = new Subject();
  public risklist = this.riskListSubject.asObservable();
  
  private apiDir = "risk";

  constructor(private router: Router, private http: HttpClient) {     
  }

  GetSimpleRisksByUserId(pid: string, uid: string){
    return this.http.get(`${environment.apiUrl}/${this.apiDir}/${pid}/${uid}/short`).subscribe(response => {
        this.private_riskList = response;
        this.riskListSubject.next(this.private_riskList);
    });    
  }
}
