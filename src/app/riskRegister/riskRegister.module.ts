import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RiskRegisterComponent } from './riskRegister.component';
import { RiskRegisterRoutingModule } from './RiskRegister-routing.module';
import { RiskListItemComponent, RiskRegisterListComponent } from '../risk-register-list';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RiskRegisterRoutingModule,        
        NgSelectModule,
        FormsModule
    ],
    declarations: [        
        RiskRegisterComponent,
        RiskRegisterListComponent,
        RiskListItemComponent
    ]
})
export class RiskRegisterModule { }