const utils = {};

utils.respond = function(status, data, res) {

	const codes = {
		401: "Not Authorized",
		200: "Success",
	};

	return res.json({
		"status": status,
		"message": codes[status],
		"statusCat": status !== 200 ? "https://http.cat/" + status : undefined,
		"data": data || [],
	})
};

module.exports = utils;