import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService, MitigationService} from '../services';
import { Location } from '@angular/common';

@Component({
  selector: 'edit-mitigation-pane',
  templateUrl: 'edit-mitigation.component.html'
})
export class EditMitigationComponent implements OnInit {
  form: FormGroup;
  riskid: number;
  id: number;
  isAdd: boolean;
  submitted = false;
  loading = false;

  constructor(private route: ActivatedRoute, 
    public mitigationService: MitigationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private location: Location) {} 

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAdd = this.id == 0 ? true: false;
    this.riskid = this.route.snapshot.queryParams['riskid'];
    this.form = this.formBuilder.group({
        name: ['', ],
        description:['',],
        riskid:[this.riskid,]
    });
    if(!this.isAdd){
      this.mitigationService.getMitigationById(this.id.toString())
      this.mitigationService.mitigation.subscribe(x => this.form.patchValue(x));
    }
  }

  onSubmit(){
    this.submitted = false;
    if (this.form.valid) {
      this.loading = true;
      if(!this.isAdd) {
        // this.mitigationService.updateMitigation(this.id, this.form.value).subscribe(
        //     response => {
        //         this.alertService.success('Updated successfully',{ autoClose: true})},
        //     error => {
        //         this.alertService.error(error, { autoClose: true})})
      }
      else {
        // result = this.mitigationService.createMitigation(this.projectid, this.form.value)
        // result.subscribe(
        //     response => {
        //         this.router. navigate(['/edit-risk',response.id.toString()], {queryParams: {projectid: this.projectid}});
        //         this.alertService.success('Added successful',{ autoClose: true})},
        //     error => {
        //         this.alertService.error(error, { autoClose: true})})
      }
      this.loading = false;
    }
  }  

  goBack(){
    this.location.back()
  }
}
