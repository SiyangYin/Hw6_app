from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

current_id = 3
sales = [
 {
 "id": 1,
 "salesperson": "James D. Halpert",
 "client": "Shake Shack",
 "reams": 1000
 },
 {
 "id": 2,
 "salesperson": "Stanley Hudson",
 "client": "Toast",
 "reams": 4000
 },
 {
 "id": 3,
 "salesperson": "Michael G. Scott",
 "client": "Computer Science Department",
 "reams": 10000
 },
]

clients = [
 "Shake Shack",
 "Toast",
 "Computer Science Department",
 "Teacher's College",
 "Starbucks",
 "Subsconsious",
 "Flat Top",
 "Joe's Coffee",
 "Max Caffe",
 "Nussbaum & Wu",
 "Taco Bell",
];

salespersons = [
"James D. Halpert",
"Stanley Hudson",
"Michael G. Scott"
]

@app.route('/')
def index(name=None):
    return render_template('cu-paper-infinity.html', sales=sales, clients=clients, current_id=current_id, salespersons=salespersons)  

@app.route('/init', methods=['GET', 'POST'])
def init():
    global sales 
    global clients 
    global current_id
    global salespersons
    return jsonify(sales = sales, clients = clients, current_id = current_id, salespersons = salespersons)   

@app.route('/save_sale', methods=['GET', 'POST'])
def save_sale():
    global sales 
    global clients 
    global current_id
    
    json_data = request.get_json()
#     print(json_data)
    if json_data:
        current_id += 1
        new_id = current_id 
        new_sale_entry = {
            "id":  current_id,
            "salesperson": json_data["salesperson"],
            "client": json_data["client"],
            "reams": json_data["reams"]        
        }
        sales.append(new_sale_entry)
        if json_data["client"] not in clients:
            clients.append(json_data["client"])
    return jsonify(sales = sales, clients = clients, current_id = current_id, salespersons = salespersons)    
    
@app.route('/delete_sale', methods=['GET', 'POST'])
def delete_sale():
    global sales 
    global current_id
    
    json_data = request.get_json()
#     print(json_data)
    if json_data <= current_id :
        del sales[json_data]
        current_id -= 1
    return jsonify(sales = sales, current_id = current_id, salespersons = salespersons)

if __name__ == '__main__':
   app.run(debug = True)
