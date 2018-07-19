require('./config$');

function success() {
require('../..//app');
require('../../node_modules/dd-charts/es/f2/index');
require('../../page/area/index');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
