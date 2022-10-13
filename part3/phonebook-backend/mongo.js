const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://Joonas:${password}@cluster0.5eucrh5.mongodb.net/PhoneBook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: name,
  number: number,
});

mongoose.connect(url).then((result) => {
  if (name !== undefined && number !== undefined) {
    person.save().then((result) => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    });
  } else {
    Person.find({}).then((result) => {
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(person.name + " " + person.number);
      });
      mongoose.connection.close();
    });
  }
});
