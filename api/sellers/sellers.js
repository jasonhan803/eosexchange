'use strict';
const AWS = require('aws-sdk');
var documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.getSeller = (event, context, callback) => {
  var params = {
		TableName : 'Sellers'
	};

  console.log(event);
  if (event.pathParameters != null) {
    console.log('inside here');
    params.Key = {'accountName': event.pathParameters.name}

    documentClient.get(params, function(err, data){
      console.log(data);
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(data),
      };

  		if (err) {
  		    callback(err, null);
  		} else {
  		    callback(null, response);
  		}
  	});
  } else {

    documentClient.scan(params, function(err, data){
      console.log(data);
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify({
          data: data
        }),
      };

  		if (err) {
  		    callback(err, null);
  		} else {
  		    callback(null, response);
  		}
  	});
  }
};

module.exports.addSeller = (event, context, callback) => {

  const body = JSON.parse(event.body);
  console.log(body);
  var params = {
    Item : {
			"accountName" : body.accountName,
      "balance": 0,
      "sales": {}
		},
		TableName : 'Sellers'
	};

  documentClient.put(params, function(err, data){
    console.log(data);
    console.log(err);
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({
          message: 'success'
      }),
    };

		if (err) {
		    callback(err, null);
		} else {
		    callback(null, response);
		}
	});
};
