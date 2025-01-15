/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

import { ItemsListComponent } from './items-list.component';

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;

  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['searchItems']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ItemsListComponent ],
      providers: [{ provide: ApiService, useValue: apiSpy }]
    })
    .compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call searchItems with debounced input', fakeAsync(() => {
    const searchTerm = 'milk';
    const searchInput = fixture.debugElement.query(By.css('input')).nativeElement;

    apiService.searchItems.and.returnValue(of({ items: [] }));

    searchInput.value = searchTerm;
    searchInput.dispatchEvent(new Event('input'));

    tick(300); // Simulate the debounce time

    expect(apiService.searchItems).toHaveBeenCalledWith(searchTerm);
  }));

  it('should update items on successful search', fakeAsync(() => {
    const searchTerm = 'milk';
    const mockItems = [{ name: 'Milk', description: 'Dairy product', price: 1.99 }];
    apiService.searchItems.and.returnValue(of({ items: mockItems }));

    component.searchTerm.setValue(searchTerm);
    tick(300); // Simulate the debounce time
    fixture.detectChanges();

    expect(component.items).toEqual(mockItems);
  }));
});