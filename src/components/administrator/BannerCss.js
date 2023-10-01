import { makeStyles } from "@mui/styles";

export const useStyle = makeStyles({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#dfe6e9",
    height: "100vh",
    
  },

  box: {
    padding: 10,
    margin: "1%",
    background: "#fff",
    width: 800,
    borderRadius: 10,
  },

  dropzone: {
    height: 150,
  },

  heading: {
    fontWeight: "bolder",
    fontSize: 22,
    fontFamily: "Poppins",
    letterSpacing: 1,
    padding: 10,
  },
  rowStyle: {
    flexDirection: "row",
    display: "flex",
  },
  rowStyle2: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
  },
});
