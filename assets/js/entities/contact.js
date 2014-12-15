ContactManager.module("Entities", function(Entities, ContactManger, Backbone, Marionette, $, _){
  // Create a model for our app
  Entities.Contact = Backbone.Model.extend({
    urlRoot:"contacts",
    getFullName: function() {
      return this.get('firstName') + ' ' + this.get('lastName');
    }
  });

  Entities.configureStorage(Entities.Contact);

  Entities.ContactCollection = Backbone.Collection.extend({
    url: "contacts",
    model: Entities.Contact,
    comparator: "firstName"
  });

  Entities.configureStorage(Entities.ContactCollection);

  var contacts;

  var initializeContacts = function() {
    var contacts = new Entities.ContactCollection([

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
      },
      {
        id:5,
        firstName: 'Abe',
        lastName: 'Apple',
        phoneNumber: '555-2222'
      },
      {
        id: 4,
        firstName: 'Rob',
        lastName: 'Hammann',
        phoneNumber: '555-1111'
      }
    ]);
    contacts.forEach(function(contact){
      contact.save();
    });
    return contacts;
  };

  var API = {
    getContactEntities: function() {
      var contacts = new Entities.ContactCollection();
      contacts.fetch();
      if (contacts.length === 0) {
        return initializeContacts();
      }
    return contacts;
    },
    getContactEntity: function(contactId) {
      var contact = new Entities.Contact({id: contactId});
      contact.fetch();
      return contact;
    }

  };

  ContactManger.reqres.setHandler("contact:entities", function() {
    return API.getContactEntities();
  });

  ContactManger.reqres.setHandler("contact:entity", function(id) {
    return API.getContactEntity(id);
  });

});


