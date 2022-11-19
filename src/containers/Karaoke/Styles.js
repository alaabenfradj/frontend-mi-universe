import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
export const VideoUseStyles = makeStyles((theme) => ({
  video: {
    border: "2px solid gray",
    padding: "1rem",
    margin: "1rem",
    borderRadius: "10px",
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    display: "flex",
    position: "relative",
    justifyContent: "center",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
  },
}));

export const SideBarUseStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px auto",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
  },
}));

// export const  { VideoUseStyles, SideBarUseStyles };
