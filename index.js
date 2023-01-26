const { createInvoice } = require("./createInvoice.js");
const { updateListItemsFromUnitIndividualPriceList, updateListItemsFromBulkIndividualPriceList, updateListItemsFromFixedIndividualPriceList } = require("./helper.js")
const { unitPriceInput, bulkPriceInput, fixedPriceInput } = require("./input.js")

let type = "FIXED";

let invoice = {};

switch(type) {
  case "UNIT":
    invoice = updateListItemsFromUnitIndividualPriceList(unitPriceInput);
    break
  case "BULK":
    invoice = updateListItemsFromBulkIndividualPriceList(bulkPriceInput);
    break
  case "FIXED":
    invoice = updateListItemsFromFixedIndividualPriceList(fixedPriceInput);
    break
  default:
    console.error("Type not found")
}

createInvoice(invoice, "invoice.pdf");