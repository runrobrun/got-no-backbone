ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Contact = Marionette.ItemView.extend({
    tagName: 'li',
    template: "#contact-list-item"
  });

  List.Contacts = Marionette.CompositeView.extend({
    tagName: 'div',
    className: 'table table-hover',
    template: "#contact-list",
    childView: List.Contact,
    childViewContainer: "ul"
  });

});
