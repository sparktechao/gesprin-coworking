import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { PdfService } from './common/services/pdf.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pdfService: PdfService,
  ) {}

  @Get('pdf')
  getPdf(@Res() res: Response): void {
    this.pdfService.generatePdf(res);
  }
}
