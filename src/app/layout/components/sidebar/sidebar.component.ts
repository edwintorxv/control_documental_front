import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Drawer } from 'primeng/drawer';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { ThemeService } from '../../../core/services/theme.service';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [Drawer, DrawerModule, ButtonModule, AvatarModule, PanelMenu],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})


export class SidebarComponent implements OnInit {

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();


  constructor(
    private themeService: ThemeService,
    private router: Router
  ) { }

  menu: MenuItem[] | undefined;

  temas: MenuItem[] | undefined;

  ngOnInit() {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.visibleChange.emit(false);
      });


    this.themeService.loadTheme();

    this.menu = [
      {
        label: 'Empleados',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Listado',
            icon: 'pi pi-list',
            routerLink: '/empleados'
          },
          {
            label: 'Desktop',
            icon: 'pi pi-desktop',
            routerLink: '/dashboard'
          },
          {
            label: 'Tablet',
            icon: 'pi pi-tablet'
          }
        ]
      }
    ]

    this.temas = [
      {
        label: 'Temas',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Claro',
            icon: 'pi pi-sun',
            command: () => this.changeTheme('light')
          },
          {
            label: 'Oscuro',
            icon: 'pi pi-moon',
            command: () => this.changeTheme('dark')
          }
        ]
      }
    ]
  }

  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: Event): void {
    this.drawerRef.close(e);
  }

  //  visible: boolean = false;

  changeTheme(mode: 'light' | 'dark') {
    this.themeService.setTheme(mode);
    console.log('modo seleccionado', mode)
  }


}
