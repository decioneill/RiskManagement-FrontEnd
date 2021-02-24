import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectListComponent } from './projectList.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProjectsRoutingModule,
        NgSelectModule,
        FormsModule
    ],
    declarations: [        
        ProjectListComponent
    ]
})
export class ProjectsModule { }