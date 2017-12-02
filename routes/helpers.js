const utils = {};

utils.respond = function(status, msg, data, res) {

	const codes = {
		401: "Not Authorized",
		200: "Success",
		400: "Bad Request"
	};

	res.status(status);

	return res.json({
		"message": msg || codes[status],
		"statusCat": status !== 200 ? "https://http.cat/" + status : undefined,
		"data": data || [],
	})
};

module.exports = utils;