import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table'
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-empleado-table',
  imports: [
    TableModule,
    HttpClientModule,
    InputTextModule,
    IconField,
    InputIcon,
    Tag
  ],
  providers: [],
  standalone: true,
  templateUrl: './empleado-table.component.html',
  styleUrl: './empleado-table.component.scss'
})
export class EmpleadoTableComponent implements OnInit {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



}
