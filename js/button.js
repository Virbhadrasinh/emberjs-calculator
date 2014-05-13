App.ButtonController = Ember.Controller.extend({
	init: function() {
	    this._super();
	    this.set("model", App.buttonModel);
	},
//	currentValue : {},
	actions : {
		click : function(data) {
			//this.get('target').send('buttonClicked',data); //Not working
			var controller = App.__container__.lookup("controller:index");
			var buttonType = data.type;
			if (buttonType === "clear") {
				controller.send('clearData',data);
			} else {
				if (buttonType === "number" || (buttonType === "special" && data.value === ".")) {
					controller.send('buttonClicked',data);
				} else if (buttonType === "special") {
					controller.send('specialButtonClicked',data);
				}
			}
//			this.set("currentValue", data);
		}
	}
});

App.ButtonView = Ember.View.extend({
	init: function() {
	    this._super();
	    this.set("controller", App.ButtonController.create());
	},
	templateName : 'button',
	attributeBindings: ['data-actualValue', 'data-type'],
	click : function(e) {
		var ele = $(e.target);
		this.get('controller').send('click', {
			value : ele.data("actualvalue"),
			type : ele.data("type")
		});
	}
});