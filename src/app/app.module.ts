import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { StoreModule } from './store/index';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { UserSettingsPanelComponent } from './pages/user-settings-panel/user-settings-panel.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { SharedInputComponent } from './shared/components/shared-input/shared-input.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ProductsComponent } from './pages/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    RegistrationFormComponent,
    UserSettingsPanelComponent,
    LoginComponent,
    AddItemComponent,
    EditUserComponent,
    SharedInputComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers)
  ],
  exports: [
    RegistrationFormComponent,
    ItemsListComponent,
    UserSettingsPanelComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }