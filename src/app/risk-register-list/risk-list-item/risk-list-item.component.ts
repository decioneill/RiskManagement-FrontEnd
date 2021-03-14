import { Component, Input, OnInit } from '@angular/core';
import { SimpleRisk } from 'src/app/models';

@Component({
  selector: 'app-risk-list-item',
  templateUrl: './risk-list-item.component.html',
  styleUrls: ['./risk-list-item.component.css']
})
export class RiskListItemComponent implements OnInit {
  @Input() simpleRisk: SimpleRisk;

  constructor() { }

  ngOnInit(): void {
  }

}
