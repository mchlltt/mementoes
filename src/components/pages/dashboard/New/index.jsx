import NProgress from 'nProgress';

module.exports = {
  path: '/dashboard/new',
  getComponent(location, cb) {
  	NProgress.start();
    require.ensure([], (require) => {
			require('nProgress').done();
      cb(null, require('./New'));
    });
  }
};