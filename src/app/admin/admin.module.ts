import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

import {AdminLayoutComponent} from './core/layouts/admin-layout/admin-layout.component';
import {LoginPageComponent} from './core/pages/login-page/login-page.component';
import {DashboardPageComponent} from './core/pages/dashboard-page/dashboard-page.component';
import {CreatePageComponent} from './core/pages/create-page/create-page.component';
import {EditPageComponent} from './core/pages/edit-page/edit-page.component';
import {AuthGuard} from './core/services/auth.guard';
import {PostFilterPipe} from '../shared/pipes/post-filter.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import {AlertService} from './core/services/alert.service';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
      {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
      {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    PostFilterPipe,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AlertService
  ]
})

export class AdminModule {

}

