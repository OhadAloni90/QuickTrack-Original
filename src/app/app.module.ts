import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { RegistrationFormComponent } from './pages/registration-form/registration-form.component';
import { UserSettingsPanelComponent } from './pages/user-settings-panel/user-settings-panel.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    RegistrationFormComponent,
    UserSettingsPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    RegistrationFormComponent,
    ItemsListComponent,
    UserSettingsPanelComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
