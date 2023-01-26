const unitPriceInput = {
  invoice : {
    id: "FINKIT-INV-2023-01-23-13-51-000681",
    placeOfSupply: "Finkit",
    gstNo: "37ABZPR4548N1ZE",
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
      stateCode: "MH"
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
        customPrice: 9600,
        totalDiscount: 2400,
        unitIndividualPriceListId: "411433f8-5aa4-4015-8d15-c6efb53dc684"
      },
      {
        customItemPriceId: "d50e009b-c022-4f95-9fd0-840cd73f94f5",
        itemId: "ITEM-2",
        discountPercent: 15,
        customPrice: 4250,
        totalDiscount: 750,
        unitIndividualPriceListId: "411433f8-5aa4-4015-8d15-c6efb53dc684"
      },
      {
        customItemPriceId: "d50e009b-c022-4f95-9fd0-840cd73f94f5",
        itemId: "ITEM-3",
        discountPercent: 10,
        customPrice: 900,
        totalDiscount: 100,
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
      itemName: "Item 1",
      quantity: 2,
      hsnORSac: "998234",
      price: 12000,
      tax: 24,
      orderId: "order-FINKIT-2023-01-13-19-37",
    },
    {
      itemId: "ITEM-2",
      itemName: "Item 2",
      quantity: 3,
      hsnORSac: "998235",
      price: 5000,
      tax: 12,
      orderId: "order-FINKIT-2023-01-13-19-37",
    },
    {
      itemId: "ITEM-3",
      itemName: "Item 3",
      quantity: 1,
      hsnORSac: "998236",
      price: 1000,
      tax: 5,
      orderId: "order-FINKIT-2023-01-13-19-37",
    },
    {
      itemId: "ITEM-4",
      itemName: "Item 4",
      quantity: 7,
      hsnORSac: "998237",
      price: 1200,
      tax: 18,
      orderId: "order-FINKIT-2023-01-13-19-37",
    }
  ]
}

