import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpenResource } from "app/slices/modalSlice";
import Addchapter from "./Addchapter";
import AddResource from "./AddResource";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0px",
    transform: "translate(-50%, -50%)",
  },
};
function ResourceMoadal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.CoursemodalSlice.isOpenResource);
  Modal.setAppElement("#root");
  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={() => dispatch(setIsOpenResource(false))}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
      <AddResource />
    </Modal>
  );
}

export default ResourceMoadal;
