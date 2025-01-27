import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  // State variables
  categories: string[] = ['electronics', 'books', 'clothing']; // Example categories
  selectedCategory: string = '';
  priceMin: number = 0;
  priceMax: number = 0;
  searchText: string = '';
  items: any[] = [];
  totalCount: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 20;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  // Fetch items based on current filters and pagination
  fetchItems(): void {
    const filters = {
      q: this.searchText,
      category: this.selectedCategory,
      priceMin: this.priceMin,
      priceMax: this.priceMax,
      page: this.currentPage,
      limit: this.itemsPerPage
    };

    this.apiService.searchItems(filters).subscribe({
      next: (response: any) => {
        this.items = response.items;
        this.totalCount = response.totalCount;
      },
      error: (err) => {
        console.error('Failed to fetch items', err);
      }
    });
  }

  // Handle changes in filter inputs
  onFilterChange(): void {
    this.currentPage = 1; // Reset to first page on filter change
    this.fetchItems();
  }

  // Handle pagination
  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchItems();
  }

  // Calculate total pages
  get totalPages(): number {
    return Math.ceil(this.totalCount / this.itemsPerPage);
  }
}