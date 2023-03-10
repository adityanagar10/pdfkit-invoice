const fs = require("fs");

const writeJSONToFile = (json, fileName) => {
    let jsonContent = JSON.stringify(json, null, 2);
    
    fs.writeFile(fileName, jsonContent, 'utf8', function (err) {
        if (err) {
          throw err;
        }
    })
}

const checkForItemMatch = (item, customItem) => {
    return item.itemId === customItem.itemId
}

const getRange = (quantity, min, max) => {  
  return (quantity >= min && quantity <= max) ? true : false
}

const updateListItemsFromUnitIndividualPriceList = (invoiceJSON) => {
    const listItems = invoiceJSON.listItems
    const priceList = invoiceJSON.priceList
    const updatedListItems = []
    let srnoCount = 1;
    listItems.map(item => {
        let priceListItem = priceList.customItemPrices.find(
            priceListItem => checkForItemMatch(item, priceListItem)
        )
        
        if(priceListItem) {
            updatedListItems.push({
                ...item,
                srno: srnoCount,
                discountedPrice: priceListItem.customPrice,
                discount: priceListItem.totalDiscount,
                totalDiscount: priceListItem.totalDiscount * item.quantity
            })
        } else {
            let newItem = {
              ...item,
              srno: srnoCount,
              discountedPrice: item.price,
              discount: 0,
              totalDiscount: 0,
            }
            updatedListItems.push(newItem)
        }

        srnoCount++;
    })

    invoiceJSON.listItems = updatedListItems
    calcTAX(invoiceJSON)
    writeJSONToFile(invoiceJSON, "invoice.json")
    return invoiceJSON
}

const updateListItemsFromFixedIndividualPriceList = (invoiceJSON) => {
  const listItems = invoiceJSON.listItems
  const priceList = invoiceJSON.priceList
  const updatedListItems = []
  let srnoCount = 1;

  listItems.map(item => {
    
    let disc = Math.min(item.price * (priceList.fixedPercentage / 100), priceList.maximumDiscountPerItem)

    updatedListItems.push({
      ...item,
      srno: srnoCount,
      discountedPrice: item.price - disc,
      discount: disc,
      totalDiscount: disc * item.quantity
    })

    srnoCount++;
  })

  invoiceJSON.listItems = updatedListItems
  calcTAX(invoiceJSON)
  writeJSONToFile(invoiceJSON, "invoice.json")
  return invoiceJSON
} 

const updateListItemsFromBulkIndividualPriceList = (invoiceJSON) => {
  const listItems = invoiceJSON.listItems
  const priceList = invoiceJSON.priceList
  const updatedListItems = []
  let srnoCount = 1;
  
  listItems.map(item => {
      let x = priceList.customItemPrices.find(
        priceListItem => checkForItemMatch(item, priceListItem)
      )

      let range = x && x.ranges.find(
        range => getRange(item.quantity, range.minQuantity, range.maxQuantity)
      )

      if(range) {
        updatedListItems.push({
            ...item,
            srno: srnoCount,
            discountedPrice: range.customPrice,
            discount: range.totalDiscount,
            totalDiscount: range.totalDiscount * item.quantity
        })
      } else {
          let newItem = {
            ...item,
            srno: srnoCount,
            discountedPrice: item.price,
            discount: 0,
            totalDiscount: 0,
          }
          updatedListItems.push(newItem)
      }

      srnoCount++;
  })

  invoiceJSON.listItems = updatedListItems
  calcTAX(invoiceJSON)
  writeJSONToFile(invoiceJSON, "invoice.json")
  return invoiceJSON
}

const isIGST = (invoiceJSON) => {
    return invoiceJSON.customerDetails.address.stateCode === "KA";
}

const calcTAX = (invoiceJSON) => {
    return isIGST(invoiceJSON) ? calcIGST(invoiceJSON) : calcGST(invoiceJSON)
}

const calcIGST = (invoiceJSON) => {
    const listItems = invoiceJSON.listItems
    listItems.map(item => {
      item.IGST = Math.round((item.discountedPrice*item.tax/100) * 100  + Number.EPSILON) / 100
      item.totalTax = item.IGST
      item.amount = Math.round((item.totalTax + item.discountedPrice) * 100  + Number.EPSILON) / 100
      item.totalAmount = Math.round((item.amount * item.quantity) * 100  + Number.EPSILON) / 100
    })
}

const calcGST = (invoiceJSON) => {
    const listItems = invoiceJSON.listItems
    listItems.map(item => {
        item.CGST = Math.round((item.discountedPrice*item.tax/200) * 100  + Number.EPSILON) / 100
        item.SGST = Math.round((item.discountedPrice*item.tax/200) * 100  + Number.EPSILON) / 100
        item.totalTax = item.CGST + item.SGST
        item.amount = Math.round((item.totalTax + item.discountedPrice) * 100  + Number.EPSILON) / 100
        item.totalAmount = Math.round((item.amount * item.quantity) * 100  + Number.EPSILON) / 100
    })
}

const calcSubTotal = (items) => {
    let totalPayableAmount = 0;
    items.map(item => {
        totalPayableAmount += item.price*item.quantity
    })
    return totalPayableAmount
}

const calcTotalTax = (items) => {
  let totalTax = 0;
  items.map(item => {
    totalTax += (item.totalTax*item.quantity)
  })
  return Math.round(totalTax * 100  + Number.EPSILON) / 100
}

const calcTotalDiscount = (items) => {
    let totalDiscountAmount = 0;
    items.map(item => {
        totalDiscountAmount += item.totalDiscount
    })

    return totalDiscountAmount
}

const totalItems = (items) => {
    let totalItems = 0;
    items.map(item => {
        totalItems += item.quantity
    })
    return totalItems
}

function formatCurrency(INR) {
    return "Rs. " + (INR);
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
    } else {
      str = "";
    }
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

function createHeaderAndFooter(doc) {
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
}

module.exports = {
    updateListItemsFromUnitIndividualPriceList,
    calcSubTotal,
    calcTotalDiscount,
    currencyInWords,
    createHeaderAndFooter,
    isIGST,
    calcTotalTax,
    totalItems,
    formatCurrency,
    updateListItemsFromBulkIndividualPriceList,
    updateListItemsFromFixedIndividualPriceList
}