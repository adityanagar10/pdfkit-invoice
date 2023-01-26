const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const tableJSON = require("./data");
const tableConfig = require("./pdfkit-table-config");
const { convertCurrencyToWords, 
        calcSubTotal, 
        calcTotalTax,
        currencyInWords,
        createHeaderAndFooter,
        isIGST,
        totalItems,
        formatCurrency
       } = require("./helper.js")

var tableEndHeight = 0;

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50, layout : 'landscape', bufferPages: true});
  const subTotal = calcSubTotal(invoice.listItems);
  const totalTax = calcTotalTax(invoice, invoice.listItems);
  const itemQty = totalItems(invoice.listItems);

  doc.rect(50, 25, 741, 155);
  generateHeader(doc, invoice);
  generateInvoiceDetails(doc, invoice);
  generateCustomerInformation(doc, invoice);
  doc.table(tableJSON, tableConfig);
  generateTotalPaymentDetails(doc, invoice, itemQty, subTotal);
  generateTotalBillingDetails(doc, invoice, subTotal, totalTax);
  createHeaderAndFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc, invoice) {
  var startPointOfText = 175;
  var fontSize = 10;
  var padding = 5;
  var totalHeight = fontSize + padding;
  var verticalStartForText = 50;
  var horizontalMargin = 110;
  doc
    .image("logo.png", 60, 60, { width: 100 })
    .fillColor("#444444")
    .fontSize(fontSize)
    .font('Helvetica-Bold')
    .text(invoice.organization.name, startPointOfText, 35, { align: "left" })
    .font('Helvetica')
    .text(invoice.organization.address.addressLineOne, startPointOfText, verticalStartForText + totalHeight * 0, { align: "left" })
    .text(invoice.organization.address.addressLineTwo, startPointOfText, verticalStartForText + totalHeight * 1, { align: "left" })
    .text(`${invoice.organization.address.city} - ${invoice.organization.address.zipCode}, ${invoice.organization.address.state}, ${invoice.organization.address.country}` , startPointOfText, verticalStartForText + totalHeight * 2, { align: "left" })
    .text(`GSTIN ${invoice.organization.GST}`, startPointOfText, verticalStartForText + totalHeight * 3, { align: "left" })
    .font('Helvetica-Bold')
    .fontSize(12)
    .text("TAX INVOICE", 650, 90, {align: "center"})
    .moveDown();
  
    generateHr(doc, horizontalMargin);
}

function generateInvoiceDetails(doc, invoice) {
  var prevHorizontalMargin = 110;
  var startPointOfText = prevHorizontalMargin + 5;
  var fontSize = 10;
  var padding = 3;
  var totalHeight = fontSize + padding;
  var startPointOfCustomer = 400;
  var verticalMargin = 25;
  var verticalStartForText = 50;
  var marginForData = 125;
  doc
    .fontSize(fontSize)
    .font("Helvetica-Bold")
    .text("Invoice Details", verticalStartForText + verticalMargin, startPointOfText + totalHeight * 0)
    .font("Helvetica")
    .text("Invoice Number :", verticalStartForText + verticalMargin, startPointOfText + totalHeight * 1)
    .font("Helvetica-Bold")
    .text(invoice.invoice.id, verticalStartForText + verticalMargin + marginForData, startPointOfText + totalHeight * 1)
    .font("Helvetica")
    .text("Invoice Date :", verticalStartForText + verticalMargin, startPointOfText + totalHeight * 2)
    .font("Helvetica-Bold")
    .text(invoice.invoice.invoiceDate, verticalStartForText + verticalMargin + marginForData, startPointOfText + totalHeight * 2)
    .font("Helvetica")
    .text("Terms :", verticalStartForText + verticalMargin, startPointOfText + totalHeight * 3)
    .font("Helvetica-Bold")
    .text(invoice.invoice.terms, verticalStartForText + verticalMargin + marginForData, startPointOfText + totalHeight * 3)
    .font("Helvetica")
    .text("Due Date :", verticalStartForText + verticalMargin, startPointOfText + totalHeight * 4)
    .font("Helvetica-Bold")
    .text(invoice.invoice.dueDate, verticalStartForText + verticalMargin + marginForData, startPointOfText + totalHeight * 4)

    generateVr(doc, startPointOfCustomer, prevHorizontalMargin, startPointOfText + totalHeight * 5);
    generateHr(doc, startPointOfText + totalHeight * 5);
}

