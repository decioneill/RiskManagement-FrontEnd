import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, MitigationService} from '../services';
import { Location } from '@angular/common';
import { Mitigation, MitigationStatusType } from '../models';

@Component({
  selector: 'edit-mitigation-pane',
  templateUrl: 'edit-mitigation.component.html'
})
export class EditMitigationComponent implements OnInit {
  form: FormGroup;
  riskid: number;
  id: string;
  isAdd: boolean;
  submitted = false;
  loading = false;
  status = 0;

  constructor(private route: ActivatedRoute, 
    public mitigationService: MitigationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private location: Location) {} 

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAdd = this.id == "0" ? true: false;
    this.riskid = this.route.snapshot.queryParams['riskid'];
    this.form = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(6)]],
        description:['',],
        riskid:[this.riskid,],        
        reviewDate:[, Validators.required],     
        currentStatus:['0',]
    });
    if(!this.isAdd){
      this.mitigationService.getMitigationById(this.id.toString())
      this.mitigationService.mitigation.subscribe(x => {
        this.form.patchValue(x)
        this.status = x['currentStatus']
      });
    }
  }

  onSubmit(){
    var success = false;
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      if(!this.isAdd) {
        this.mitigationService.updateMitigation(this.id, this.form.value).subscribe(
            response => {
                this.alertService.success('Updated successfully',{ autoClose: true})
                success = true},                
            error => {
                this.alertService.error(error, { autoClose: true})})
      }
      else {
        var result = this.mitigationService.createMitigation(this.riskid, this.form.value)
        result.subscribe(
            response => {
              this.isAdd = false;
              this.id = response.id.toString();
              this.router. navigate(['/edit-mitigation',response.id.toString()], {queryParams: {riskid: this.riskid}});
              this.alertService.success('Added successful',{ autoClose: true})              
              this.mitigationService.getMitigationById(response.id.toString())
              this.mitigationService.mitigation.subscribe(x => {
                this.form.patchValue(x)
                this.status = x['currentStatus']
              });
              success = true},                
            error => {
                this.alertService.error(error, { autoClose: true})})
      }
      this.loading = false;
      return success
    }
  }  
  getStatusName(status: number)
  {
    if(this.isAdd){
      return "New Mitigation"
    }
    var type = MitigationStatusType[status];
    return type
  }

  goBack(){
    this.location.back()
  }

  changeStatus(mitigation: Mitigation){
    var result = false;
    var oldStatus = mitigation.currentStatus;
    switch(mitigation.currentStatus){
      case MitigationStatusType['Under Consideration']:{
        if(confirm(`Approve Mitigation?`)){
          mitigation.currentStatus = MitigationStatusType.Accepted
          this.status = mitigation.currentStatus
          this.form.controls['currentStatus'].patchValue(this.status.toString())
        }
        break;
      }
      case MitigationStatusType['Accepted']:{
        if(confirm(`Has Mitigation undergone initial review?`)){
          mitigation.currentStatus = MitigationStatusType.Ongoing
          this.status = mitigation.currentStatus
          this.form.controls['currentStatus'].patchValue(this.status.toString())
        }
        break;
      }
      case MitigationStatusType['To Be Reviewed']:{}
      case MitigationStatusType['Ongoing']:{
        if(confirm(`Is Mitigation to be Closed?`)){
          mitigation.currentStatus = MitigationStatusType.Closed
          this.status = mitigation.currentStatus
          this.form.controls['currentStatus'].patchValue(this.status.toString())
        }
        break;
      }
      case MitigationStatusType['Closed']:{
        if(confirm(`Should Mitigation be reopened for Review?`)){
          mitigation.currentStatus = MitigationStatusType['To Be Reviewed']
          this.status = mitigation.currentStatus
          this.form.controls['currentStatus'].patchValue(this.status.toString())
        }
        break;
      }
    }
    if(!this.onSubmit()){
      mitigation.currentStatus = oldStatus
      this.status = mitigation.currentStatus
      this.form.controls['currentStatus'].patchValue(this.status.toString())
    }
  }
}
