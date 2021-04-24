import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RiskRoutingModule } from './risk-routing.module'
import { EditRiskComponent } from './edit-risk/edit-risk.component';
import { MitigationListComponent } from '../mitigation-list/mitigation-list.component';
import { MitigationListItem } from '../mitigation-list/mitigation-list-item/mitigation-list-item.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RiskRoutingModule,
        NgSelectModule,
        FormsModule
    ],
    declarations: [
        EditRiskComponent,
        MitigationListComponent,
        MitigationListItem
    ]
})
export class RiskModule { }