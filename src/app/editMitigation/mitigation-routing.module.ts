import { NgModule } from '@angular/core';
import { LayoutComponent } from '../layout.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helpers';
import { EditMitigationComponent } from './edit-mitigation.component';

const routes: Routes = [
  {
      path: '', component: LayoutComponent,
      children: [
          { path: ':id', component: EditMitigationComponent, canActivate: [AuthGuard]}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MitigationRoutingModule { }
