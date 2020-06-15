import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './core/layouts/main-layout/main-layout.component';
import {HomePageComponent} from './core/pages/home-page/home-page.component';
import {PostPageComponent} from './core/pages/post-page/post-page.component';
import {EditPageComponent} from './admin/core/pages/edit-page/edit-page.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'post/:id', component: PostPageComponent},
      // {path: 'post/:id/edit', component: EditPageComponent}
    ]
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
