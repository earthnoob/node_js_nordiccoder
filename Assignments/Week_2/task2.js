const rf = require('fs').readFile;
const { formatDistance } = require('date-fns');
const viLocale = require('date-fns/locale/vi');

const readFile = filePath => new Promise((resolve, reject) => {
  rf(filePath, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const readAndProcess = ({ consoleAllowed }) => {
  let products;
  let numOfProducts = 0;
  let match;
  let matches = [];
  const reMoney = /\d{3}/g;

  return readFile('products.json')
    .then((data) => {
      products = JSON.parse(data.toString('utf8'));
      products = products.map((p) => {
        if (p) numOfProducts += 1;

        const newP = {
          ...p,
          dateUpdated: new Date(
            p.dateUpdated,
          ),
        };

        consoleAllowed === true ? console.log(`Total number of products: ${numOfProducts}.`) : '';
        consoleAllowed === true ? console.log(newP) : '';

        // Get all the matches and join them with a comma ','
        while(( match = reMoney.exec(newP.price.toString()) ) !== null) {
          matches = [...matches, match[0]];
        }

        consoleAllowed === true ? console.log(`${p.id}  -  ${p.name}  -  ${matches.join(',')} - Cap nhat cach day ${formatDistance(newP.dateUpdated, new Date(), { locale: viLocale })}`) : '';
        matches = [];

        return newP;
      });
      return products;
    })
    .catch(err => console.log(err));
};

// readAndProcess({ consoleAllowed: false }).then(data => console.log(data));
module.exports = readAndProcess;
