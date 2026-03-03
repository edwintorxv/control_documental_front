import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { EmpleadoListComponent } from './pages/empleados/empleado-list/empleado-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmpleadoFamiliaresTableComponent } from './features/empleados/empleado-familiares-table/empleado-familiares-table.component';
import { EmpleadoExperienciaLaboralTableComponent } from './features/empleados/empleado-experiencia-laboral-table/empleado-experiencia-laboral-table.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'empleados', component: EmpleadoListComponent },
      { path: 'empleados/:id/familiares', component: EmpleadoFamiliaresTableComponent },
      { path: 'empleados/:id/laboral', component: EmpleadoExperienciaLaboralTableComponent }
    ]
  }
];