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


  module.exports = {
    options
  };
  