new Vue({
	el: '#app'
});

new Vue({
	el: '#exercise',
	data: {
		attachHighlight: false,
		attachShrink: false,
		classes: '',
		classes2: '',
		truefalse: '',
		bgcolor: 'yellow',
		progress: 0
	},
	computed: {
		divClasses: function() {
			return {
				highlight: this.attachHighlight,
				shrink: this.attachShrink
			};
		},
		classes3: function() {
			switch ( this.truefalse ) {
				case 'true':
					return {
						blue: true
					}
					break;

				case 'false':
					return {
						red: true
					}
					break;
			}
		},
		progressbarwidth: function() {
			return this.progress + '%';
		}
	},
	methods: {
		startEffect: function() {
			var vm = this;

			setInterval( function() {
				if ( !vm.attachHighlight ) {
					vm.attachHighlight = true;
					vm.attachShrink = false;
				} else {
					vm.attachHighlight = false;
					vm.attachShrink = true;
				}

			}, 1000);

		},
		startProgress: function() {
			vm = this;

			setInterval( function() {
				vm.progress += 0.01;
			}, 1);
		}
	}
});