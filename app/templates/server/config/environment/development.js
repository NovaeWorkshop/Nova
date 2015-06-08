/// <reference path="../../server.d.ts" />
'use strict';

module.exports = {
  server: {
    url: 'http://localhost:9000'
  }<% if (filters.backend === 'mongo') { %>,
  mongo: {
    uri: 'mongodb://localhost/<%= slugName %>-dev'
  }<% } %>
};
