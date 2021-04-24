import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
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

  constructor(public accountService: AccountService, public mitigationService: MitigationService, public alertService: AlertService) { }

  ngOnInit(){      
    this.mitigationService.getMitigationsByRiskId(this.currentRisk.id.toString())
  }
  
  ngOnChanges(changes: SimpleChanges) {
  }
}
