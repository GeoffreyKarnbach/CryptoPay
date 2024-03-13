from flask import Flask, jsonify
from flask import request
from flask_cors import CORS
import time
import uuid

'''
CUSTOMER -> WALLET_ID, BALANCE
TRANSACTIONS -> from_wallet_id, to_wallet_id, AMOUNT, DATE
'''

class Transaction:
    def __init__(self, from_wallet_id, to_wallet_id, amount):
        self.from_wallet_id = from_wallet_id
        self.to_wallet_id = to_wallet_id
        self.amount = int(amount)
        self.timestamp = int(time.time())
        self.id = uuid.uuid4()
    
    def __str__(self) -> str:
        return f"Transaction {self.id} from {self.from_wallet_id} to {self.to_wallet_id} of {self.amount} at {self.timestamp}"

    def get_dict(self):
        return {
            'id': self.id,
            'from_wallet_id': self.from_wallet_id,
            'to_wallet_id': self.to_wallet_id,
            'amount': self.amount,
            'timestamp': self.timestamp
        }


app = Flask(__name__)
wallets = {
    "0000001": 1000,
    "0000002": 1000,
    "0000003": 1000,
    "0000004": 1000,
    "0000005": 1000,
    "0000006": 1000,
    "0000007": 1000,
    "0000008": 1000,
    "0000009": 1000,
    "0000010": 1000
}

transactions = []

@app.route('/api/v1/wallet', methods=['GET'])
def get_wallet_info():
    wallet_id = request.args.get('wallet_id')
    if wallet_id in wallets:
        return jsonify({
            'wallet_id': wallet_id,
            'balance': wallets[wallet_id]
        }), 200
    return jsonify({'error': 'Wallet not found'}), 404

@app.route('/api/v1/wallet/all', methods=['GET'])
def get_all_wallet_info():
    return jsonify(wallets)

@app.route('/api/v1/transaction', methods=['POST'])
def new_transaction():

    if not request.form.get("from_wallet_id") or \
        not request.form.get("to_wallet_id") or \
        not request.form.get("amount"):
        return jsonify({'error': 'Need from_wallet_id, to_wallet_id and amount in the request body'}), 400
    
    try:
        int(request.form.get("amount"))
    except:
        return jsonify({'error': 'Amount must be a number'}), 400
    
    new_transaction = Transaction(
        request.form.get("from_wallet_id"),
        request.form.get("to_wallet_id"),
        request.form.get("amount")
    )

    print(new_transaction)
    if new_transaction.from_wallet_id not in wallets or \
        new_transaction.to_wallet_id not in wallets:
        return jsonify({'error': 'Income or outcome wallet not found'}), 404

    if new_transaction.from_wallet_id == new_transaction.to_wallet_id:
        return jsonify({'error': 'Income and outcome wallets are the same'}), 400
    
    if wallets[new_transaction.from_wallet_id] < new_transaction.amount:
        return jsonify({'error': 'Not enough money in the income wallet'}), 409
    
    wallets[new_transaction.from_wallet_id] -= new_transaction.amount
    wallets[new_transaction.to_wallet_id] += new_transaction.amount
    transactions.append(new_transaction)

    return jsonify({'message': 'Transaction successful', 'transaction_id': new_transaction.id, 'timestamp': new_transaction.timestamp}), 200

@app.route('/api/v1/transaction/history', methods=['GET'])
def get_transaction_history():

    wallet_id = request.args.get('wallet_id')

    if wallet_id not in wallets:
        return jsonify({'error': 'Wallet not found'}), 404
    result = []
    for transaction in transactions:
        if transaction.to_wallet_id == wallet_id:
            result.append(transaction.get_dict())
    
    return jsonify(result)

@app.route('/api/v1/transaction/history/all', methods=['GET'])
def get_all_transaction_history():
    result = []
    for transaction in transactions:
        result.append(transaction.get_dict())
    
    return jsonify(result)

if __name__ == "__main__":
    CORS(app)
    app.run(debug=True, port=5000)

