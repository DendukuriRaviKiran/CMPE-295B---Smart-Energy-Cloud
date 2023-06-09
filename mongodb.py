from flask import Flask, jsonify, make_response, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://GreenCloud:Yq3Ut0mzDnblmq89@cluster0.hbsioov.mongodb.net/?retryWrites=true&w=majority")
db = client["smartgrid"]
batteries_collection = db["batteries"]
solar_collection = db["solar"]
admin_credentials_collection = db["admin_credentials"]
dashboard_details = db["dashboard"]

@app.route("/batteries/Option1", methods=["GET"])
def get_batteries():
    batteries = list(batteries_collection.find({}))
    for battery in batteries:
        battery["_id"] = str(battery["_id"])
    return make_response(jsonify(batteries))

@app.route("/solar/Option1", methods=["GET"])
def get_solar():
    batteries = list(solar_collection.find({}))
    for battery in batteries:
        battery["_id"] = str(battery["id"])
    return make_response(jsonify(batteries))

@app.route("/battery/Option1/<battery_id>", methods=["DELETE"])
def delete_battery(battery_id):
    batteries = list(batteries_collection.find({}))
    for battery in batteries:
        if str(battery["id"]) == str(battery_id):
            batteries_collection.delete_one({"id": battery["id"]})
            return make_response(f"Battery with id {battery_id} deleted", 200)
    return make_response(f"Battery with id {battery_id} not found", 404)

@app.route("/solar/Option1/<solar_id>", methods=["DELETE"])
def delete_solar(solar_id):
    solar_entries = list(solar_collection.find({}))
    for solar in solar_entries:
        if str(solar["id"]) == str(solar_id):
            solar_collection.delete_one({"id": solar["id"]})
            return make_response(f"Solar entry with ID {solar_id} deleted", 200)
    return make_response(f"Solar entry with ID {solar_id} not found", 404)

@app.route("/Option1/batterycreate", methods=["POST"])
def create_battery():
    name = request.json.get("name")
    id = request.json.get("id")
    value = request.json.get("value")
    obj = request.json.get("obj")
    city = request.json.get("city")
    if not name or not id or not value:
        return make_response("Missing required fields", 400)

    battery = {"name": name, "id": id, "value": value, "obj": obj, "city": city}
    result = batteries_collection.insert_one(battery)

    return make_response(f"Battery created with ID {result.inserted_id}", 201)

@app.route("/Option1/solarcreate", methods=["POST"])
def create_solar():
    name = request.json.get("name")
    id = request.json.get("id")
    value = request.json.get("value")
    obj = request.json.get("obj")
    city = request.json.get("city")
    if not name or not id or not value:
        return make_response("Missing required fields", 400)

    battery = {"name": name, "id": id, "value": value, "obj": obj, "city": city}
    result = solar_collection.insert_one(battery)

    return make_response(f"Solar created with ID {result.inserted_id}", 201)

@app.route("/admin_credentials", methods=["GET"])
def get_admin_credentials():
    admin_credentials = list(admin_credentials_collection.find({}))
    for credential in admin_credentials:
        credential["_id"] = str(credential["_id"])
        return make_response(str(credential["email"]))
    
@app.route("/dashboard", methods=["GET"])
def get_dashboard_details():
    dashboard = list(dashboard_details.find({}))
    for credential in dashboard:
        credential["_id"] = str(credential["_id"])
        return make_response(jsonify(credential))

@app.route("/battery/Option1/<battery_id>", methods=["PUT"])
def update_battery(battery_id):
    update_fields = {}
    name = request.json.get("name")
    id = request.json.get("id")
    value = request.json.get("value")
    obj = request.json.get("obj")
    city = request.json.get("city")
    
    if name:
        update_fields['name'] = name
    if id:
        update_fields['id'] = id
    if value:
        update_fields['value'] = value
    if obj:
        update_fields['obj'] = obj
    if city:
        update_fields['city'] = city

    if not update_fields:
        return make_response("No valid fields provided for update", 400)

    battery = batteries_collection.find_one({"id": str(battery_id)})
    if battery:
        batteries_collection.update_one({"id": str(battery_id)}, {"$set": update_fields})
        return make_response(f"Battery with id {battery_id} updated", 200)
    
    return make_response(f"Battery with id {battery_id} not found", 404)

@app.route("/solar/Option1/<solar_id>", methods=["PUT"])
def update_solar(solar_id):
    update_fields = {}
    name = request.json.get("name")
    id = request.json.get("id")
    value = request.json.get("value")
    obj = request.json.get("obj")
    city = request.json.get("city")
    
    if name:
        update_fields['name'] = name
    if id:
        update_fields['id'] = id
    if value:
        update_fields['value'] = value
    if obj:
        update_fields['obj'] = obj
    if city:
        update_fields['city'] = city

    if not update_fields:
        return make_response("No valid fields provided for update", 400)

    solar = solar_collection.find_one({"id": str(solar_id)})
    if solar:
        solar_collection.update_one({"id": str(solar_id)}, {"$set": update_fields})
        return make_response(f"Solar entry with ID {solar_id} updated", 200)
    
    return make_response(f"Solar entry with ID {solar_id} not found", 404)



if __name__ == "__main__":
    app.run(debug=True)
