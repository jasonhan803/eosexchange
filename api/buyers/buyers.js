'use strict';
const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

var documentClient = new AWS.DynamoDB.DocumentClient();

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

module.exports.addBuyer = (event, context, callback) => {

  const body = JSON.parse(event.body);

  var params = {
    TableName : 'Buyers',
    Item : {
			"accountName" : body.buyer,
      "purchases": []
		},
    ConditionExpression: 'attribute_not_exists(accountName)'
	};

  let addSaleToBuyer = (purchaseParams) => {
    documentClient.update(purchaseParams, function(err, data){
      if (err) {
          callback(err, null);
      } else {
          callback(null, response);
      }
    });
  }

  // Add Sale Item to Buyer (if not already there)
  documentClient.put(params, function(err, data){
    const purchase = {
      saleId: body.saleId
    }

    var purchaseParams = {
      TableName: 'Buyers',
      Key: {
        "accountName": body.buyer
      },
      ReturnValues: 'UPDATED_NEW',
      UpdateExpression: 'SET #purchases = list_append(if_not_exists(#purchases, :empty_list), :purchases)',
      ExpressionAttributeNames: {
        '#purchases': 'purchases'
      },
      ExpressionAttributeValues: {
        ':purchases': [purchase],
        ':empty_list': []
      }
    }

    if (err) {
      if (err.code === "ConditionalCheckFailedException") {
        console.log('Buyer Already Exists');
        addSaleToBuyer(purchaseParams);
      } else {
        callback(err, null);
      }
		} else {
      addSaleToBuyer(purchaseParams)
		}
	});
};

module.exports.getBuyer = (event, context, callback) => {
  var params = {
		TableName : 'Buyers'
	};

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    }
  };

  console.log(event);
  if (event.pathParameters != null) {
    params.Key = {'accountName': event.pathParameters.id}

    documentClient.get(params, function(err, data){
      console.log(data);

      response.body = JSON.stringify(data);

  		if (err) {
  		    callback(err, null);
  		} else {
  		    callback(null, response);
  		}
  	});
  } else {

    documentClient.scan(params, function(err, data){
      console.log(data);

      response.body = JSON.stringify(data);

  		if (err) {
  		    callback(err, null);
  		} else {
  		    callback(null, response);
  		}
  	});
  }
};
