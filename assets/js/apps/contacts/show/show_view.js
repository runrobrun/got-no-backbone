ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
  Show.MissingContact = Marionette.ItemView.extend({
    template: '#empty-contact-view'
  });

  Show.Contact = Marionette.ItemView.extend({
    template: '#contact-view'
  });
});
