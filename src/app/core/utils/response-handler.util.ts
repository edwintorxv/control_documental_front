import { MessageService } from 'primeng/api';

export class ResponseHandlerUtil {

  static handleResponse(response: any, messageService: MessageService) {

    const metaData = response?.metadata?.[0];

    if (metaData?.codigo === '00') {
      messageService.add({
        severity: 'success',
        summary: metaData.tipo,
        detail: metaData.descripcion,
        life: 4000
      });
    } else {
      messageService.add({
        severity: 'warn',
        summary: metaData?.tipo,
        detail: metaData?.descripcion,
        life: 4000
      });
    }

  }

  static handleError(error: any, messageService: MessageService) {

    if (error?.error?.metadata?.length > 0) {

      const metaData = error.error.metadata[0];

      messageService.add({
        severity: 'error',
        summary: metaData.tipo || 'Error',
        detail: metaData.descripcion || 'Ocurrió un error',
        life: 4000
      });

    } else {

      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error en la comunicación con el servidor',
        life: 4000
      });

    }

  }

}