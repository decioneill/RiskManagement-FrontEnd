import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService, RiskService } from '../../services';
import { Location } from '@angular/common';

@Component({
  selector: 'edit-risk-pane',
  templateUrl: 'edit-risk.component.html',
  styleUrls: ['edit-risk.component.css']
})
export class EditRiskComponent implements OnInit {
  form: FormGroup;
  projectid: number;
  id: number;
  isAdd: boolean;
  submitted = false;
  loading = false;

  constructor(private route: ActivatedRoute, 
    public riskService: RiskService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private location: Location) {} 

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAdd = this.id == 0 ? true: false;
    this.projectid = this.route.snapshot.queryParams['projectid'];
    this.form = this.formBuilder.group({
        shortDescription: ['', ],
        description:['',],
        projectid:[this.projectid,]
    });
    if(!this.isAdd){
      this.riskService.getRiskById(this.id.toString())
      .pipe(first())
      .subscribe(x => this.form.patchValue(x[0]));
    }
  }

  onSubmit(){
    this.submitted = false;
    if (this.form.valid) {
      this.loading = true;
      var result;
      if(!this.isAdd) {
        result = this.riskService.updateRisk(this.id, this.form.value)
        if(result != null)
        {
          this.alertService.success('Updated successful',{ autoClose: true});
        }
        else
        {
          this.alertService.error(result, { autoClose: true});
        }
      }
      else {
        result = this.riskService.createRisk(this.projectid, this.form.value)
        result.subscribe(
          response => {
            this.router. navigate(['/edit-risk',response.id.toString()], {queryParams: {projectid: this.projectid}});
            this.alertService.success('Added successful',{ autoClose: true})},
          error => {
            this.alertService.error(error, { autoClose: true})}
        )
      }
      this.riskService.getRiskById(this.id.toString()).subscribe().unsubscribe();
      this.loading = false;
    }
  }
  
  goBack(){
    this.location.back()
  }

}
