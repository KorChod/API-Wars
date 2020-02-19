from flask import Flask, render_template, request, jsonify, session
import json
import data_manager

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/')
def planet_list():
    return render_template('planets.html')


@app.route('/vote', methods=['POST'])
def insert_vote():
    if request.method == 'POST':
        data_manager.insert_vote(json.loads(request.data)['planet'])
        return jsonify(status="success")


@app.route('/vote-statistics')
def get_votes():
    return data_manager.get_all_planet_votes()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8080', debug=True)
