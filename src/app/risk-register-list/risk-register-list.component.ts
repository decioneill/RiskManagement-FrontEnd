import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { AccountService, RiskService } from '../services';

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

  constructor(public accountService: AccountService, public riskService: RiskService) { }

  ngOnInit(){  
    this.user = this.accountService.userValue;
    this.currentProject = new Project()
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.currentProject = changes.currentProject.currentValue;
    this.riskService.GetSimpleRisksByUserId(this.currentProject.id.toString(), this.user.id.toString())
  }
}
