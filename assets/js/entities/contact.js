ContactManager.module("Entities", function(Entities, ContactManger, Backbone, Marionette, $, _){
  // Create a model for our app
  Entities.Contact = Backbone.Model.extend({
    urlRoot:"contacts",

    validate: function(attrs, options) {
      var errors = {};
      if (! attrs.firstName) {
        errors.firstName = "Can't be blank";
      }
      if (! attrs.lastName) {
        errors.lastName = "Can't be blank";
      } else {
        if (attrs.lastName.length < 2){
          errors.lastName = "Come on. That is a pretty short last name! Try again.";
        }
      }
      if (! _.isEmpty(errors)) {
        return errors;
      }
    },

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
    return contacts.models;
  };

  var API = {
    getContactEntities: function() {
      var contacts = new Entities.ContactCollection();
      var defer = $. Deferred();
      contacts.fetch({
        success: function(data){
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      $.when(promise).done(function(contacts){
        if(contacts.length === 0) {
          var models = initializeContacts();
          contacts.reset(models);
        }
      });
      return promise;
    },
    getContactEntity: function(contactId) {
      var contact = new Entities.Contact({id: contactId});
      var defer = $.Deferred();
      setTimeout(function() {
        contact.fetch({
          success: function(data) {
            defer.resolve(data);
          },
          error: function(data) {
            defer.resolve(undefined);
          }
        });
      }, 2000);
      return defer.promise();
    }

  };

  ContactManger.reqres.setHandler("contact:entities", function() {
    return API.getContactEntities();
  });

  ContactManger.reqres.setHandler("contact:entity", function(id) {
    return API.getContactEntity(id);
  });

});


