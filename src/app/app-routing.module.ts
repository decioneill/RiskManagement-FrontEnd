import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AdminAuthGuard, AuthGuard, RiskManagerAuth } from './helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./userManagement/users.module').then(x => x.UsersModule);
const projectsModule = () => import('./projectManagement/projects.module').then(x => x.ProjectsModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'user-management', loadChildren: usersModule, canActivate: [RiskManagerAuth]},    
    { path: 'project-management', loadChildren: projectsModule, canActivate: [AdminAuthGuard]},
    { path: 'account', loadChildren: accountModule },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }