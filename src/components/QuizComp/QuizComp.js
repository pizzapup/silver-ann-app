import {useState} from "react";
const questions = [
  ["The first mountain we climed together", ""],
  ["Name of best man"],
];
const initialValues = {
  name: "",
  answers: [],
};
export default function QuizComp() {
  const [values, setValues] = useState(initialValues);
  return <></>;
}
