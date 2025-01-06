import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  items: any[] = [];
  error: string | null = null;

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    const id = this.auth.getUserId();
    if(id) this.api.getUserItems(id).subscribe({
      next: (data: any) => this.items = data || [],
      error: (err: any) => this.error = 'Failed to load items'
    });
  }
}
