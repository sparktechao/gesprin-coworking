import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfService {
  generatePdf(res): void {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream('carta-de-boas-vindas.gesprin.pdf');
    doc.pipe(stream);

    // Definir o caminho da fonte baseado no ambiente
    const fontPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'src',
      'fonts',
      'playwrite-au-qld-latin-400-normal.ttf',
    );

    // Registrar a fonte manuscrita
    doc.registerFont('PlaywriteAUQLD', fontPath);

    // Definir tamanho da fonte e espaçamento entre linhas
    const fontSize = 11;
    const lineHeight = fontSize * 1.5;

    // Configurações de estilo do documento
    doc.fontSize(fontSize);
    doc.lineGap(lineHeight - fontSize);

    // Utilizar a fonte padrão sans-serif para o corpo do texto
    doc.font('Helvetica');

    doc.fontSize(16).text('Bem-vindo ao Espaço de Coworking Gesprin', {
      align: 'left',
      bold: true,
    });
    doc.moveDown(1.5);
    doc.fontSize(fontSize).text(`Prezado(a),`, { align: 'justify' });
    doc.moveDown(1.5);
    doc.text(
      `Bem-vindo a Gesprin! Estamos muito contentes por tê-lo(a) connosco. Queremos garantir que a sua experiência aqui seja a melhor possível.`,
      { align: 'justify' },
    );
    doc.moveDown(1.5);
    doc.text(
      `O nosso objetivo é que o seu onboarding seja o mais suave e agradável possível. Aqui na Gesprin, acreditamos que um ambiente de trabalho produtivo deve ser também acolhedor e inspirador. Por isso, oferecemos uma variedade de serviços e comodidades para facilitar o seu dia a dia e maximizar a sua produtividade:`,
      { align: 'justify' },
    );
    doc.moveDown(1.5);

    const services = [
      'Espaço amplo com mais de 1000 metros quadrados.',
      'Impressão e digitalização.',
      'Salas de reuniões e formação.',
      'Zonas de descontração.',
      'Segurança e internet rápida.',
      'Serviço de limpeza.',
    ];

    doc.list(services, { bulletRadius: 3, textAlign: 'justify' });
    doc.moveDown(1.5);
    doc.text(
      `Além disso, oferecemos um ambiente colaborativo onde pode interagir com outros membros, participar em eventos e usufruir de todas as nossas comodidades.`,
      { align: 'justify' },
    );
    doc.moveDown(1.5);
    doc.text(
      `Estamos aqui para ajudar. Qualquer dúvida, fale connosco. A nossa equipa está sempre disponível para garantir que tenha uma experiência incrível e produtiva no nosso espaço.`,
      { align: 'justify' },
    );
    doc.moveDown(1.5);
    doc.text(`Atenciosamente,`, { align: 'left' });

    // Utilizar a fonte manuscrita para "Equipa Gesprin" com cor azul e em itálico
    doc
      .fillColor('#0000FF')
      .font('PlaywriteAUQLD')
      .fontSize(fontSize)
      .text('Team Gesprin', { align: 'left', oblique: true });

    doc.end();

    stream.on('finish', () => {
      res.sendFile('carta-de-boas-vindas.gesprin.pdf', { root: process.cwd() });
    });
  }
}
