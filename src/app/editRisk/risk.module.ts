import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RiskRoutingModule } from './risk-routing.module'
import { EditRiskComponent } from './edit-risk/edit-risk.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RiskRoutingModule,
        NgSelectModule,
        FormsModule
    ],
    declarations: [
        EditRiskComponent
    ]
})
export class RiskModule { }