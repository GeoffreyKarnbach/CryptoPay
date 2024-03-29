from flask import Flask, jsonify
from flask import request, send_file
from flask_cors import CORS
import time
import uuid
import qrcode
import requests
import pprint

'''
CUSTOMER -> WALLET_ID, CUSTOMER_NAME, CUSTOMER_ADDRESS
TRANSACTIONS -> from_wallet_id, to_wallet_id, AMOUNT, DATE
'''

class Customer:
    def __init__(self, wallet_id, name, address):
        self.wallet_id = wallet_id
        self.name = name
        self.address = address

class Transaction:
    def __init__(self, from_wallet_id, to_wallet_id, amount):
        self.id = uuid.uuid4()
        self.from_wallet_id = from_wallet_id
        self.to_wallet_id = to_wallet_id
        self.amount = amount
        self.timestamp = time.time()    

app = Flask(__name__)

customers = []
transactions = []

@app.route('/api/v1/transactions', methods=['GET'])
def get_all_transactions_for_customer():
    wallet_id = request.args.get('wallet_id')

    target_request_url = "http://192.168.0.239:5000/api/v1/transaction/history?wallet_id=" + wallet_id
    response = requests.get(target_request_url)
    return response.json()


@app.route('/api/v1/check_confirm_payment', methods=['POST'])
def check_payment_is_confirmed():
    from_wallet_id = request.form.get('from_wallet_id')
    to_wallet_id = request.form.get('to_wallet_id')
    amount = request.form.get('amount')

    target_request_url = "http://192.168.0.239:5000/api/v1/transaction/history?wallet_id=" + to_wallet_id
    response = requests.get(target_request_url)
    if response.status_code != 200:
        return jsonify({'error': 'Target wallet not found'}), 404

    for transaction in response.json():
        if transaction['from_wallet_id'] == from_wallet_id and str(transaction['amount']) == str(amount):
            return jsonify({'message': 'Payment confirmed'}), 200

    return jsonify({'error': 'Payment not confirmed'}), 404


@app.route('/api/v1/register', methods=['POST'])
def register_customer():

    if not request.form.get("wallet_id") or \
        not request.form.get("customer_name") or \
        not request.form.get("customer_address"):
        return jsonify({'error': 'Need wallet_id, customer_name and customer_address in the request'}), 400
    
    print(customers)

    new_customer = Customer(
        request.form.get("wallet_id"),
        request.form.get("customer_name"),
        request.form.get("customer_address")
    )

    for customer in customers:
        if customer.wallet_id == request.form.get("wallet_id"):
            return jsonify({'message' : 'Logged in successfully', 'wallet_id': customer.wallet_id}), 200
    
    target_request_url = "http://192.168.0.239:5000/api/v1/wallet?wallet_id=" + new_customer.wallet_id
    response = requests.get(target_request_url)
    if response.status_code != 200:
        return jsonify({'error': 'Wallet not found, cannot login'}), 404
        
    print(response.json())


    customers.append(new_customer)

    return jsonify({'message': 'Registration successful', 'wallet_id': new_customer.wallet_id})

@app.route('/api/v1/qr', methods=['GET'])
def get_qr_code():
    wallet_id = request.args.get('wallet_id')
    transaction_amount = request.args.get('amount')

    qr_code_info = f"{wallet_id}_{transaction_amount}"

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=8,
        border=4,
    )
    qr.add_data(qr_code_info)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(qr_code_info + '.png')


    #TODO: Return the image in the response
    response = send_file(qr_code_info + '.png', mimetype='image/png')
    response.headers['Access-Control-Allow-Origin'] = '*'

    return response

if __name__ == "__main__":
    CORS(app)
    app.run(debug=True, port=5001, host="192.168.0.239")

