import { Routes } from '@angular/router';
import { ProcesoConfiabilidadListComponent } from './features/clientes/components/confiabilidad/proceso-confiabilidad-list/proceso-confiabilidad-list.component';
import { EmpleadoDocumentosTableComponent } from './features/empleados/components/documentos/empleado-documentos-table/empleado-documentos-table.component';
import { EmpleadoExperienciaLaboralTableComponent } from './features/empleados/components/experiencia-laboral/empleado-experiencia-laboral-table/empleado-experiencia-laboral-table.component';
import { EmpleadoFamiliaresTableComponent } from './features/empleados/components/familiares/empleado-familiares-table/empleado-familiares-table.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ClienteListComponent } from './pages/clientes/cliente-list/cliente-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmpleadoListComponent } from './pages/empleados/empleado-list/empleado-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'empleados', component: EmpleadoListComponent },
      { path: 'empleados/:id/familiares', component: EmpleadoFamiliaresTableComponent },
      { path: 'empleados/:id/laboral', component: EmpleadoExperienciaLaboralTableComponent },
      { path: 'empleados/:id/documentos', component: EmpleadoDocumentosTableComponent },
      { path: 'clientes', component: ClienteListComponent },
      { path: 'clientes/:id/confiabilidad', component: ProcesoConfiabilidadListComponent }
    ]
  }
];