import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AdminAuthGuard, AuthGuard, RiskManagerAuth } from './helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./userManagement/users.module').then(x => x.UsersModule);
const projectsModule = () => import('./projectManagement/projects.module').then(x => x.ProjectsModule);
const riskRegister = () => import('./riskRegister/riskRegister.module').then(x => x.RiskRegisterModule);
const riskModule = () => import('./editRisk/risk.module').then(x => x.RiskModule);
const mitigationModule = () => import('./editMitigation/mitigation.module').then(x => x.MitigationModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'edit-users', loadChildren: usersModule, canActivate: [RiskManagerAuth]},    
    { path: 'edit-projects', loadChildren: projectsModule, canActivate: [AdminAuthGuard]},
    { path: 'risk-register', loadChildren: riskRegister, canActivate: [AuthGuard]},
    { path: 'account', loadChildren: accountModule },
    { path: 'edit-risk', loadChildren:  riskModule, canActivate: [AuthGuard]},
    { path: 'edit-mitigation', loadChildren:  mitigationModule, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }