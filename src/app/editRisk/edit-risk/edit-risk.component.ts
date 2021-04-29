import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService, RiskService } from '../../services';
import { Location } from '@angular/common';
import { Riskproperty } from 'src/app/models';

@Component({
  selector: 'edit-risk-pane',
  templateUrl: 'edit-risk.component.html'
})
export class EditRiskComponent implements OnInit {
  form: FormGroup;
  projectid: number;
  id: number;
  isAdd: boolean;
  submitted = false;
  loading = false;
  inherentRiskScore: number;
  residualRiskScore: number;
  futureRiskScore: number;

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
        projectid:[this.projectid,],
        inherentLikelihood:[1,],
        inherentImpact:[1,],
        inherentRiskScore:[1,],
        residualLikelihood:[1,],
        residualImpact:[1,],
        residualRiskScore:[1,],
        futureLikelihood:[1,],
        futureImpact:[1,],
        futureRiskScore:[1,]
    });
    if(!this.isAdd){
      this.riskService.getRiskById(this.id.toString())
      .pipe(first())
      .subscribe(x => this.form.patchValue(x[0]));  
      this.getRiskProperties()
    }
  }

  onSubmit(){
    this.submitted = false;
    if (this.form.valid) {
      this.loading = true;
      var result;
      if(!this.isAdd) {
        this.riskService.updateRisk(this.id, this.form.value)
        .subscribe(       
          response => {
            this.alertService.success('Updated successfully',{ autoClose: true})},
          error => {
            this.alertService.error(error, { autoClose: true})}
        )
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
      this.riskService.getRiskById(this.id.toString()).subscribe(() => this.getRiskProperties()).unsubscribe();
      this.loading = false;
    }
  }
  
  getRiskProperties(){    
    this.riskService.getRiskProperties(this.id.toString()).subscribe().unsubscribe();
    this.riskService.riskproperties.subscribe((x: Riskproperty[]) => {
      var il = x.find((risk: Riskproperty) => risk.propertyId == 0).propertyValue
      var ii = x.find((risk: Riskproperty) => risk.propertyId == 1).propertyValue
      var rl = x.find((risk: Riskproperty) => risk.propertyId == 2).propertyValue
      var ri = x.find((risk: Riskproperty) => risk.propertyId == 3).propertyValue
      var fl = x.find((risk: Riskproperty) => risk.propertyId == 4).propertyValue
      var fi = x.find((risk: Riskproperty) => risk.propertyId == 5).propertyValue
      this.form.controls['inherentImpact'].patchValue(ii)
      this.form.controls['inherentLikelihood'].patchValue(il)
      this.form.controls['residualImpact'].patchValue(ri)
      this.form.controls['residualLikelihood'].patchValue(rl)
      this.form.controls['futureImpact'].patchValue(fi)
      this.form.controls['futureLikelihood'].patchValue(fl)
      this.getRiskScore(0, true)
    })
  }

  goBack(){
    this.location.back()
  }

  getRiskScore(i: number, all = false){
    if(all){
      i = 0;
    }
    switch(i)
    {
      case 0: {
        this.inherentRiskScore = this.form.get('inherentImpact').value * this.form.get('inherentLikelihood').value;
        this.form.patchValue({inherentRiskScore: this.inherentRiskScore});
        if(!all) { break;}
      }
      case 1: {
        this.residualRiskScore = this.form.get('residualImpact').value * this.form.get('residualLikelihood').value;
        this.form.patchValue({residualRiskScore: this.residualRiskScore});
        if(!all) { break;}
      }
      case 2: {
        this.futureRiskScore = this.form.get('futureImpact').value * this.form.get('futureLikelihood').value;
        this.form.patchValue({futureRiskScore: this.futureRiskScore});
        break;
      }
    }
  }
}
