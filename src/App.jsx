import { useState } from "react";
import ComboWrapper from "./ComboWrapper";

const people = [
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
];

const otherPeople = ["Stephen", "Kerry", "Lena"];

export default function App() {
  const [selectedPerson, setPerson] = useState(people[0]);
  const [selectedOtherPerson, setOtherPerson] = useState(otherPeople[0]);
  return (
    <div className="flex flex-col justify-center align-center items-center min-h-screen">
      <ComboWrapper list={people} value={selectedPerson} onChange={setPerson} />
      <ComboWrapper
        list={otherPeople}
        value={selectedOtherPerson}
        onChange={setOtherPerson}
      />
    </div>
  );
}
