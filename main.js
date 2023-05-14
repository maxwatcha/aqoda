import fs from "fs";
import Hotel from "./Hotel.js";
class Command {
  constructor(name, params) {
    this.name = name;
    this.params = params;
  }
}

function main() {
  const filename = "input.txt";
  const commands = getCommandsFromFileName(filename);
  let hotel;
  commands.forEach((command) => {
    switch (command.name) {
      case "create_hotel":
        let [floor, roomPerFloor] = command.params;
        hotel = new Hotel(floor, roomPerFloor);
        console.log(
          `Hotel created with ${floor} floor(s), ${roomPerFloor} room(s) per floor.`
        );
        return;
      case "book":
        let [roomName, guessName, age] = command.params;
        if (hotel.checkAvailable(roomName) == true) {
          let booking = hotel.bookRoom(roomName, guessName, age);
          console.log(
            `Room ${roomName} is booked by ${guessName} with keycard number ${booking.keycard}.`
          );
        } else {
          const bookingGuess = hotel.getBooking(roomName);
          console.log(
            `Cannot book room ${roomName} for ${guessName}, The room is currently booked by ${bookingGuess}.`
          );
        }
        return;
      case "book_by_floor":
        let [floorBooking, guessNameSelected, ageSelected] = command.params;
        let bookByFloor = hotel.bookingByFloor(floorBooking,guessNameSelected,ageSelected);
        if(bookByFloor == false){
          console.log(`Cannot book floor ${floorBooking} for ${guessNameSelected}.`)
        } else{
          let roomsList = [];
          let keycards = [];
          bookByFloor.forEach(room => {
            roomsList.push(room.nameRoom);
            keycards.push(room.keycard);
          })
          console.log(`Room ${roomsList.join(", ")} are booked with keycard number ${keycards.join(", ")}`);
        }

        return;
      case "list_available_rooms":
        let availableRooms = hotel.checkAvailables();
        console.log(availableRooms.join(" "));
        return;
      case "list_guest":
        let listGuest = hotel.listGuess();
        console.log(listGuest.join(","));
        return;
      case "list_guest_by_age":
        let [action, currentAge] = command.params;
        let listGuestByAge = hotel.listGuessByAge(currentAge, action);
        console.log(listGuestByAge.join(","));
        return;
      case "list_guest_by_floor":
        let [floorSelected] = command.params;
        let listGuestByFloor = hotel.listGuessByFloor(floorSelected);
        console.log(listGuestByFloor.join(","));
        return;
      case "get_guest_in_room":
        let [room] = command.params;
        let guessInRoom = hotel.getBooking(room);
        console.log(guessInRoom);
        return;
      case "checkout_guest_by_floor":
        let [floorCheckout] = command.params;
        let roomListCheckOut = hotel.checkOutByFloor(floorCheckout);
        console.log(`Room ${roomListCheckOut.join(", ")} are checkout.`);
        return;
      case "checkout":
        let [keycard, guess] = command.params;
        let isCheckout = hotel.checkOut(guess, keycard);
        if (isCheckout.guestName == guess) {
          console.log(`Room ${isCheckout.nameRoom} is checkout.`);
        } else {
          console.log(
            `Only ${isCheckout.guestName} can checkout with keycard number ${isCheckout.keycard}.`
          );
        }
        return;
      default:
        return;
    }
  });
}

function getCommandsFromFileName(fileName) {
  const file = fs.readFileSync(fileName, "utf-8");

  return file
    .split("\n")
    .map((line) => line.split(" "))
    .map(
      ([commandName, ...params]) =>
        new Command(
          commandName,
          params.map((param) => {
            const parsedParam = parseInt(param, 10);

            return Number.isNaN(parsedParam) ? param : parsedParam;
          })
        )
    );
}

main();
