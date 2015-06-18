/// <reference path="../../app.d.ts" />
'use strict';

module <%= capName %>App.Directives.<%= camelName %> {

    angular.module('<%= appname %>')
        .directive('<%= camelName %>', function() {
            return {
                restrict: 'EA',<% if (needTemplate) { %>
                templateUrl: 'directives/<%= dashName %>/<%= dashName %>.html',<% } %>
                link: function (scope, element, attrs) {
                    element.text('<%= camelName %> directive');
                }
            };
        });

}
