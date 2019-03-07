'use strict';

module.exports = function (server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};

module.exports = function (app) {
  var mysql = app.dataSources.mysql;
  var user = app.models.user;
  var CustomToken = app.models.CustomToken;
  var Store = app.models.Store;
  var Post = app.models.Post;
  var StorePicture = app.models.StorePicture;
  var StoreFeedback = app.models.StoreFeedback;
  var StoreKeyword = app.models.StoreKeyword;
  var PostPicture = app.models.PostPicture;
  var PostFeedback = app.models.PostFeedback;
  var PostKeyword = app.models.PostKeyword;

  var lbTables = ['user', 'Store', 'Post','CustomToken' ,'StorePicture', 'StoreFeedback',
      'StoreKeyword','PostPicture','PostFeedback','PostKeyword'
  ];

  mysql.autoupdate(lbTables, function (er) {
    if (er) throw er;


    for (var table in lbTables) {
      console.log('\nAutoupdated table ' + lbTables[table] + '.');
    }
    //mysqlDs.disconnect();
  });

  // delete app.models.user.validations.password;
  delete app.models.user.validations.username;
};