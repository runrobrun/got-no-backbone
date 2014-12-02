ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Contact = Marionette.ItemView.extend({
    tagName: 'tr',
    template: "#contact-list-item",

    events: {
      "click": "showName"
    },

    showName: function(e) {
      console.log($(e.target).text());
    }

  });

  List.Contacts = Marionette.CompositeView.extend({
    tagName: 'table',
    className: 'table table-hover',
    template: "#contact-list",
    childView: List.Contact,
    childViewContainer: "tbody"
  });

});
