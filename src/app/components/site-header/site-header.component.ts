import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ButtonComponent} from '../button/button.component';

export interface NavItem {
  label: string;
  link: string;
  fragment?: string;
}

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonComponent],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss'
})
export class SiteHeaderComponent {
  protected readonly items: NavItem[] = [
    {label: 'Home', link: '/'},
    {label: 'Events', link: '/calendar'},
    {label: 'Branches', link: '/branches'},
    {label: 'About Us', link: '/', fragment: 'about'},
    {label: 'Resources', link: '/', fragment: 'resources'},
    {label: 'Contact', link: '/', fragment: 'contact'}
  ];

  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
