import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { role, Mitigation } from '../models';
import { Risk } from '../models/risk';
import { AccountService, AlertService, MitigationService} from '../services';

@Component({
  selector: 'mitigation-list',
  templateUrl: './mitigation-list.component.html'
})
export class MitigationListComponent implements OnChanges {
  @Input() currentRisk: Risk;
  hasSelected: boolean;
  mitigations;
  user;

  constructor(public accountService: AccountService, public mitigationService: MitigationService, public alertService: AlertService) { }

  ngOnInit(){    
    this.user = this.accountService.userValue;    
    this.mitigationService.getMitigationsByRiskId(this.currentRisk.id.toString())
  }
  
  ngOnChanges(changes: SimpleChanges) {
  }

  
  deleteMitigation(mitigation: Mitigation){
    var hasRole = this.accountService.checkRole(role.Admin).subscribe(hasRole => {
        if(hasRole && confirm(`Are you sure you wish to remove Mitigation "${mitigation.name}" from risk "${this.currentRisk.shortDescription}"?`))
        {
          this.mitigationService.deleteMitigationFromRisk(mitigation.id.toString(), this.currentRisk.id.toString())
          .pipe(first())
          .subscribe({
              next: () => {
                this.alertService.clear();
                this.alertService.success('Delete successful',{ autoClose: true});
                this.mitigationService.getMitigationsByRiskId(this.currentRisk.id.toString())
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
