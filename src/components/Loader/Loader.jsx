import { PacmanLoader, BeatLoader, ClimbingBoxLoader } from "react-spinners";

const override = {
  display: "flex",
  margin: "40vh auto",
  borderColor: "blue",
  justifyContent: "center",
  alignItems: "center",
};

function Loader({ loading }) {
  return (
    <BeatLoader
      color="#366CBD"
      margin="8px"
      cssOverride={override}
      loading={true}
    />
  );
}

export default Loader;
