import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { MetricsRoutingModule,  } from './metrics-routing.module';
import { MetricsComponent } from './metrics.component';
import { MetricListComponent } from './metricsList/metricList.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DonutChartComponent } from './metricsList/donutchart.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MetricsRoutingModule,        
        NgSelectModule,
        FormsModule,
        NgApexchartsModule
    ],
    declarations: [
        MetricsComponent,
        MetricListComponent,
        DonutChartComponent
    ]
})
export class MetricsModule { }