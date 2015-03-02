'use strict';

/**
 * Proxy server configuration.
 *
 * If you are testing an app locally that makes calls to a remote server
 * without CORS headers set, you'll get browser errors.  The following lets
 * "gulp serve" proxy these requests for you to avoid these issues.
 *
 * To use this, do something like this in your gulpfile.js:
 *
 *   var proxy = require('./tasks/proxy.js');
 *
 *   gulp.task('serve', function () {
 *     proxy.create(target);
 *
 *     browserSync({
 *       ...
 *       server: {
 *         middleware: [proxy.middleware]
 *       }
 *     }, proxy.setupBrowserSyncWebsocket);
 *   });
 *
 * Add the server.middleware property to proxy normal HTTP requests.  Add the
 * setupBrowserSyncWebsocket as the callback to proxy WebSocket requests.
 */

//// IMPORT MODULES

var httpProxy = require('http-proxy');
var util = require('gulp-util');

var proxyPrefix = '/api';
var proxyServer = null;

/**
 * Create the proxy server instance.
 *
 * @arg {string} target - URL to proxy.
 * @arg {string} [prefix] - URL prefix to match for proxies, defaults to "/api".
 */
exports.create = function (target, prefix) {
  proxyServer = httpProxy.createProxyServer({
    target: target,
    secure: false
  });

  if (prefix) {
    proxyPrefix = prefix;
  }

  /** Pass proxy errors back to the requestor. */
  proxyServer.on('error', function (err, req, res) {
    util.log('Error proxying request:', req.method, req.url, err.code);

    if (res.writeHead) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
    }
    res.end('ERROR:' + err.code);
  });
};

/** Middleware for BrowserSync to proxy requests with a certain URL prefix. */
exports.middleware = function (req, res, next) {
  if (req.url.indexOf('/api') === 0) {
    util.log('Proxying', req.method, req.url);
    proxyServer.web(req, res);
  } else {
    next();
  }
};

/** Sets up a BrowserSync instance to proxy WebSocket requests. */
exports.setupBrowserSyncWebsocket = function (err, bs) {
  // XXX HACK XXX: We need to remove the socket.io upgrade handler that
  // BrowserSync installs, as it will close sockets that it doesn't handle,
  // that aren't written to fast enough.  We save and remove it, and call it
  // manually for things that aren't for us.
  // See: https://github.com/Automattic/engine.io/blob/master/lib/server.js#L387
  var ioUpgrade = bs.server._events.upgrade;
  bs.server.removeListener('upgrade', ioUpgrade);
  bs.server.on('upgrade', function (req, socket, head) {
    if (req.url.indexOf('/api/viewer') === 0) {
      util.log('Proxying upgrade', req.method, req.url);
      proxyServer.ws(req, socket, head);
    } else {
      ioUpgrade(req, socket, head);
    }
  });
};
