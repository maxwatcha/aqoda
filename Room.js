export default class Room {
  constructor(nameRoom,floor) {
    this.nameRoom = nameRoom;
    this.available = true;
    this.guestName = "";
    this.age = -1;
    this.keycard = -1;
    this.floor = floor;
  }

  booking(guestName, age, keycard) {
    this.guestName = guestName;
    this.age = age;
    this.available = false;
    this.keycard = keycard;
    return {
      nameRoom: this.nameRoom,
      available: this.available,
      guessName: this.guestName,
      age: this.age,
      keycard: this.keycard,
    };
  }

  checkAvailable(){
    return {nameRoom:this.nameRoom,available:this.available}
  }

  checkOut(){
    this.available = true;
    this.guestName = "";
    this.age = -1;
    this.keycard = -1;
    return;
  }
}
