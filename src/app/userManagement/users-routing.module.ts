import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../layout.component';
import { UserListComponent } from './userList.component';
import { AddEditComponent } from './add-edit.component';
import { AdminAuthGuard } from '../helpers';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: UserListComponent,  },
            { path: 'add', component: AddEditComponent, canActivate: [AdminAuthGuard]},
            { path: 'edit/:id', component: AddEditComponent, canActivate: [AdminAuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }