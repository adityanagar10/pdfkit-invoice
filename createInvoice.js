const fs = require("fs");
const PDFDocument = require("pdfkit-table");
const tableJSON = require("./data");

var tableEndHeight = 0;;

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

  doc.rect(50, 25, 741, 155);
  generateHeader(doc, invoice);
  generateInvoiceDetails(doc, invoice);
  generateCustomerInformation(doc, invoice);
  doc.table(tableJSON, options);
  generateTotalPaymentDetails(doc, invoice);
  generateTotalBillingDetails(doc, invoice);

  let pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);

    let oldBottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;

    doc
      .font('Helvetica')
      .text(
        `Page: ${i + 1} of ${pages.count}`,
        0,
        555,
        { align: 'center' })
      .fontSize(8)
      .text(
        "Finkit is the Regd Trademark of NxtBig Software Labs Pvt Ltd.  All rights reserved. Terms and Conditions as given at our website www.finkit.in apply",
        70,
        570,
        { align: "center", width: 700 });
      
      doc.page.margins.bottom = oldBottomMargin;
      
      let oldTopMargin = doc.page.margins.top;
      doc.page.margins.top = 0 
        
      doc
        .text(
          `Page: ${i + 1} of ${pages.count}`,
          0,
          10,
          { align: 'center' }
          );
        
        doc.page.margins.top = oldTopMargin;
  }

  
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
    .text(invoice.organization.address_line_one, startPointOfText, verticalStartForText + totalHeight * 0, { align: "left" })
    .text(invoice.organization.address_line_two, startPointOfText, verticalStartForText + totalHeight * 1, { align: "left" })
    .text(`${invoice.organization.city} - ${invoice.organization.zip_code}, ${invoice.organization.state}, ${invoice.organization.country}` , startPointOfText, verticalStartForText + totalHeight * 2, { align: "left" })
    .text(`GSTIN ${invoice.organization.gst}`, startPointOfText, verticalStartForText + totalHeight * 3, { align: "left" })
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
    .text(invoice.invoice_number, verticalStartForText + verticalMargin + marginForData, startPointOfText + totalHeight * 1)
    .font("Helvetica")
    .text("Invoice Date :", verticalStartForText + verticalMargin, startPointOfText + totalHeight * 2)
    .font("Helvetica-Bold")
    .text(invoice.invoice_date, verticalStartForText + verticalMargin + marginForData, startPointOfText + totalHeight * 2)
    .font("Helvetica")
    .text("Terms :", verticalStartForText + verticalMargin, startPointOfText + totalHeight * 3)
    .font("Helvetica-Bold")
    .text(invoice.invoice_terms, verticalStartForText + verticalMargin + marginForData, startPointOfText + totalHeight * 3)
    .font("Helvetica")
    .text("Due Date :", verticalStartForText + verticalMargin, startPointOfText + totalHeight * 4)
    .font("Helvetica-Bold")
    .text(invoice.invoice_due_date, verticalStartForText + verticalMargin + marginForData, startPointOfText + totalHeight * 4)

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
    .text(invoice.customer.name, startPointOfCustomer + marginForData + verticalMargin, startPointOfText + totalHeight * 1)
    .font("Helvetica")
    .text("Contact :", startPointOfCustomer + verticalMargin, startPointOfText + totalHeight * 2)
    .font("Helvetica-Bold")
    .text(`${invoice.customer.email}, ${invoice.customer.phone}`, startPointOfCustomer + verticalMargin + marginForData, startPointOfText + totalHeight * 2)
    .font("Helvetica")
    .text(`${invoice.customer.address_line_one}, ${invoice.customer.address_line_two}, ${invoice.customer.city} - ${invoice.customer.zip_code}, ${invoice.customer.state}, ${invoice.customer.country}`, startPointOfCustomer + verticalMargin, startPointOfText + totalHeight * 3)
}

function convertCurrencyToWords(price) {
  var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
    dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
    tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
    handle_tens = function(dgt, prevDgt) {
      return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
    },
    handle_utlc = function(dgt, nxtDgt, denom) {
      return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
    };

  var str = "",
    digitIdx = 0,
    digit = 0,
    nxtDigit = 0,
    words = [];
  if (price += "", isNaN(parseInt(price))) str = "";
  else if (parseInt(price) > 0 && price.length <= 10) {
    for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
      case 0:
        words.push(handle_utlc(digit, nxtDigit, ""));
        break;
      case 1:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 2:
        words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
        break;
      case 3:
        words.push(handle_utlc(digit, nxtDigit, "Thousand"));
        break;
      case 4:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 5:
        words.push(handle_utlc(digit, nxtDigit, "Lakh"));
        break;
      case 6:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 7:
        words.push(handle_utlc(digit, nxtDigit, "Crore"));
        break;
      case 8:
        words.push(handle_tens(digit, price[digitIdx + 1]));
        break;
      case 9:
        words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
    }
    str = words.reverse().join("")
  } else str = "";
  return str

}

function currencyInWords(num) {
  var splittedNum =num.toString().split('.')
  var nonDecimal=splittedNum[0]
  var decimal=splittedNum[1]
  var value = convertCurrencyToWords(Number(nonDecimal))+"Indian Rupees and "+convertCurrencyToWords(Number(decimal))+" Paise"
  value = value.slice(1)
  return `${value} Only`
}

function generateTotalBillingDetails(doc, invoice) {
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
    .text(formatCurrency(599600), verticalStart + verticalMargin  + marginForData, horizontalStart + totalHeight * 0, {width: 150, align: "left"})

    .font("Helvetica")
    .text("CGST (9%) :", verticalStart + verticalMargin, horizontalStart + totalHeight * 1, {width: 150, align: "left"})
    .text(formatCurrency(53964), verticalStart + verticalMargin  + marginForData, horizontalStart + totalHeight * 1, {width: 150, align: "left"})
    
    .font("Helvetica")
    .text("SGST (9%) :", verticalStart + verticalMargin, horizontalStart + totalHeight * 2, {width: 150, align: "left"})
    .text(formatCurrency(53964), verticalStart + verticalMargin  + marginForData, horizontalStart + totalHeight * 2, {width: 150, align: "left"})
    
    .font("Helvetica-Bold")
    .text("Total :", verticalStart + verticalMargin, horizontalStart + totalHeight * 3, {width: 150, align: "left"})
    .text(formatCurrency(707528), verticalStart + verticalMargin  + marginForData, horizontalStart + totalHeight * 3, {width: 150, align: "left"})
    
    .font("Helvetica-Bold")
    .text("Balance Due :", verticalStart + verticalMargin, horizontalStart + totalHeight * 4, {width: 150, align: "left"})
    .text(formatCurrency(707528), verticalStart + verticalMargin  + marginForData, horizontalStart + totalHeight * 4, {width: 150, align: "left"})

    .fontSize(8)
    .text("This is a Computer generated Invoice and requires no signature", 525, horizontalStart + totalHeight * 7, {width: 250, align: "left"})
}

function generateTotalPaymentDetails(doc, invoice) {
  var fontSize = 10;
  doc
    .fontSize(fontSize)
    .font("Helvetica")
    .text(`Total Items : ${invoice.orders.total_items}`, {width: 500, align: "left"})
    .text(" ")
    .font("Helvetica")
    .fontSize(8)
    .text("Total In Words", {width: 550, align: "left"})
    .font("Helvetica-BoldOblique")
    .text(`${currencyInWords(7075.28)}`, {width: 500, align: "left"})
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

function formatCurrency(paise) {
  return "Rs. " + (paise / 100).toFixed(2);
}

module.exports = {
  createInvoice
};
