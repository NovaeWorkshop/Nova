/// <reference path="../../server.d.ts" />
'use strict';

module.exports = {<% if (filters.backend === 'mongo') { %>
  mongo: {
  uri: 'mongodb://localhost/<%= slugName %>-test'
  }<% } %>
};
