import { useState } from "react";
import ComboWrapper from "./ComboWrapper";
import data from "./rooms.json";

const halls = Object.keys(data).sort();

export default function App() {
  const [selectedHall, setHall] = useState(halls[0]);
  const rooms = Object.keys(data[selectedHall]).sort();
  const [selectedRoom, setRoom] = useState(rooms[0]);
  if (!rooms.includes(selectedRoom)) {
    setRoom(rooms[0]);
  }
  console.log("ping");
  return (
    <div className="flex flex-col justify-center align-center items-center min-h-screen">
      <ComboWrapper list={halls} value={selectedHall} onChange={setHall} />
      <ComboWrapper list={rooms} value={selectedRoom} onChange={setRoom} />
      <p className="text-white">
        {selectedHall} {selectedRoom}
      </p>
    </div>
  );
}
