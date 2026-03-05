import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
    ButtonModule
  ],
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {

  @Input() src!: string;
  @Input() height: string = '80vh';

  zoom: number = 1;
  rotation: number = 0;

  showPdf = true;

  refreshViewer() {
    this.showPdf = false;

    setTimeout(() => {
      this.showPdf = true;
    }, 50);
  }

  zoomIn() {
    this.zoom += 0.25;
    this.refreshViewer();
  }

  zoomOut() {
    if (this.zoom > 0.5) {
      this.zoom -= 0.25;
      this.refreshViewer();
    }
  }

  rotate() {
    this.rotation = (this.rotation + 90) % 360;
    this.refreshViewer();
  }

  downloadPdf() {
    window.open(this.src, '_blank');
  }

}