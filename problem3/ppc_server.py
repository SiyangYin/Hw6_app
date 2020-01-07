from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

non_ppc_people = [
"Phyllis",
"Dwight",
"Oscar",
"Creed",
"Pam",
"Jim",
"Stanley",
"Michael",
"Kevin",
"Kelly"
]
ppc_people = [
"Angela"
]

@app.route('/')
def index(name=None):
    return render_template('ppc.html', non_ppc_people=non_ppc_people, ppc_people=ppc_people) 

@app.route('/init', methods=['GET', 'POST'])
def init(name=None):
    global non_ppc_people 
    global ppc_people
    return jsonify(ppc_people = ppc_people, non_ppc_people = non_ppc_people) 

@app.route('/move_to_ppc', methods=['GET', 'POST'])
def move_to_ppc(name=None):
    global non_ppc_people 
    global ppc_people
    json_data = request.get_json()   
    ppc_people.append(json_data["name"])
    non_ppc_people.remove(json_data["name"])
    return jsonify(ppc_people = ppc_people, non_ppc_people = non_ppc_people) 

@app.route('/move_to_non_ppc', methods=['GET', 'POST'])
def move_to_non_ppc(name=None):
    global non_ppc_people 
    global ppc_people
    json_data = request.get_json()   
    non_ppc_people.append(json_data["name"])
    ppc_people.remove(json_data["name"])
    return jsonify(ppc_people = ppc_people, non_ppc_people = non_ppc_people)

if __name__ == '__main__':
   app.run(debug = True)