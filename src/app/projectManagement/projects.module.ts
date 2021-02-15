import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { LayoutComponent } from './layout.component';
import { ProjectListComponent } from './projectList.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProjectsRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ProjectListComponent
    ]
})
export class ProjectsModule { }