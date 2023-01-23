const { createInvoice } = require("./createInvoice.js");

const invoice = {
  organization: {
    name: "NxtBig Software Labs Pvt. Ltd",
    address_line_one: "A209, HiLife Sunnyside",
    address_line_two: "48/1, Hado Siddapura, Off Sarjapur Road",
    city:"Bengaluru",
    state:"Karnataka",
    country: "India",
    zip_code:"560035",
    gst:"29AAGCN6788B1Z2"
  },
  invoice_number: "FINKIT-INV-2023-01-23-13-51-000681",
  invoice_date: "22-01-2023",
  invoice_terms: "Due on Payment",
  invoice_due_date: "22-01-2023",
  customer: {
    name: "Chandra Shekhar Kanteti",
    email: "kc@nxtbig.com",
    phone: "+918976606620",
    address_line_one: "C-602 Anand Towers, Bldg no. 42",
    address_line_two: "Opposite Tilak Nagar Police Chowky, Tilak Nagar, Chembur",
    city: "Mumbai",
    zip_code:"400089",
    state: "Maharashtra",
    country: "India"
  }
}

// const invoice = {
//   shipping: {
//     name: "John Doe",
//     address: "1234 Main Street",
//     city: "San Francisco",
//     state: "CA",
//     country: "US",
//     postal_code: 94111
//   },
//   items: [
//     {
//       item: "TC 100",
//       description: "Toner Cartridge",
//       quantity: 2,
//       amount: 6000
//     },
//     {
//       item: "USB_EXT",
//       description: "USB Cable Extender",
//       quantity: 1,
//       amount: 2000
//     }
//   ],
//   subtotal: 8000,
//   paid: 0,
//   invoice_nr: 1234
// };

createInvoice(invoice, "invoice.pdf");
