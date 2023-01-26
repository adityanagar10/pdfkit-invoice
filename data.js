const { isIGST } = require("./helper.js")

const makeTableJSON = (invoice) => {
  let data = {}
  
  if(isIGST(invoice)) {
    data = {
      "headers": [
        { label:"SR No.", property:"srno", align: "left", headerAlign:"center", width: 30},
        { label:"Item", property:"itemName", align: "left", headerAlign:"center", width: 110},
        { label:"HSN/SAC", property:"hsnORSac", align: "left", headerAlign:"center", width: 70},
        { label:"Quantity", property:"quantity", align: "left", headerAlign:"center", width: 60},
        { label:"Item Price", property:"price", align: "right", headerAlign:"center", width: 60},
        { label:"Discount Per Item", property:"discount", align: "right", headerAlign:"center", width: 60},
        { label:"Discounted Price", property:"discountedPrice", align: "right", headerAlign:"center", width: 75},
        { label:"IGST", property:"IGST", align: "right", headerAlign:"center", width: 60},
        { label:"Item Price after Discount", property:"amount", align: "right", headerAlign:"center", width: 110},
        { label:"Amount", property:"totalAmount", align: "right", headerAlign:"center", width: 80}
      ],
      "datas": invoice.listItems
    }
  } else {
    data = {
      "headers": [
        { label:"SR No.", property:"srno", align: "left", headerAlign:"center", width: 30},
        { label:"Item", property:"itemName", align: "left", headerAlign:"center", width: 75},
        { label:"HSN/SAC", property:"hsnORSac", align: "left", headerAlign:"center", width: 60},
        { label:"Quantity", property:"quantity", align: "left", headerAlign:"center", width: 60},
        { label:"Item Price", property:"price", align: "right", headerAlign:"center", width: 60},
        { label:"Discount Per Item", property:"discount", align: "right", headerAlign:"center", width: 70},
        { label:"Discounted Price", property:"discountedPrice", align: "right", headerAlign:"center", width: 70},
        { label:"CGST Per Item", property:"CGST", align: "right", headerAlign:"center", width: 70},
        { label:"SGST Per Item", property:"SGST", align: "right", headerAlign:"center", width: 70},
        { label:"Item Price after Discount", property:"amount", align: "right", headerAlign:"center", width: 100},
        { label:"Amount", property:"totalAmount", align: "right", headerAlign:"center", width: 70}
      ],
      "datas": invoice.listItems
    }
  }

  return data
}

module.exports = {
  makeTableJSON,
};