import { Component, Input, OnInit } from '@angular/core';
import { Mitigation, MitigationStatusType } from 'src/app/models';

@Component({
  selector: 'mitigation-list-item',
  templateUrl: './mitigation-list-item.component.html'
})
export class MitigationListItem implements OnInit {
  @Input() mitigation: Mitigation;

  constructor() { }

  ngOnInit(): void {
  }

  getStatusName(i: number) {
      var type = MitigationStatusType[i];
      return type
  }

  getFormattedDate(dt: any){
    var date = new Date(dt)
    var formatted = date.toLocaleString();
    return formatted
  }
}
