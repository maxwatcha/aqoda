import Room from "./Room.js";

export default class Hotel {
  constructor(floor, roomPerFloor) {
    this.floor = floor;
    this.roomPerFloor = roomPerFloor;
    this.rooms = [];
    this.keycard = 0;
    for (let i = 1; i <= floor; i++) {
      for (let j = 1; j <= roomPerFloor; j++) {
        let nameRoom = String(i * 100 + j);
        this.rooms.push(new Room(nameRoom,i));
      }
    }
  }
  checkAvailables(){
    const roomsAvailable = []
    for (const room of this.rooms) {
      if(room.available == true){
        roomsAvailable.push(room.nameRoom)
      }
    }
    return roomsAvailable;
    }
  checkAvailable(roomName) {
    for (const room of this.rooms) {
      if (room.nameRoom == roomName) {
        return room.available;
      }
    }
    return;
  }

  getBooking(roomName) {
    for (const room of this.rooms) {
      if (room.nameRoom == roomName) {
        return room.guestName;
      }
    }
  }

  bookRoom(roomName, guessName, age) {
    for (const room of this.rooms) {
      if (room.nameRoom == roomName) {
        this.keycard += 1;
        return room.booking(guessName, age, this.keycard);
      }
    }

    return "not found room";
  }
  bookingByFloor(floor, guessName, age){
    let roomBookingList = [];
    for (const room of this.rooms) {
      if(room.floor == floor){
        if(room.available){
          roomBookingList.push(room.nameRoom);
        } else {
          return false
        }
      }
    }
    let res = [];
    if(roomBookingList.length > 0){
      roomBookingList.forEach(room => {
        res.push(this.bookRoom(room,guessName,age));
      });
      return res;
    } else {
      return false;
    }
  }
  checkOutByFloor(floor){
    let roomCheckoutList = []
    for (const room of this.rooms) {
      if(room.floor == floor&& room.available == false){
        roomCheckoutList.push(room.nameRoom);
        room.checkOut();
      }
    }
    return roomCheckoutList;
  }
  checkOut(guestName,keycard){
    for (const room of this.rooms) {
      if(room.keycard == keycard){
        if(room.guestName == guestName){
          let res = {nameRoom:room.nameRoom,guestName:room.guestName,keycard:room.keycard};
          room.checkOut()
          return res;
        } else {
          let res = {nameRoom:room.nameRoom,guestName:room.guestName,keycard:room.keycard};
          return res;
        }

      }
    }
    return false;
  }
  listGuess(){
    let guessNames = [];
    for (const room of this.rooms){
      if(!guessNames.includes(room.guestName) && room.guestName!=""){
        guessNames.push(room.guestName);
      }
    }
    return guessNames;
  }
  listGuessByFloor(floor){
    let guessNames = [];
    for (const room of this.rooms){
      if(!guessNames.includes(room.guestName) && room.floor == floor&& room.guestName!=""){
        guessNames.push(room.guestName);
      }
    }
    return guessNames;
  }

  listGuessByAge(age,action){
    let guessNames = [];
    if(action=='>'){
      for (const room of this.rooms){
        if(!guessNames.includes(room.guestName) && room.age>age){
          guessNames.push(room.guestName);
        }
      }
    } else if(action=='<'){
      for (const room of this.rooms){
        if(!guessNames.includes(room.guestName) && room.age<age && room.age>0){
          guessNames.push(room.guestName);
        }
      }
    } else {
      for (const room of this.rooms){
        if(!guessNames.includes(room.guestName) && room.age==age){
          guessNames.push(room.guestName);
        }
      }
    }
    return guessNames;
  }
}