const bulkPriceInput = {
    invoice : {
        id: "FINKIT-INV-2023-01-23-13-51-000681",
        placeOfSupply: "Finkit",
        gstNo: "37ABZPR4548N1ZE",
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
        priceListType: "BULK",
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
            unitPriceListId: null,
            bulkPriceListId: "411433f8-5aa4-4015-8d15-c6efb53dc684",
            fixedPriceListId: null
          }
        ],
        customItemPrices: [
          {
            customItemPriceId: "d50e009b-c022-4f95-9fd0-840cd73f94f5",
            itemId: "ITEM-1",
            ranges: [
                {
                    minQuantity: 1,
                    maxQuantity: 10,
                    discountPercent: 10,
                    customPrice: 10800,
                    totalDiscount: 1200,
                    CustomItemPriceWithRange: "411433f8-5aa4-4015-8d15-c6efb53dc684"
                },
                {
                    minQuantity: 11,
                    maxQuantity: 50,
                    discountPercent: 20,
                    customPrice: 9600,
                    totalDiscount: 2400,
                    CustomItemPriceWithRange: "411433f8-5aa4-4015-8d15-c6efb53dc684"
                },
                {
                    minQuantity: 51,
                    maxQuantity: 100,
                    discountPercent: 30,
                    customPrice: 9600,
                    totalDiscount: 2400,
                    CustomItemPriceWithRange: "411433f8-5aa4-4015-8d15-c6efb53dc684"
                }
            ],
            bulkIndividualPriceListId: "411433f8-5aa4-4015-8d15-c6efb53dc684"
          },
          {
            customItemPriceId: "d50e009b-c022-4f95-9fd0-840cd73f94f5",
            itemId: "ITEM-2",
            ranges: [
                {
                    minQuantity: 1,
                    maxQuantity: 5,
                    discountPercent: 10,
                    customPrice: 4500,
                    totalDiscount: 500,
                    CustomItemPriceWithRange: "411433f8-5aa4-4015-8d15-c6efb53dc684"
                },
                {
                    minQuantity: 6,
                    maxQuantity: 11,
                    discountPercent: 20,
                    customPrice: 4000,
                    totalDiscount: 1000,
                    CustomItemPriceWithRange: "411433f8-5aa4-4015-8d15-c6efb53dc684"
                },
                {
                    minQuantity: 12,
                    maxQuantity: 100,
                    discountPercent: 30,
                    customPrice: 3500,
                    totalDiscount: 1500,
                    CustomItemPriceWithRange: "411433f8-5aa4-4015-8d15-c6efb53dc684"
                }
            ],
            bulkIndividualPriceListId: "411433f8-5aa4-4015-8d15-c6efb53dc684"
          },
          {
            customItemPriceId: "d50e009b-c022-4f95-9fd0-840cd73f94f5",
            itemId: "ITEM-4",
            ranges: [
                {
                    minQuantity: 1,
                    maxQuantity: 10,
                    discountPercent: 10,
                    customPrice: 900,
                    totalDiscount: 100,
                    CustomItemPriceWithRange: "411433f8-5aa4-4015-8d15-c6efb53dc684"
                },
                {
                    minQuantity: 11,
                    maxQuantity: 50,
                    discountPercent: 20,
                    customPrice: 800,
                    totalDiscount: 200,
                    CustomItemPriceWithRange: "411433f8-5aa4-4015-8d15-c6efb53dc684"
                },
                {
                    minQuantity: 51,
                    maxQuantity: 100,
                    discountPercent: 30,
                    customPrice: 700,
                    totalDiscount: 300,
                    CustomItemPriceWithRange: "411433f8-5aa4-4015-8d15-c6efb53dc684"
                }
            ],
            bulkIndividualPriceListId: "411433f8-5aa4-4015-8d15-c6efb53dc684"
          },
        ]
      },                              
      listItems: [
        {
          itemId: "ITEM-1",
          itemName: "Item 1",
          quantity: 5,
          hsnORSac: "998234",
          price: 12000,
          tax: 18,
          orderId: "order-FINKIT-2023-01-13-19-37",
        },
        {
          itemId: "ITEM-2",
          itemName: "Item 2",
          quantity: 7,
          hsnORSac: "998235",
          price: 5000,
          tax: 12,
          orderId: "order-FINKIT-2023-01-13-19-37",
        },
        {
          itemId: "ITEM-3",
          itemName: "Item 3",
          quantity: 6,
          hsnORSac: "998236",
          price: 1000,
          tax: 5,
          orderId: "order-FINKIT-2023-01-13-19-37",
        },
      ]
}

const fixedPriceInput = {
    invoice : {
        id: "FINKIT-INV-2023-01-23-13-51-000681",
        placeOfSupply: "Finkit",
        gstNo: "37ABZPR4548N1ZE",
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
        priceListType: "FIXED",
        canBeUsedByAllCustomers: true,
        createdTime: "2023-01-13 14:23:35.991",
        updatedAt: null,
        activatesAt: "2023-01-13 14:23:35.991",
        expiresAt: "2023-01-13 14:23:35.991",
        fixedPercentage: 15,
        maximumDiscountPerItem: 300,
        couponName : [
            {
                id: "411433f8-5aa4-4015-8d15-c6efb53dc688",
                name: "DIWALI20",
                description: "20% off on all items",
                unitPriceListId: null,
                bulkPriceListId: "411433f8-5aa4-4015-8d15-c6efb53dc684",
                fixedPriceListId: null
            }
        ],
      },                              
      listItems: [
        {
          itemId: "ITEM-1",
          itemName: "Item 1",
          quantity: 5,
          hsnORSac: "998234",
          price: 12000,
          tax: 18,
          orderId: "order-FINKIT-2023-01-13-19-37",
        },
        {
          itemId: "ITEM-2",
          itemName: "Item 2",
          quantity: 7,
          hsnORSac: "998235",
          price: 5000,
          tax: 12,
          orderId: "order-FINKIT-2023-01-13-19-37",
        },
        {
          itemId: "ITEM-3",
          itemName: "Item 3",
          quantity: 6,
          hsnORSac: "998236",
          price: 1000,
          tax: 5,
          orderId: "order-FINKIT-2023-01-13-19-37",
        },
      ]
}

module.exports = {
  unitPriceInput,
  bulkPriceInput,
  fixedPriceInput
}