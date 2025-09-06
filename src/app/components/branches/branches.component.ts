import { Component } from '@angular/core';
import {BranchCardComponent} from "../branch-card/branch-card.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-branches',
  imports: [
    CommonModule,
    BranchCardComponent
  ],
  templateUrl: './branches.component.html',
  standalone: true,
  styleUrl: './branches.component.scss'
})
export class BranchesComponent {
  branchList = [
    {
      title: 'Johannesburg',
      image: 'assets/branches/johannesburg.jpg',
      address: '123 Market Street, Johannesburg',
      city: 'Johannesburg',
      province: 'Gauteng',
      pastor: 'Rev. Molefe',
      contact: '012 345 6789',
      service: " 09:00 AM"
    },
    {
      title: 'Pretoria',
      image: 'assets/branches/pretoria.jpg',
      address: '456 Union Ave, Pretoria',
      city: 'Pretoria',
      province: 'Gauteng',
      pastor: 'Pastor Ndou MA',
      contact: '012 555 1234',
      service: " 09:00 AM"
    },
    {
      title: 'Ha-Matsa',
      image: 'assets/branches/capetown.jpg',
      address: 'Ha-Matsa',
      city: 'Makhado',
      province: 'Limpopo',
      pastor: 'Evangelist Mudau AA',
      contact: '021 987 6543',
      service:" 09:00 AM"
    },
    {
      title: 'Thohoyandou',
      image: 'assets/branches/durban.jpg',
      city: 'Thohoyandou',
      province: 'Limpopo',
      pastor: 'Rev. Sithole',
      contact: '031 123 7890',
      service: " 09:00 AM"
    },
    {
      title: 'Polokwane',
      image: 'assets/branches/polokwane.jpg',
      address: '654 Church Street, Polokwane',
      city: 'Polokwane',
      province: 'Limpopo',
      pastor: 'Pastor Masutha AA',
      contact: '015 333 4444',
      service: " 09:00 AM"
    },
    {
      title: 'Mandala',
      image: '',
      address: '123 Mandala, Mandala, Nzhelele',
      city: 'Thohoyandou',
      province: 'Limpopo',
      pastor: 'Pastor Netshivhodza NM',
      contact: '013 555 0000',
      service: " 09:00 AM"
    }
  ];
}

