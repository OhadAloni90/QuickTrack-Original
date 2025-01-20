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
  searchTerm: string = '';
  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    const id = this.auth.getUserId();
    if(id) this.api.getAllItems().subscribe({
      next: (data: any) => {
        this.items = data?.items.map((item: any) => ({
          ...item,
          uploads: item.uploads || []
        })) || [];
      },
      error: (err: any) => this.error = 'Failed to load items'
    });
  }
}