const {WEBSITE_URL, WEBSITE_NAME, KHALTI_PAYMENT_RETURN_URL} = require("../env");
const request = require("request");

exports.initKhaltiPayment = async (req, res, savedOrder, onError) => {
    try {
        console.log("======================================================");
        console.log("temp order", savedOrder);
        console.log("======================================================");

        const products = savedOrder.products.map(product => {
            return {
                identity: product.productId,
                name: product.productName,
                total_price: product.salePrice * product.quantity,
                quantity: product.quantity,
                unit_price: product.salePrice
            }
        });

        const options = {
            'method': 'POST',
            'url': 'https://a.khalti.com/api/v2/epayment/initiate/',
            'headers': {
                'Authorization': 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "return_url": KHALTI_PAYMENT_RETURN_URL,
                "website_url": WEBSITE_URL,
                "amount": savedOrder.finalAmount * 100, // Amount in paisa
                "purchase_order_id": savedOrder._id,
                "purchase_order_name": "Order Payment",
                "customer_info": {
                    "name": req.session.user.firstName + " " + req.session.user.lastName,
                    "email": req.session.user.email,
                    "phone": req.session.user.phone
                },
                "product_details": products,
                "merchant_username": WEBSITE_NAME,
            })
        };
        request(options, function (error, response) {
            if (error) {
                console.log("Error in initKhaltiPayment: ", error);
                console.log("Response in initKhaltiPayment: ", response.body);
                return onError(error, response.body);
            }
            res.status(200).json(JSON.parse(response.body));
        });
    } catch (error) {
        console.log("Error in initKhaltiPayment: ", error);
        onError(error);
    }
};

exports.verifyKhaltiPayment = (req, res, onVerified, onFailed) => {
    const {status, transaction_id, purchase_order_id, amount, total_amount} = req.query;

    if (!status || !transaction_id || !purchase_order_id || !amount || !total_amount) {
        console.log("Payment verification failed: Required fields missing in request query");
        return onFailed(res);
    }

    if (status === 'Completed' && transaction_id) {
        // Payment is successful
        console.log("Payment SUCCESSFUL");
        const details = {transaction_id, purchase_order_id, amount, total_amount};
        onVerified(req, res, details);
    } else {
        // Payment failed or canceled
        console.log("Payment FAILED or CANCELED");
        onFailed(res);
    }
};