import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Menubar } from 'primeng/menubar';


@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    ButtonModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    CommonModule,
    Menubar,
    RouterModule,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {
  
  items: MenuItem[] | undefined;
  
  @Output() menuClick = new EventEmitter<void>();

  openMenu() {
    this.menuClick.emit();
  }

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-home',
        routerLink: '/dashboard'
      }
    ];

  }

}
