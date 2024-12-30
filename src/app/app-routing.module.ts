import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { UserSettingsPanelComponent } from './pages/user-settings-panel/user-settings-panel.component';
const routes: Routes = [
  { path: '', redirectTo: 'users-settings', pathMatch: 'full' },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'users-settings', component: UserSettingsPanelComponent },
  { path: 'items-list', component: ItemsListComponent },
  // Wildcard fallback:
  { path: '**', redirectTo: 'users-settings' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
