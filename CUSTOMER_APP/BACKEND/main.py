from flask import Flask
from flask import request, send_file
from flask_cors import CORS
import qrcode

app = Flask(__name__)

@app.route('/api/v1/qr', methods=['GET'])
def get_qr_code():
    wallet_id = request.args.get('wallet_id')

    qr_code_info = f"{wallet_id}"

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


    response = send_file(qr_code_info + '.png', mimetype='image/png')
    response.headers['Access-Control-Allow-Origin'] = '*'

    return response

if __name__ == "__main__":
    CORS(app)
    app.run(debug=True, port=5002, host="192.168.0.239")

