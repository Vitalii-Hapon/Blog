import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from './core/layouts/admin-layout/admin-layout.component';
import {LoginPageComponent} from './core/pages/login-page/login-page.component';
import {DashboardPageComponent} from './core/pages/dashboard-page/dashboard-page.component';
import {CreatePageComponent} from './core/pages/create-page/create-page.component';
import {EditPageComponent} from './core/pages/edit-page/edit-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'dashboard', component: DashboardPageComponent},
      {path: 'create', component: CreatePageComponent},
      {path: 'post-title/:id/edit', component: EditPageComponent},
    ]
  }
];

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AdminModule {

}

