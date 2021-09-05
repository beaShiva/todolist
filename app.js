//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-shiva:Shiva123@cluster0.r6fug.mongodb.net/todolistDB");
const itemSchema = {
  name: String
};
const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({
 name:" buy food"
});
const item2 = new Item({
  name:"cook food"
 });
 const item3 = new Item({
  name:"eat food"
 });
 
 const defaultItem = [item1,item2,item3];
 


app.get("/", function(req, res) {
  Item.find({},function(err,foundItems){
    if(foundItems === 0){
      Item.insertMany(defaultItem,function(err){
        if(err){
          console.log(err);
        }else{
          console.log("successs");
        }
      });
      res.redirect("/");
    }else{
   
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    
    }
  });

 
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const item = new Item({
  name : itemName
});

item.save();
res.redirect("/");
});

app.post("/delete",function(req,res){
  const checkName =  req.body.checkbox;

  Item.findByIdAndRemove(checkName,function(err){
    if(!err){
      console.log("succefully delted");
      res.redirect("/");
    }
  });

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
