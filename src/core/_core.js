module.exports = function() {
	var bfet = function() {
		var me = this;
		return me;
	}

	bfet.global = {};
	bfet.global.options = {
		enableCaching: true
	}

	return bfet;
}