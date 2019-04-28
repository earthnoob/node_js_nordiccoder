const {format} = require('date-fns');
const xl = require('excel4node');
const p = require('./task2');

(async () => {
  const products = await p({consoleAllowed: false});

  products.map((pd) => {
    const pdc = pd;

    // Remove 'dateUpdated' column
    if (Object.hasOwnProperty.call(pdc, 'dateUpdated')) {
      pdc.updated = pdc.dateUpdated;
      delete pdc.dateUpdated;
    }

    pdc.updated = format(pdc.updated, 'MM/dd/yyyy');
    console.log(pdc.updated);
    return pdc;
  });

  // Create an excel sheet
  let wb = new xl.Workbook();
  let ws = wb.addWorksheet('Sheet 1');

  Object.keys(products[0]).forEach((key, idx) => { ws.cell(1, idx + 1).string(key); });

  products.forEach((pd, index) => {
    Object.keys(pd).forEach((k, i) => {
      ws.cell(index + 1, i + 1).string(pd[k].toString());
    });
  });
  ws.cell(2, 1).string('waaaat');
  wb.write('task3.xlsx');
})();
