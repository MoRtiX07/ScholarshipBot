from flask import Flask, request, jsonify
from flask_cors import CORS
from logic import check_eligibility

app = Flask(__name__)
CORS(app)

@app.route("/check", methods=["POST"])
def check():
    user = request.json
    results = check_eligibility(user)
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
