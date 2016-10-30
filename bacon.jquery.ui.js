(function(){
	var Bacon = window.Bacon;
	if(!Bacon){
		Bacon = {};
		window.Bacon = Bacon;
	}
	if(!Bacon.$){
		Bacon.$ = {};
	}
	Bacon.$.UI = new function(){
		this.Dialog = function(jqObject, options){
			this.jq = jqObject;

			jqObject.dialog(options);

			function isOpen(){
				return jqObject.dialog('isOpen');
			}

			this.open = Bacon.Binding({
				initValue: isOpen(),
				get: isOpen(),
				set: function(open){
					if(open ^ isOpen()) {
						if (open) {
							jqObject.dialog('open');
						} else {
							jqObject.dialog('close');
						}
					}
				},
				events: Bacon.never()
			});

			this.open.addSource(
				jqObject.asEventStream('dialogclose').map(false)
					.merge(jqObject.asEventStream('dialogopen').map(true)));
		};
	}();
})();