let myObj = {}; // object
let myArr = []; // array (or list)
let myValue = "some value";

myArr.push(5);
myArr.push("some string");
// myArr = [5, "some string"];

myObj.myKey = myValue;
myObj['myKey'] = myValue;
myObj[".this has a space or starts with a number"] = myValue;

myObj = {
  name: "Elly Post",
  age: 31,
  profession: "savior of hyrule"
};

console.log(myObj.name); // Elly post
let userResponse = "age";
myObj[userResponse]; // 31

console.log(myObj.name.toUpperCase().charAt(3).toLowerCase()); //y
let upperStr = myObj.name.toUpperCase(); // ELLY POST
let char3 = upperStr.charAt(3); // Y
let lowerChar3 = char3.toLowerCase(); // y

