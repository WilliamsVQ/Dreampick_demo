db = connect("127.0.0.1:27017/admin");
db.auth("root", "example");

db = db.getSiblingDB('myapp');

db.roles.insert({ name: "Admin" });
db.roles.insert({ name: "Trainer" });
db.roles.insert({ name: "Candidate" });
let idAdmin = db.roles.findOne({name:"Admin"});
db.users.insert({userName: "Admin",email:"admin@admin.com",firstPassword:"admin123",roleId:idAdmin._id,phone:"26479924"});
