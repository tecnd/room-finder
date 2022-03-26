import { useState, useEffect } from "react";
import ComboWrapper from "./ComboWrapper";
import Calendar from "./Calendar";
import Hamburger from "./Hamburger";
import data from "./rooms.json";

const halls = Object.keys(data).sort();

export default function App() {
  const [selectedHall, setHall] = useState(halls[0]);
  useEffect(() => {
    let stored = window.localStorage.getItem("hall");
    if (stored != null && halls.includes(stored)) {
      setHall(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("hall", selectedHall);
  }, [selectedHall]);

  const rooms = Object.keys(data[selectedHall]).sort();
  const [selectedRoom, setRoom] = useState(rooms[0]);
  /* doesn't work sad sad
  useEffect(() => {
    let stored = window.localStorage.getItem("room");
    if (stored != null && rooms.includes(stored)) {
      setRoom(stored);
    } else {
      console.log(`${stored} is not a value in ${rooms}`);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("room", selectedRoom);
  }, [selectedRoom]);
  */
  if (!rooms.includes(selectedRoom)) {
    setRoom(rooms[0]);
  }
  const events = data[selectedHall][selectedRoom];
  return (
    <>
      <Hamburger>
        <p className="text-gray-900 pt-3">Hall</p>
        <ComboWrapper list={halls} value={selectedHall} onChange={setHall} />
        <p className="text-gray-900 pt-3">Room</p>
        <ComboWrapper list={rooms} value={selectedRoom} onChange={setRoom} />
      </Hamburger>
      <div className="flex flex-col justify-center align-center items-center min-h-screen">
        <h1 className="text-3xl py-3">
          {selectedHall} {selectedRoom}
        </h1>
        <Calendar events={events} />
      </div>
    </>
  );
}
