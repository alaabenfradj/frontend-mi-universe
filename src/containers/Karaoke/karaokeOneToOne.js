import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { VideoUseStyles, SideBarUseStyles } from "./Styles";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import { useSelector } from "react-redux";
const socket = io("http://localhost:5050/");
const KaraokeOneToOne = () => {
  const userConnected = useSelector((state) => state.user.currentUser);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [idToCall, setIdToCall] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const VidClasses = VideoUseStyles();
  const SBClasses = SideBarUseStyles();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo
          ? (myVideo.current.srcObject = currentStream)
          : (myVideo.current.srcObject = null);
      })
      .catch((err) => console.log(err));
    if (userConnected !== null) setName(userConnected.email);
    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
      //   console.log(data);
    });

    peer.on("stream", (currentStream) => {
      if (userVideo) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo) userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    socket.emit("end-call");
    connectionRef.current.destroy();

    window.location.reload();
  };
  return (
    <>
      <Container className={SBClasses.container}>
        {stream && (
          <Paper elevation={10} className={SBClasses.paper}>
            <form className={SBClasses.root} noValidate autoComplete="off">
              <Grid container className={SBClasses.gridContainer}>
                <Grid item xs={12} md={6} className={SBClasses.padding}>
                  {console.log(me + "---------------")}
                  <Typography gutterBottom variant="h6">
                    Account Info
                  </Typography>
                  <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                  <CopyToClipboard text={me} className={SBClasses.margin}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<Assignment fontSize="large" />}
                    >
                      Copy Your ID
                    </Button>
                  </CopyToClipboard>
                </Grid>
                <Grid item xs={12} md={6} className={SBClasses.padding}>
                  <Typography gutterBottom variant="h6">
                    Make a call
                  </Typography>
                  <TextField
                    label="ID to call"
                    value={idToCall}
                    onChange={(e) => setIdToCall(e.target.value)}
                    fullWidth
                  />
                  {callAccepted && !callEnded ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<PhoneDisabled fontSize="large" />}
                      fullWidth
                      onClick={leaveCall}
                      className={SBClasses.margin}
                    >
                      Hang Up
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Phone fontSize="large" />}
                      fullWidth
                      onClick={() => callUser(idToCall)}
                      className={SBClasses.margin}
                    >
                      Call
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </Paper>
        )}
        <>
          {call.isReceivingCall && !callAccepted && (
            <>
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">📞</strong>{" "}
                {call.name.length > 0 ? (
                  <span className="block sm:inline">
                    {call.name} is calling you ...
                  </span>
                ) : (
                  <span className="block sm:inline">Incoming Call ...</span>
                )}
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </>
          )}
        </>
      </Container>

      <Grid container className={VidClasses.gridContainer}>
        {stream && (
          <Grid>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={VidClasses.video}
            />
          </Grid>
        )}
        {callAccepted && !callEnded && (
          <Grid>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={VidClasses.video}
            />
          </Grid>
        )}
      </Grid>
      <></>
    </>
  );
};

export default KaraokeOneToOne;
