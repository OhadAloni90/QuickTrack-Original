import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  items: any[] = [];
  error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getItems().subscribe({
      next: (data: any) => this.items = data.items || [],
      error: (err: any) => this.error = 'Failed to load items'
    });
  }
}
