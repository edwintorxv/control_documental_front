import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FluidModule } from 'primeng/fluid';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { EmpleadoDocumento } from '../../models/empleado-documento.model';
import { DocumentoMaestroService } from '../../../../core/services/documento-maestro.service';
import { DocumentoMaestro } from '../../../../shared/models/documento-maestro.model';
import { FileUpload } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { CustomValidators } from '../../../../shared/validators/custom-validators';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-empleado-documentos-dialog',
  imports: [
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    InputNumberModule,
    DatePickerModule,
    FluidModule,
    ButtonModule,
    FileUpload
  ],
  standalone: true,
  templateUrl: './empleado-documentos-dialog.component.html',
  styleUrl: './empleado-documentos-dialog.component.scss'
})

export class EmpleadoDocumentosDialogComponent implements OnInit {

  @Input() empleadoId!: number;
  private _documento?: EmpleadoDocumento;

  @Input() set documentoEmpleado(value: EmpleadoDocumento | undefined) {
    this._documento = value;

    if (value && this.empleadoDocumentoForm) {
      this.patchFormValues();
    }
  };

  get empleadoDocumento(): EmpleadoDocumento | undefined {
    return this._documento;
  }

  @Output() saved = new EventEmitter<EmpleadoDocumento>();
  @Output() cancelled = new EventEmitter<void>();

  documentoMaestro: DocumentoMaestro[] = [];
  empleadoDocumentoForm!: FormGroup;

  constructor(
    private documentoMaestroService: DocumentoMaestroService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadDocumentoMaestro();

    if (this.empleadoDocumento) {
      this.patchFormValues();
    }

  }

  private patchFormValues(): void {
    if (!this.empleadoDocumento) {
      this.empleadoDocumentoForm.reset();
      return;
    }
    this.empleadoDocumentoForm.patchValue({
      documentoMaestro: this.empleadoDocumento.documentoMaestro?.id,
      fechaInicial: this.empleadoDocumento.fechaInicial,
      fechaFinal: this.empleadoDocumento.fechaVencimiento,
      urlArchivo: this.empleadoDocumento.urlArchivo,
      nombreArchivo: this.empleadoDocumento.nombreArchivo
    });
  }

  buildForm(): void {
    this.empleadoDocumentoForm = this.formBuilder.group({

      documentoMaestro: [null, [Validators.required,]],
      fechaInicial: [null, [Validators.required]]

    });
  }

  loadDocumentoMaestro() {
    this.documentoMaestroService.getDocumentoMaestroById([1, 3])
      .subscribe({
        next: (data) => {
          this.documentoMaestro = data;
        },
        error: (err) => {
          console.log('Error al consultar documento Maestro', err)
        }
      })
  }

  onUpload(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

  onSubmit(): void {

    if (this.empleadoDocumentoForm.invalid) {
      this.empleadoDocumentoForm.markAllAsTouched();
      return;
    }

    const formValue = this.empleadoDocumentoForm.getRawValue();
    const documentoData: any = {
      documentoMaestro: { id: formValue.documentoMaestro },
      fechaInicial: formValue.fechaInicial,
      empleado: { id: this.empleadoId }
    }

    if (this.documentoEmpleado && this.documentoEmpleado.id) {
      documentoData.id = this.documentoEmpleado.id;
    }

    this.saved.emit(documentoData);

  }

}
