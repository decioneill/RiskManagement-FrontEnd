import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditMitigationComponent } from './edit-mitigation.component';
import { MitigationRoutingModule } from './mitigation-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        MitigationRoutingModule,
        FormsModule
    ],
    declarations: [EditMitigationComponent]
})
export class MitigationModule { }