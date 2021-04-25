import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, MitigationService} from '../services';
import { Location } from '@angular/common';
import { MitigationStatusType } from '../models';

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
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      if(!this.isAdd) {
        this.mitigationService.updateMitigation(this.id, this.form.value).subscribe(
            response => {
                this.alertService.success('Updated successfully',{ autoClose: true})},
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
              });},
            error => {
                this.alertService.error(error, { autoClose: true})})
      }
      this.loading = false;
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
}
