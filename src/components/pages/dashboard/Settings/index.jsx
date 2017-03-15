import NProgress from 'nProgress';

module.exports = {
  path: '/dashboard/settings',
  getComponent(location, cb) {
  	NProgress.start();
    require.ensure([], (require) => {
			require('nProgress').done();
      cb(null, require('./Settings'));
    });
  }
};