ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _){
  Edit.Contact = Marionette.ItemView.extend({
    initialize: function () {
      this.title = "Edit " + this.model.get("firstName");
      this.title += " " + this.model.get("lastName");
    }
  });
});
