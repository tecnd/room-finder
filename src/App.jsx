import { useState, useEffect } from "react";
import ComboWrapper from "./ComboWrapper";
import Calendar from "./Calendar";
import Hamburger from "./Hamburger";
import DarkMode from "./DarkMode";
import data from "./rooms.json";
import largeLogo from "./images/logo_with_line.png";
import smallLogo from "./images/single-line-wordmark.png";

const halls = Object.keys(data).sort();

const dayMap = new Map([
  [0, "U"],
  [1, "M"],
  [2, "T"],
  [3, "W"],
  [4, "R"],
  [5, "F"],
  [6, "S"],
]);

/**
 * Converts from a schedule (entry indicates busy) to availability (entry indicates free)
 * @param {string[]} schedule
 * @returns {string[]}
 */
function scheduleToAvail(schedule) {
  const times = [];
  for (const e of schedule) {
    times.push(e[0]);
  }
  var start = 0;
  const avails = [];
  for (const e of times) {
    let [first, second] = e.split("-");
    if (parseInt(first) >= parseInt(start)) {
      avails.push(start.toString().padStart(4, "0") + "-" + first);
    }
    start = second;
  }
  avails.push(start + "-" + "2400");
  return avails;
}
/**
 * Checks if there is an 1 hour free window from the given time in the given availability list
 * @param {string} time
 * @param {string[]} avails
 * @returns {boolean}
 */
function isAvailable(time, avails) {
  let numTime = parseInt(time);
  // No classes before 7 am or after 10 pm
  if (numTime <= 600 || numTime >= 2200) {
    return true;
  }
  for (const a of avails) {
    let [first, second] = a.split("-");
    if (numTime >= parseInt(first) && numTime + 100 <= parseInt(second)) {
      return true;
    }
  }
  return false;
}

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

  if (!rooms.includes(selectedRoom)) {
    setRoom(rooms[0]);
  }

  const events = data[selectedHall][selectedRoom];

  const now = new Date();
  const today = dayMap.get(now.getDay());
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const availableRooms = [];
  for (const room of rooms) {
    let schedule = data[selectedHall][room][today];
    if (schedule.length == 0) {
      availableRooms.push(room);
    } else {
      let avail = scheduleToAvail(schedule);
      if (isAvailable(`${hour}${minutes.toString().padStart(2, "0")}`, avail)) {
        availableRooms.push(room);
      }
    }
  }
  return (
    <>
      <Hamburger>
        <div className="text-gray-900">
          <p className="pt-3">Hall</p>
          <ComboWrapper list={halls} value={selectedHall} onChange={setHall} />
          <p className="pt-3">Room</p>
          <ComboWrapper list={rooms} value={selectedRoom} onChange={setRoom} />
          <p className="pt-3">Rooms available now for at least one hour:</p>
          <ul>
            {availableRooms.map((room, i) => (
              <li key={i}>{room}</li>
            ))}
          </ul>
        </div>
      </Hamburger>
      <DarkMode />
      <div className="flex flex-col justify-center align-center items-center min-h-screen">
        <div className="flex flex-col sm:flex-row items-center dark:bg-slate-200 rounded m-5 p-3 w-64 sm:w-auto">
          <img src={largeLogo} className="hidden sm:block mr-5" />
          <img src={smallLogo} className="sm:hidden mb-2" />
          <h1 className="text-3xl font-bold text-emerald-900 font-serif">
            OPEN ROOM LIST
          </h1>
        </div>
        <h2 className="text-2xl -mt-3 pb-3 font-bold">
          {selectedHall} {selectedRoom}
        </h2>
        <Calendar events={events} />
      </div>
    </>
  );
}
