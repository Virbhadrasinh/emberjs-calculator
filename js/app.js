App = Ember.Application.create();

App.IndexController = Ember.Controller.extend({
	needs : ["button", "display"],
	firstOperand : undefined,
	operator : undefined,
	secondOperand : undefined,
	total : undefined,
	clearData : function(){
		this.resetValues();
		this.get('controllers.display').send('clearDisplayData');
	},
	buttonClicked : function(data) {
		this.get('controllers.display').send('setDataToDisplay',data.value);
	},
	specialButtonClicked : function(data){
		var display = this.get('controllers.display');
		var textValue = display.get('currentDisplayValue');
		display.send('clearDisplayData');
		
		var operator = data.value;
		
		if(textValue === "" || textValue === null || typeof(textValue) === "undefined"){
			//Do nothing
		}else if(typeof(this.get('firstOperand')) === "undefined"){
			this.set('firstOperand', parseFloat(textValue));
			this.set('operator', operator);
		}else if(typeof(this.get('firstOperand')) !== "undefined" && typeof(this.get('operator')) !== "undefined"){
			this.set('secondOperand', parseFloat(textValue));
			
			var total = this.calculate(this.get('firstOperand'), this.get('operator'), this.get('secondOperand'));
			this.set('total', total);
			display.send('setDataToDisplay',this.get('total'));
			this.resetValues();
			
			if(operator === "+" || operator === "-" || operator === "/" || operator === "X"){
				this.set('firstOperand', total);
				this.set('operator', operator);
				display.send('clearDisplayData');
			}
		}
	},
	calculate : function(firstOperand, operator, secondOperand){
		if(operator === "+"){
			return firstOperand + secondOperand;
		}else if(operator === "-"){
			return firstOperand - secondOperand;
		}else if(operator === "/"){
			return firstOperand / secondOperand;
		}else if(operator === "X"){
			return firstOperand * secondOperand;
		}
	},
	resetValues : function(){
		this.set('firstOperand', undefined);
		this.set('operator', undefined);
		this.set('secondOperand', undefined);
		this.set('total', undefined);
	}/*,
	test : function(){
		debugger;
		console.log("inside test on index controllers--->",arguments);
	}.observes('controllers.button.@each.currentValue')*/
});