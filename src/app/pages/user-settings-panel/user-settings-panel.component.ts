import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { setDarkMode, toggleDarkMode } from 'src/app/store/theme.actions';
import { ThemeState } from 'src/app/store/theme.state';
import { selectDarkMode } from 'src/app/store/theme.selectors';

@Component({
  selector: 'app-user-settings-panel',
  templateUrl: './user-settings-panel.component.html',
  styleUrls: ['./user-settings-panel.component.css']
})
export class UserSettingsPanelComponent implements OnInit {

  settings: any = null;
  error: string | null = null;
  darkMode$: Observable<boolean>;

  constructor(private api: ApiService, private auth: AuthService, private store: Store<ThemeState>) {
    this.darkMode$ = this.store.pipe(select(selectDarkMode));
  }
  ngOnInit(): void {
    const id = this.auth.getUserId();
   if(id) this.api.getUserSettings(id).subscribe({
      next: (data: any) => {
        this.settings = data.settings;
        this.store.dispatch(setDarkMode({ darkMode: this.settings.theme === 'dark' }));
      },
      error: (err: any) => this.error = 'Failed to load user settings'
    });
  }
  toggleDarkMode() {
    this.store.dispatch(toggleDarkMode());
  }
}