import {db} from "./firebase";
import {ref as dRef, push, child, update} from "firebase/database";

export async function writeData(values, dbTarget, ...props) {
  const postKey =
    props.postKey && props.postKey !== "none"
      ? props.postKey
      : push(child(dRef(db), `${dbTarget[0]}`)).key;
  const postData = {...values};
  const updates = {};
  dbTarget.map((location) => (updates[`/${location}/` + postKey] = postData));
  try {
    await update(dRef(db), updates);
    alert("Data saved successfully!" + console.table(values));
  } catch (error) {
    alert("The write failed...");
  }
}
