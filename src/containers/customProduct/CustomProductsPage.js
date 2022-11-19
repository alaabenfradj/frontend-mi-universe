import "./styles.css";
import CustomGuitar from "./CustomProductContainer";
import CustomPianoContainer from "./CustomPianoContainer";
import ViolinContainer from "./ViolinContainer";
import CustomElectrique from "./CustomElectrique";
import CustomDrums from "./CustomDrums";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import { useState } from "react";
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
const CustomProductsPage = () => {
  const FILTERS = [
    { name: "Guitar" },
    { name: "Piano" },
    { name: "Guitar Electrique" },
    { name: "Violin" },
    { name: "Drums" },
  ];
  const [selected, set] = useState(1)
  return (
    <div>
      <div className="flex justify-center">
      <Dropdown
            className="mr-5 mt-10"
            color="indigo"
            placement="bottom-start"
            buttonText="Instrument"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            ripple="light"
        >
            <DropdownItem 
            color="indigo" ripple="light"
            onClick={() => set(1)}
            >
                Guitar
            </DropdownItem>
            <DropdownItem color="indigo" ripple="light"
            onClick={() => set(2)}>
                Guitar Electrique
            </DropdownItem>
            <DropdownItem color="indigo" ripple="light"
            onClick={() => set(3)}>
                Piano
            </DropdownItem>
            <DropdownItem color="indigo" ripple="light"
            onClick={() => set(4)}>
                Drums
            </DropdownItem>
            <DropdownItem color="indigo" ripple="light"
            onClick={() => set(5)}>
                Violine
            </DropdownItem>
            
        </Dropdown>
      </div>
      {selected===1 ? <CustomGuitar></CustomGuitar> : ""} 
      {selected===2 ?<CustomElectrique></CustomElectrique> : ""}
      {selected===3 ?<CustomPianoContainer></CustomPianoContainer> : ""}
      {selected===4 ?<CustomDrums></CustomDrums> : ""}
      {selected===5 ?<ViolinContainer></ViolinContainer> : ""}
    </div>
  );
};
export default CustomProductsPage;
