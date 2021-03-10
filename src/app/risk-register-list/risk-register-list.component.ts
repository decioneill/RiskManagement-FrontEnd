import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from '../services';

@Component({
  selector: 'app-risk-register-list',
  templateUrl: './risk-register-list.component.html',
  styleUrls: ['./risk-register-list.component.css']
})
export class RiskRegisterListComponent implements OnChanges {
  @Input() currentProject: Project;
  hasSelected: boolean;

  constructor(public projectService: ProjectService) { }

  ngOnInit(){  
    this.currentProject = new Project()
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.currentProject = changes.currentProject.currentValue;
  }

}
