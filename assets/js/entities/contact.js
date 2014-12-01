ContactManager.module("Entities", function(Entities, ContactManger, Backbone, Marionette, $, _){
  // Create a model for our app
  Entities.Contact = Backbone.Model.extend({});

  Entities.ContactCollection = Backbone.Collection.extend({
    model: Entities.Contact,
    comparator: "firstName"
  });
});


