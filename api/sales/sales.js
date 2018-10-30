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

    var aParams = {
      TableName: "Sales",
      FilterExpression: "#sale_status = :sale_status",
      ExpressionAttributeNames:{
        "#sale_status": "sale_status"
      },
      ExpressionAttributeValues: {
        ":sale_status": "active"
       }
    }

    documentClient.scan(aParams, function(err, data){
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
  console.log(body);

  var params = {
    Item : {
			saleId : uuidv4(),
      sellerId: body.sale.user,
      sale_status: 'initial',
      paymentMethod: body.sale.paymentMethod,
      price: body.sale.price,
      minLimit: body.sale.minLimit,
      maxLimit: body.sale.maxLimit,
      dateCreated: new Date().toISOString()
		},
		TableName : 'Sales'
	};

  // Add Sale Item to Sale Table
  documentClient.put(params, function(err, data){
    console.log('made it here');

    const sale = {
      saleId: params.Item.saleId
    }

    console.log(sale);

    console.log(body.sale.user);

    console.log(params.Item.maxLimit);
    console.log(params.Item.price);
    let adjustedBalance = (params.Item.maxLimit/params.Item.price);

    console.log(adjustedBalance);

    // Deduct the max amount * price/EOS from the balance.  create that in a pendingBalance
    var sellerParams = {
      TableName: 'Sellers',
      Key: {
        "accountName": body.sale.user
      },
      ReturnValues: 'UPDATED_NEW',
      UpdateExpression: 'SET #sales = list_append(if_not_exists(#sales, :empty_list), :sale), salesBalance = salesBalance + :b, actualBalance = actualBalance - :b',
      ExpressionAttributeNames: {
        '#sales': 'sales'
      },
      ExpressionAttributeValues: {
        ':sale': [sale],
        ':empty_list': [],
        ':b': adjustedBalance
      }
    }



		if (err) {
		    callback(err, null);
		} else {
        console.log('Created the Sale Succesfully...');
        documentClient.update(sellerParams, function(err, data){
          console.log(data);
          console.log(err);

          const response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
              "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({
                message: 'success',
                newActualBalance: data.Attributes.actualBalance,
                newSalesBalance: data.Attributes.salesBalance
            }),
          };

          if (err) {
      		    callback(err, null);
      		} else {
      		    callback(null, response);
      		}
        });
		    //callback(null, response);
		}
	});
};

module.exports.updateSale = (event, context, callback) => {

  const body = JSON.parse(event.body);
  console.log(body);

  // Updating 'Reserve' action adds Buyer to Sale Item and updates status to 'Reserve'
  var params = {
    TableName: 'Sales',
    Key: {
      "saleId": body.saleId
    },
    ReturnValues: 'UPDATED_NEW',
    UpdateExpression: 'SET sale_status = :a, buyerId = :b',
    ExpressionAttributeValues: {
      ':a': body.action,
      ':b': body.buyer,
    }
  }

  documentClient.update(params, function(err, data){
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
