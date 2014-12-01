ContactManager.module("Entities", function(Entities, ContactManger, Backbone, Marionette, $, _){
  // Create a model for our app
  Entities.Contact = Backbone.Model.extend({});

  Entities.ContactCollection = Backbone.Collection.extend({
    model: Entities.Contact,
    comparator: "firstName"
  });

  var contacts;

  var initializeContacts = function() {
    contacts = new ContactManager.Entities.ContactCollection([

      {
        id: 1,
        firstName: 'Bob',
        lastName: 'Brigham',
        phoneNumber: '555-0163'
      },
      {
        id: 2,
        firstName: 'Alice',
        lastName: 'Arten',
        phoneNumber: '555-0184'
      },
      {
        id: 3,
        firstName: 'Charlie',
        lastName: 'Campbell',
        phoneNumber: '555-1029'
      }
    ]);
  };

  var API = {
    getContactEntities: function() {
      if (contacts === undefined) {
        initializeContacts();
      }
      return contacts;
    }
  };

  ContactManger.reqres.setHandler("contact:entities", function() {
    return API.getContactEntities();
  })

});


