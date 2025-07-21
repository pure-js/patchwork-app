function sayHello() {  
    console.log(this.name);
}
const person = {  name: 'John',  sayHello: sayHello};
person.sayHello(); 
