import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../models/project';

@Component({
  selector: 'app-risk-register-list',
  templateUrl: './risk-register-list.component.html',
  styleUrls: ['./risk-register-list.component.css']
})
export class RiskRegisterListComponent implements OnInit {

  @Input() project2: Project;

  constructor() { }

  ngOnInit(): void {
  }

}
