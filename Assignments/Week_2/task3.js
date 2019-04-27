const { format } = require('date-fns');
const p = require('./task2');

(async () => {
  const products = await p({ consoleAllowed: false });

  products.forEach((pd) => {
    // Remove 'dateUpdated' column
    if (Object.hasOwnProperty.call(pd, 'dateUpdated')) {
      console.log('ayyyy');
      pd['updated'] = pd['dateUpdated'];
      delete pd['dateUpdated'];
    }
    
    pd['updated'] = format(pd['updated'], 'MM/dd/yyyy');
    console.log(pd.updated);
  });
})();
