import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { UserSettingsPanelComponent } from './pages/user-settings-panel/user-settings-panel.component';
import { LoginComponent } from './pages/login/login.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ProductsComponent } from './pages/products/products.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
const routes: Routes = [
  { path: '', redirectTo: 'users-settings', pathMatch: 'full' },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'users-settings', component: UserSettingsPanelComponent },
  { path: 'users-settings/edit', component: EditUserComponent },
  { path: 'items-list', component: ItemsListComponent },
  { path: 'add-item', component: AddItemComponent },
  {path: 'products', component: ProductsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchPageComponent },
  // Wildcard fallback:
  { path: '**', redirectTo: 'users-settings' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }