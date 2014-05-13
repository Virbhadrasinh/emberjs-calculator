App.displayModel = Ember.Object.create({
    data : {
    	type : "LCD"
    }
});

App.DisplayController = Ember.Controller.extend(Ember.Evented, {
	init: function() {
	    this._super();
	    this.set("model", App.displayModel);
	},
	currentDisplayValue : "",
	setDataToDisplay : function(value){
		this.trigger("setDisplayData",value);
	},
	clearDisplayData : function(){
		this.trigger("clearDisplayData");
	}
});

App.DisplayView = Ember.View.extend({
	templateName : 'display',
	didInsertElement: function () {
		var controller = App.__container__.lookup("controller:display");
		controller.on('setDisplayData', $.proxy(this.setDisplayData, this));
		controller.on('clearDisplayData', $.proxy(this.clearDisplayData, this));
	},
	clearDisplayData : function(){
		this.$().find('input').val("");
	},
	setDisplayData : function(value){
		var element = this.$().find('input');
		var currentValue = element.val();
		var newValue = currentValue + "" + value;
		element.val(newValue);
		var controller = App.__container__.lookup("controller:display");
		controller.set("currentDisplayValue", newValue);
	}
});