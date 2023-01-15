const fs = require('fs');
const path = require('path');

let sourceFile = path.join(__dirname, '/template/components/custom-data.tmpl');
let destPath = path.join(__dirname, '../../node_modules/multiple-cucumber-html-reporter/templates/components', 'custom-data.tmpl');
let readStream = fs.createReadStream(sourceFile);
let writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);

sourceFile = path.join(__dirname, '/template/components/feature-custom-metadata-overview.tmpl');
destPath = path.join(__dirname, '../../node_modules/multiple-cucumber-html-reporter/templates/components', 'feature-custom-metadata-overview.tmpl');
readStream = fs.createReadStream(sourceFile);
writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);

sourceFile = path.join(__dirname, '/template/components/feature-metadata-overview.tmpl');
destPath = path.join(__dirname, '../../node_modules/multiple-cucumber-html-reporter/templates/components', 'feature-metadata-overview.tmpl');
readStream = fs.createReadStream(sourceFile);
writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);

sourceFile = path.join(__dirname, '/template/components/features-overview.chart.tmpl');
destPath = path.join(__dirname, '../../node_modules/multiple-cucumber-html-reporter/templates/components', 'features-overview.chart.tmpl');
readStream = fs.createReadStream(sourceFile);
writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);

sourceFile = path.join(__dirname, '/template/components/features-overview.tmpl');
destPath = path.join(__dirname, '../../node_modules/multiple-cucumber-html-reporter/templates/components', 'features-overview.tmpl');
readStream = fs.createReadStream(sourceFile);
writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);

sourceFile = path.join(__dirname, '/template/components/features-overview-custom-metadata.tmpl');
destPath = path.join(__dirname, '../../node_modules/multiple-cucumber-html-reporter/templates/components', 'features-overview-custom-metadata.tmpl');
readStream = fs.createReadStream(sourceFile);
writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);

sourceFile = path.join(__dirname, '/template/components/scenarios.tmpl');
destPath = path.join(__dirname, '../../node_modules/multiple-cucumber-html-reporter/templates/components', 'scenarios.tmpl');
readStream = fs.createReadStream(sourceFile);
writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);

sourceFile = path.join(__dirname, '/template/components/scenarios-overview.chart.tmpl');
destPath = path.join(__dirname, '../../node_modules/multiple-cucumber-html-reporter/templates/components', 'scenarios-overview.chart.tmpl');
readStream = fs.createReadStream(sourceFile);
writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);

sourceFile = path.join(__dirname, '/template/feature-overview.index.tmpl');
destPath = path.join(__dirname, '../../node_modules/multiple-cucumber-html-reporter/templates', 'feature-overview.index.tmpl');
readStream = fs.createReadStream(sourceFile);
writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);

sourceFile = path.join(__dirname, '/template/features-overview.index.tmpl');
destPath = path.join(__dirname, '../../node_modules/multiple-cucumber-html-reporter/templates', 'features-overview.index.tmpl');
readStream = fs.createReadStream(sourceFile);
writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);

sourceFile = path.join(__dirname, '/template/style.css');
destPath = path.join(__dirname, '../../node_modules/multiple-cucumber-html-reporter/templates', 'style.css');
readStream = fs.createReadStream(sourceFile);
writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);

sourceFile = path.join(__dirname, '/template/components/groups-scenarios-overview.chart.tmpl');
destPath = path.join(__dirname, '../../node_modules/multiple-cucumber-html-reporter/templates/components/', 'groups-scenarios-overview.chart.tmpl');
fs.copyFile(sourceFile, destPath, (err) => {
  if (err) console.log(err);
  else console.log('copy file succeed');
});

sourceFile = path.join(__dirname, '/lib/generate-report.js');
destPath = path.join(__dirname, '../../node_modules/multiple-cucumber-html-reporter/lib', 'generate-report.js');
readStream = fs.createReadStream(sourceFile);
writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);

sourceFile = path.join(__dirname, '/lib/collect-jsons.js');
destPath = path.join(__dirname, '../../node_modules/multiple-cucumber-html-reporter/lib', 'collect-jsons.js');
readStream = fs.createReadStream(sourceFile);
writeStream = fs.createWriteStream(destPath);
readStream.pipe(writeStream);
