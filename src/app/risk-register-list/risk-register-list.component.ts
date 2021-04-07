import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { role, SimpleRisk } from '../models';
import { Project } from '../models/project';
import { Risk } from '../models/risk';
import { AccountService, AlertService, RiskService } from '../services';

@Component({
  selector: 'app-risk-register-list',
  templateUrl: './risk-register-list.component.html',
  styleUrls: ['./risk-register-list.component.css']
})
export class RiskRegisterListComponent implements OnChanges {
  @Input() currentProject: Project;
  hasSelected: boolean;
  user;
  risks;

  constructor(public accountService: AccountService, public riskService: RiskService, public alertService: AlertService) { }

  ngOnInit(){  
    this.user = this.accountService.userValue;
    this.currentProject = new Project()
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.currentProject = changes.currentProject.currentValue;
    this.riskService.getSimpleRisksByUserId(this.currentProject.id.toString(), this.user.id.toString())
  }

  deleteRisk(risk: Risk){
    var hasRole = this.accountService.checkRole(role.Admin)
      .subscribe(hasRole => 
      {
        if(hasRole && confirm(`Are you sure you wish to Delete Risk "${risk.shortDescription}"?`))
        {
          this.riskService.deleteRisk(risk.id)
          .pipe(first())
          .subscribe({
              next: () => {
                this.alertService.clear();
                this.alertService.success('Delete successful',{ autoClose: true});
                this.riskService.getSimpleRisksByUserId(this.currentProject.id.toString(), this.user.id.toString())
              },
              error: error => {
                this.alertService.error(error,{ autoClose: true});
              }
          });
        }
        else
        {
          this.alertService.error("Not Authorized",{ autoClose: true})
        }
      });
  }
}
