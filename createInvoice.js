const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const { makeTableJSON } = require("./data");
const { calcSubTotal, 
        calcTotalTax,
        currencyInWords,
        createHeaderAndFooter,
        isIGST,
        totalItems,
        formatCurrency,
        calcTotalDiscount
      } = require("./helper.js")

var tableEndHeight = 0;

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50, layout : 'landscape', bufferPages: true});

  const options = {
    x: 70, 
    y: 185 + 20,
    divider: {
      header: {
        disabled: false, 
        width: 1, 
        opacity: 1 
      },
      horizontal: { 
        disabled: false, 
        width: 1, 
        opacity: 1 
      },
      vertical: {
        disabled: false, 
        width: 0.5, 
        opacity: 0.5
      }
    },
    padding: 5,
    hideHeader: false, 
    minRowHeight: 0,
    prepareHeader: () => {
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
    },
    prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
      doc.
        font("Helvetica").fontSize(10);
      indexColumn === -1 && doc.addBackground(rectRow, (indexRow % 2 ? '#F5F5F5' : '#FFFFFF'), 0.5);

      const {x, y, width, height} = rectCell;
      tableEndHeight = y;

      if(indexColumn === 0) {
        doc
          .lineWidth(1)
          .moveTo(x, y)
          .lineTo(x, y + height)
          .stroke();  
      }

      doc
        .lineWidth(1)
        .moveTo(x + width, y)
        .lineTo(x + width, y + height)
        .stroke();
    },
  }

  const subTotal = calcSubTotal(invoice.listItems);
  const totalTax = calcTotalTax(invoice.listItems);
  const totalDiscount = calcTotalDiscount(invoice.listItems);
  const totalAmount = subTotal + totalTax;
  const itemQty = totalItems(invoice.listItems);

  const data = makeTableJSON(invoice)

  doc.rect(50, 25, 741, 155);
  generateHeader(doc, invoice);
  generateInvoiceDetails(doc, invoice);
  generateCustomerInformation(doc, invoice);
  doc.table(data, options);
  generateTotalPaymentDetails(doc, itemQty, totalAmount, totalDiscount);
  generateTotalBillingDetails(doc, invoice, subTotal, totalTax, totalAmount, totalDiscount);
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
    .text(`${invoice.customerDetails.address.addressLineOne}, ${invoice.customerDetails.address.addressLineTwo}, ${invoice.customerDetails.address.city} - ${invoice.customerDetails.address.zipCode}, ${invoice.customerDetails.address.state}, ${invoice.customerDetails.address.country}`, startPointOfCustomer + verticalMargin, startPointOfText + totalHeight * 3)
}

function generateTotalBillingDetails(doc, invoice, subTotal, totalTax, totalAmount, totalDiscount) {
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
        .text(formatCurrency(totalAmount), verticalStart + verticalMargin  + marginForData, horizontalStart + totalHeight * 3, {width: 150, align: "left"})
        
        .font("Helvetica-Bold")
        .text("Balance Due :", verticalStart + verticalMargin, horizontalStart + totalHeight * 4, {width: 150, align: "left"})
        .text(formatCurrency(totalAmount), verticalStart + verticalMargin  + marginForData, horizontalStart + totalHeight * 4, {width: 150, align: "left"})

        .fontSize(8)
        .text("This is a Computer generated Invoice and requires no signature", 525, horizontalStart + totalHeight * 7, {width: 250, align: "left"})
}

function generateTotalPaymentDetails(doc, totalItems, totalAmount, totalDiscount) {
  var fontSize = 9;
  doc
    .fontSize(fontSize)
    .font("Helvetica")
    .text(`Total Items : ${totalItems}`, {width: 500, align: "left"})
    .text(" ")
    .text(`Total Discount : ${formatCurrency(totalDiscount)}`,{width: 500, align: "left"})
    .text(" ")
    .font("Helvetica")
    .text("Total In Words", {width: 550, align: "left"})
    .fontSize(8)
    .font("Helvetica-BoldOblique")
    .text(`${currencyInWords(totalAmount)}`, {width: 500, align: "left"})
    .font("Helvetica")
    .text(" ")
    .text("Thank you very much for choosing us. We deeply value our professional relationship with you.", {width: 500, align: "left"})
    .text(" ")
    .fontSize(fontSize)
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
