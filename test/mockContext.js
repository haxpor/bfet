var mock = {
	username: 'haxpor',
	password: getPart1() + getPart2() + getPart3() + getPart4(),	// no worry this allow only fetching public user's profile only
																												// it's personal token, not actual password
	oauth: getPart1() + getPart2() + getPart3() + getPart4()			// it's the same thing as password
};

function getPart1() {
	return "e6d9eac6b1";
}

function getPart2() {
	return "0de760e127";
}

function getPart3() {
	return "98b260b2c4";
}

function getPart4() {
	return "df5183aa8a";
}

module.exports = mock;