from flask import Flask, jsonify
from flask import request
import schedule
import threading
import requests

'''
CUSTOMER -> WALLET_ID, BALANCE, FEE
'''


app = Flask(__name__)

tracked_customers = {

}

transactions_per_customers = {

}

target_request_url = "http://127.0.0.1:5000/api/v1/transaction/history?wallet_id="

@app.route('/api/v1/customer', methods=['POST'])
def add_customer():
    wallet_id = request.form.get('wallet_id')
    if wallet_id in tracked_customers:
        return jsonify({
            'error': 'Wallet already tracked'
        })
    
    tracked_customers[wallet_id] = 0
    transactions_per_customers[wallet_id] = []

    return jsonify({"message": "Customer added successfully"})


def billing_tracking_job():
    print("#"*50)
    for customer in tracked_customers:
        response = requests.get(target_request_url + customer)
        data = response.json()
        print(data)
        print()
    print("#"*50)



if __name__ == "__main__":
    # Create a new thread that runs every 10 seconds the print_job function
    # Create a new thread that runs the flask app
    schedule.every(10).seconds.do(billing_tracking_job)

    t = threading.Thread(target=app.run, kwargs={'port': 5001})
    t.start()

    while True:
        schedule.run_pending()