function generateCustomerInformation(doc, invoice) {  
  var prevHorizontalMargin = 110;
  var startPointOfText = prevHorizontalMargin + 5;
  var fontSize = 10;
  var padding = 3;
  var totalHeight = fontSize + padding;
  var startPointOfCustomer = 400;
  var verticalMargin = 25;
  var marginForData = 125;
  doc
    .fontSize(fontSize)
    .font("Helvetica-Bold")
    .text("Billed To", startPointOfCustomer + verticalMargin, startPointOfText + totalHeight * 0)
    .font("Helvetica")
    .text("Customer Name :", startPointOfCustomer + verticalMargin, startPointOfText + totalHeight * 1)
    .font("Helvetica-Bold")
    .text(invoice.customerDetails.name, startPointOfCustomer + marginForData + verticalMargin, startPointOfText + totalHeight * 1)
    .font("Helvetica")
    .text("Contact :", startPointOfCustomer + verticalMargin, startPointOfText + totalHeight * 2)
    .font("Helvetica-Bold")
    .text(`${invoice.customerDetails.email}, ${invoice.customerDetails.phone}`, startPointOfCustomer + verticalMargin + marginForData, startPointOfText + totalHeight * 2)
    .font("Helvetica")
    .text(`${invoice.customerDetails.address.addressLineOne}, ${invoice.customerDetails.address.addressLineTwo}, ${invoice.customerDetails.city} - ${invoice.customerDetails.zipCode}, ${invoice.customerDetails.state}, ${invoice.customerDetails.country}`, startPointOfCustomer + verticalMargin, startPointOfText + totalHeight * 3)
}

function generateTotalBillingDetails(doc, invoice, subTotal, totalTax) {
  var verticalStart = 600;
  var verticalMargin = 25;
  var marginForData = 75;
  var horizontalStart = tableEndHeight + 40;
  var fontSize = 10;
  var padding = 3;
  var totalHeight = fontSize + padding;
  doc
    .fontSize(fontSize)
    .font("Helvetica")
    .text("Sub Total :", verticalStart + verticalMargin, horizontalStart + totalHeight * 0, {width: 150, align: "left"})
    .text(formatCurrency(subTotal), verticalStart + verticalMargin  + marginForData, horizontalStart + totalHeight * 0, {width: 150, align: "left"})

    if(isIGST(invoice)) {
      doc
        .font("Helvetica")
        .text("IGST :", verticalStart + verticalMargin, horizontalStart + totalHeight * 1, {width: 150, align: "left"})
        .text(formatCurrency(totalTax), verticalStart + verticalMargin  + marginForData, horizontalStart + totalHeight * 1, {width: 150, align: "left"})
    } else {
      doc
        .font("Helvetica")
        .text("CGST :", verticalStart + verticalMargin, horizontalStart + totalHeight * 1, {width: 150, align: "left"})
        .text(formatCurrency(totalTax/2), verticalStart + verticalMargin  + marginForData, horizontalStart + totalHeight * 1, {width: 150, align: "left"})
      
        .font("Helvetica")
        .text("SGST :", verticalStart + verticalMargin, horizontalStart + totalHeight * 2, {width: 150, align: "left"})
        .text(formatCurrency(totalTax/2), verticalStart + verticalMargin  + marginForData, horizontalStart + totalHeight * 2, {width: 150, align: "left"})
    }

    doc
      .font("Helvetica-Bold")
      .text("Total :", verticalStart + verticalMargin, horizontalStart + totalHeight * 3, {width: 150, align: "left"})
      .text(formatCurrency(707528), verticalStart + verticalMargin  + marginForData, horizontalStart + totalHeight * 3, {width: 150, align: "left"})
      
      .font("Helvetica-Bold")
      .text("Balance Due :", verticalStart + verticalMargin, horizontalStart + totalHeight * 4, {width: 150, align: "left"})
      .text(formatCurrency(707528), verticalStart + verticalMargin  + marginForData, horizontalStart + totalHeight * 4, {width: 150, align: "left"})

      .fontSize(8)
      .text("This is a Computer generated Invoice and requires no signature", 525, horizontalStart + totalHeight * 7, {width: 250, align: "left"})
}

function generateTotalPaymentDetails(doc, invoice, totalItems, subTotal) {
  var fontSize = 10;
  doc
    .fontSize(fontSize)
    .font("Helvetica")
    .text(`Total Items : ${totalItems}`, {width: 500, align: "left"})
    .text(" ")
    .font("Helvetica")
    .fontSize(8)
    .text("Total In Words", {width: 550, align: "left"})
    .font("Helvetica-BoldOblique")
    .text(`${currencyInWords(subTotal)}`, {width: 500, align: "left"})
    .font("Helvetica")
    .text(" ")
    .text("Thank you very much for choosing us. We deeply value our professional relationship with you.", {width: 500, align: "left"})
    .text(" ")
    .text("Click here for payment", {
      link: 'https://apple.com/',
      underline: true,
      color: 'blue',
      target: '_blank',
    })
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(791, y)
    .stroke();
}

function generateVr(doc, y, a, b) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(y, a)
    .lineTo(y, b)
    .stroke();
}

module.exports = {
  createInvoice
};
