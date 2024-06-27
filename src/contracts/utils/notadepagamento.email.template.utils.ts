// src/utils/email-template.utils.ts
export function generateInvoiceEmailTemplate(
  coworkerName: string,
  invoiceData: any,
): string {
  const { nuc, issueDate, amount, coveredMonths, reference } = invoiceData;

  return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid #eeeeee;
          }
          .content {
            padding: 20px;
          }
          .footer {
            text-align: center;
            padding: 10px 0;
            border-top: 1px solid #eeeeee;
            font-size: 12px;
            color: #888888;
          }
          .invoice-details {
            margin-top: 20px;
          }
          .invoice-details th, .invoice-details td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #eeeeee;
          }
          .invoice-details th {
            background-color: #f4f4f4;
          }
          .invoice-details td {
            background-color: #ffffff;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Nova Nota de Pagamento Gerada</h2>
          </div>
          <div class="content">
            <p><strong>Prezado ${coworkerName},</strong></p>
            <p>Uma nova Nota de Pagamento foi gerada para o seu contrato com ID: ${nuc}.</p>
            <p>Detalhes da Nota de Pagamento:</p>
            <table class="invoice-details">
              <tr>
                <th>Data de Emissão</th>
                <td>${new Date(issueDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th>Montante</th>
                <td>${amount.toFixed(2)} KZ</td>
              </tr>
              <tr>
                <th>Meses Cobertos</th>
                <td>${coveredMonths.join(', ')}</td>
              </tr>
              <tr>
                <th>Referência</th>
                <td>${reference}</td>
              </tr>
            </table>
          </div>
          <div class="footer">
            <p>Gesprin Co. Ao - Todos os direitos reservados Gesprin</p>
          </div>
        </div>
      </body>
      </html>
    `;
}
