function triggerActionResultSocket(params, context, done) {
	var admin = context.getAppAdminContext();
	var objectURI = params.uri;
	var actionResult = admin.objectWithURI(objectURI);
	actionResult.refresh({
		success: function(theObject) {
			var body = {
				"commandID": theObject.getUUID(),
				"actionResult": theObject._customInfo
			};

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "http://youwill.kiicloud.com:3000/actionResult",
				"type": "POST",
				"headers": {
					"content-type": "application/json",
					"cache-control": "no-cache",
					"postman-token": "727eeae4-6577-63c1-bed8-2c41fe6fb9de"
				},
				"processData": false,
				"data": JSON.stringify(body)
			};

			$.ajax(settings).done(function (response) {
				done("success")
			});
		},
		failure: function(theObject, errorString) {
			done("Error refreshing object: " + errorString);
		}
	});
}
