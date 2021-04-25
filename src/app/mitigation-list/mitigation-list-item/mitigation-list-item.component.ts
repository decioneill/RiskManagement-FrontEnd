import { Component, Input, OnInit } from '@angular/core';
import { Mitigation } from 'src/app/models';

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
}

enum MitigationStatusType {
    "Under Consideration" = 0,
    "Accepted" = 1,
    "Ongoing" = 2,
    "To Be Reviewed" = 3,
    "Closed" = 4
}