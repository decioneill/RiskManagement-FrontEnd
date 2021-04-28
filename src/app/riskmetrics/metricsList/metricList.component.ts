import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';
import { SimpleRisk } from 'src/app/models';
import { Project } from '../../models/project';
import { AccountService, AlertService, RiskService } from '../../services';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
};

@Component({
  selector: 'metric-list',
  templateUrl: './metriclist.component.html'
})
export class MetricListComponent implements OnChanges {
    @ViewChild("irchart") irchart: ChartComponent;
    public ChartOptions: Partial<ChartOptions>;
    @Input() currentProject: Project;
    hasSelected: boolean;
    user;

    constructor(public accountService: AccountService, public riskService: RiskService, public alertService: AlertService) {
        this.ChartOptions = {            
            series: [],
            chart: {
                type: "donut"
            },
            labels: [],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                    width: 200
                    },
                    legend: {
                    position: "bottom"
                    }
                }
            }
        ]};
    }

    ngOnInit(){  
        this.user = this.accountService.userValue;
        this.currentProject = new Project()
    }
    
    ngOnChanges(changes: SimpleChanges) {
        this.currentProject = changes.currentProject.currentValue;
        this.riskService.getSimpleRisksByUserId(this.currentProject.id.toString(), this.user.id.toString())
        this.riskService.risklist.subscribe((result: SimpleRisk[]) => {
            // Inherent chart
            const irmap = result.map(risk => risk.inherentRiskScore);
            let reducedir = irmap.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
            this.ChartOptions.series = [...reducedir.values()];
            this.ChartOptions.labels = [...reducedir.keys()];
        })
    }
}
