import {H, Level} from "react-accessible-headings";

export default function Heading({children}) {
  return (
    <Level>
      <H>{children}</H>
    </Level>
  );
}
