import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatIconModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Search...';
  @Output() search = new EventEmitter<string>();

  searchTerm: string = '';

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

}
