import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../../core/services/shop.service';
import { MatCard } from '@angular/material/card';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list'; 

@Component({
  selector: 'app-shop',
  imports: [
    MatCard,
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  products = signal<Product[]>([]);
  selectedBrands = signal<string[]>([]);
  selectedTypes = signal<string[]>([]);
  selectedSort: string = 'name';
  sortOptions = [
    { name: 'Alphabettical', value: 'name' },
    { name: 'Price: Low-High', value: 'priceAsc' },
    { name: 'Price: High-low', value: 'PriceDesc' },
  ];

  ngOnInit(): void {
    this.initializeShop();
  }

  private initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.shopService.getProducts().subscribe({
      next: (response) => this.products.set(response.data),
      error: (error) => console.log(error),
    });
  }

  onSortChange(event: MatSelectionListChange){
    const selectedOption = event.options[0];
    if (selectedOption){
      this.selectedSort = selectedOption.value;
      console.log(this.selectedSort)
    }
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FilterDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.selectedBrands(),
        selectedTypes: this.selectedTypes(),
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.selectedBrands.set(result.selectedBrands);
          this.selectedTypes.set(result.selectedTypes);
          // apply filters
          this.shopService.getProducts(this.selectedBrands(), this.selectedTypes()).subscribe({
            next: (response) => this.products.set(response.data),
           error: (error) => console.log(error),
          });
        }
      },
    });
  }
}
