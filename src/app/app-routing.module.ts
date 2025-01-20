import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { RoleGuard } from './guards/role.guard';
import { UserSettingsPanelComponent } from './pages/user-settings-panel/user-settings-panel.component';
import { LoginComponent } from './pages/login/login.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ProductsComponent } from './pages/products/products.component';
const routes: Routes = [
  { path: '', redirectTo: 'users-settings', pathMatch: 'full' },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'users-settings', component: UserSettingsPanelComponent, canActivate: [RoleGuard], data: { requiredRole: 'viewer' } },
  { path: 'users-settings/edit', component: EditUserComponent, canActivate: [RoleGuard], data: { requiredRole: 'admin' } },
  { path: 'items-list', component: ItemsListComponent, canActivate: [RoleGuard], data: { requiredRole: 'viewer' } },
  { path: 'add-item', component: AddItemComponent, canActivate: [RoleGuard], data: { requiredRole: 'editor' } },
  { path: 'products', component: ProductsComponent, canActivate: [RoleGuard], data: { requiredRole: 'viewer' } },
  { path: 'login', component: LoginComponent },
  // Wildcard fallback:
  { path: '**', redirectTo: 'users-settings' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }