import { Component, inject } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { MatDivider } from '@angular/material/divider';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog',
  imports: [MatDivider, MatSelectionList, MatListOption, MatButton, ReactiveFormsModule],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss',
})
export class FilterDialogComponent {
  protected shopService = inject(ShopService);
  private dialogRef = inject(MatDialogRef<FilterDialogComponent>);
  private data = inject(MAT_DIALOG_DATA);

  selectedBrands = new FormControl<string[]>(this.data.selectedBrands);
  selectedTypes = new FormControl<string[]>(this.data.selectedTypes);

  applyFilters() {
    this.dialogRef.close({
      selectedBrands: this.selectedBrands.value ?? [],
      selectedTypes: this.selectedTypes.value ?? []
    });
  }
}
