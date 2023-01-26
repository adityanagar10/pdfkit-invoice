const { createInvoice } = require("./createInvoice.js");
const {updateListItemsFromUnitIndividualPriceList} = require("./helper.js")

const newInvoiceInputJSON = {
  invoice : {
    id: "FINKIT-INV-2023-01-23-13-51-000681",
    placeOfSupply: "Finkit",
    gstNo: "37ABZPR4548N1ZE", //customer or organization gst number?
    gstTreatment: "businessTaxable",
    terms: "NET 15",
    termsDetail: "Due will be paid within 15 days",
    invoiceDate: "2023-01-13 14:23:35.991",
    dueDate: "2023-01-13 14:23:35.991",
    createdTime: "2023-01-13 14:23:35.991",
    customerId: "15336091-1788-473b-83e6-f3484f14f37b",
    paymentsId: "pay_L3h2HZYLv1mHab"
  },
  customerDetails : {
    id: "15336091-1788-473b-83e6-f3484f14f37b",
    name: "Kush Vora",
    email: "kush.vora@nxtbig.com",
    phone: "+918976606620",
    address : {
      id: "b8f0d6cc-5403-43a4-9ed3-73731bc9e919",
      addressType: "BILLING",
      addressLineOne: "C-602 Anand Towers, Bldg no. 42",
      addressLineTwo: "Opposite Tilak Nagar Police Chowky, Tilak Nagar, Chembur",
      city: "Mumbai",
      zipCode:"400089",
      state: "Maharashtra",
      country: "India",
      stateCode: "KA"
    }
  },
  organization: {
    id: "8fac285c-3701-4a20-92af-7a5421f84161",
    name: "NxtBig Software Labs Pvt. Ltd",
    address: {
      id: "c83ab7b8-bc2b-4de6-8714-e17c3c798a22",
      addressType: "SHIPPING",
      addressLineOne: "A209, HiLife Sunnyside",
      addressLineTwo: "8/1, Hado Siddapura, Off Sarjapur Road",
      city: "Bengaluru",
      zipCode:"560035",
      state: "Karnataka",
      country: "India",
      stateCode: "KA"
    },
    GST:"29AAGCN6788B1Z2"
  },
  priceList: {
    id: "411433f8-5aa4-4015-8d15-c6efb53dc684",
    name: "Default Price List",
    description: "Default Price List",
    priceListType: "UNIT",
    canBeUsedByAllCustomers: true,
    createdTime: "2023-01-13 14:23:35.991",
    updatedAt: null,
    activatesAt: "2023-01-13 14:23:35.991",
    expiresAt: "2023-01-13 14:23:35.991",
    couponName : [
      {
        id: "411433f8-5aa4-4015-8d15-c6efb53dc688",
        name: "DIWALI20",
        description: "20% off on all items",
        unitPriceListId: "411433f8-5aa4-4015-8d15-c6efb53dc684",
        bulkPriceListId: null,
        fixedPriceListId: null
      }
    ],
    customItemPrices: [
      {
        customItemPriceId: "d50e009b-c022-4f95-9fd0-840cd73f94f5",
        itemId: "ITEM-1",
        discountPercent: 20,
        customPrice: 9599.20,
        totalDiscount: 2399.8,
        unitIndividualPriceListId: "411433f8-5aa4-4015-8d15-c6efb53dc684"
      },
      {
        customItemPriceId: "d50e009b-c022-4f95-9fd0-840cd73f94f5",
        itemId: "ITEM-2",
        discountPercent: 15,
        customPrice: 4249.15,
        totalDiscount: 749.85,
        unitIndividualPriceListId: "411433f8-5aa4-4015-8d15-c6efb53dc684"
      },
      {
        customItemPriceId: "d50e009b-c022-4f95-9fd0-840cd73f94f5",
        itemId: "ITEM-3",
        discountPercent: 10,
        customPrice: 899.10,
        totalDiscount: 99.90,
        unitIndividualPriceListId: "411433f8-5aa4-4015-8d15-c6efb53dc684"
      },
      {
        customItemPriceId: "d50e009b-c022-4f95-9fd0-840cd73f94f5",
        itemId: "ITEM-5",
        discountPercent: 50,
        customPrice: 300,
        totalDiscount: 300,
        unitIndividualPriceListId: "411433f8-5aa4-4015-8d15-c6efb53dc684"
      },
      {
        customItemPriceId: "d50e009b-c022-4f95-9fd0-840cd73f94f5",
        itemId: "ITEM-7",
        discountPercent: 75,
        customPrice: 250,
        totalDiscount: 1000,
        unitIndividualPriceListId: "411433f8-5aa4-4015-8d15-c6efb53dc684"
      },
    ]
  },                              
  listItems: [
    {
      itemId: "ITEM-1",
      quantity: 2,
      price: 11999,
      tax: 24,
      orderId: "order-FINKIT-2023-01-13-19-37",
    },
    {
      itemId: "ITEM-2",
      quantity: 3,
      price: 4999,
      tax: 12,
      orderId: "order-FINKIT-2023-01-13-19-37",
    },
    {
      itemId: "ITEM-3",
      quantity: 1,
      price: 999,
      tax: 5,
      orderId: "order-FINKIT-2023-01-13-19-37",
    },
    {
      itemId: "ITEM-4",
      quantity: 7,
      price: 1199,
      tax: 18,
      orderId: "order-FINKIT-2023-01-13-19-37",
    }
  ]
}

const invoice = updateListItemsFromUnitIndividualPriceList(newInvoiceInputJSON);
createInvoice(invoice, "invoice.pdf");