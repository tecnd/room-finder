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

function filterList(query, list) {
  return query === ""
    ? list
    : list.filter((element) =>
        element
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      );
}
export default function App() {
  const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState("");
  const [otherSelected, setOtherSelected] = useState(otherPeople[0]);
  const [otherQuery, setOtherQuery] = useState("");

  return (
    <div className="flex flex-col justify-center align-center items-center min-h-screen">
      <ComboWrapper
        value={selected}
        onChange={setSelected}
        query={query}
        setQuery={setQuery}
        filter={filterList(query, people)}
      />
      <ComboWrapper
        value={otherSelected}
        onChange={setOtherSelected}
        query={otherQuery}
        setQuery={setOtherQuery}
        filter={filterList(otherQuery, otherPeople)}
      />
    </div>
  );
}
