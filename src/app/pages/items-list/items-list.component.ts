import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
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
  searchTerm = new FormControl('');
  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    const id = this.auth.getUserId();
    if(id) this.api.getAllItems().subscribe({
      next: (data: any) => this.items = data?.items || [],
      error: (err: any) => this.error = 'Failed to load items'
    });
    this.searchTerm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.api.searchItems(term))
    ).subscribe({
      next: (results: any) => this.items = results.items,
      error: (err: any) => this.error = 'Failed to search items'
    });
  }
}