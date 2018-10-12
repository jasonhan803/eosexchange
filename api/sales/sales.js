'use strict';
const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

var documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.getSales = (event, context, callback) => {

  var params = {
		TableName : 'Sales'
	};

  if (event.pathParameters !== null && event.pathParameters !== undefined) {
    params.Key = {'saleId': event.pathParameters.id}

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

    var params = {
          ExpressionAttributeNames:{
            "#status": "status"
        },
        ExpressionAttributeValues: {
          ":status": "active"
         },
         FilterExpression: "#status = :status",
        TableName: "Sales"
    }

    documentClient.scan(params, function(err, data){
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
  }
};

module.exports.addSale = (event, context, callback) => {

  const body = JSON.parse(event.body);

  var params = {
    Item : {
			saleId : uuidv4(),
      sellerId: body.sale.user,
      status: 'initial',
      paymentMethod: body.sale.paymentMethod,
      price: body.sale.price,
      minLimit: body.sale.minLimit,
      maxLimit: body.sale.maxLimit,
      dateCreated: new Date().toISOString()
		},
		TableName : 'Sales'
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
