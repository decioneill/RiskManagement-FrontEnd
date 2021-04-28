import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
};

@Component({
    selector: 'donut-chart',
    templateUrl: './donutchart.component.html'
})
export class DonutChartComponent implements OnChanges {
    @ViewChild("chart") chart: ChartComponent;
    @Input() ChartOptions: Partial<ChartOptions>;
    @Input() title: string;

    constructor() {
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
    ]};}
    
    ngOnChanges(changes: SimpleChanges) {

    }
}