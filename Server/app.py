from flask import Flask
from flask_cors import CORS, cross_origin
# flask - json 
from flask import jsonify
# Flask - request
from flask import request



app = Flask(__name__)
CORS(app)

# @app.route("/test")
# def test():
# 	return "OK boys ! i'm running"

@app.route("/trace", methods=['POST'])
def trace():
	# data = request.form["data"]
	print(request)
	data = request.get_json(force=True)

	print(data)
	return jsonify(data)


if __name__ == "__main__":
	# dev server
	# app.run()
	# Docker
	app.run(host='127.0.0.1', port=8085)
