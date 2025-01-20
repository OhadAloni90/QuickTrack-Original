import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent implements OnInit {
  userStats: any[] = [];
  errorMsg: string | null = null;
  loading: boolean = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUserStats().subscribe({
      next: (result) => {
        this.userStats = result;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Failed to load user statistics';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
