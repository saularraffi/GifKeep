import { useState, useEffect } from "react";
import GifNotesView from "./components/GifNotesView";
import TopAppBar from "./components/TopAppBar";
import SideDrawer from "./components/SideDrawer";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import "./App.css";
import { getUser } from "./services/usersApi";

function App() {
    const [sharedPopupState, setSharedPopupState] = useState(null);
    const [sharedDrawerState, setSharedDrawerState] = useState(false);
    const [sharedCategoryState, setSharedCategoryState] = useState("");

    localStorage.setItem("userId", "64cd117697db1a3018d79eb7");

    useEffect(() => {
        getUser(localStorage.getItem("userId"))
            .then((res) => res.data)
            .then((user) => {
                localStorage.setItem("userId", user._id);
                localStorage.setItem("username", user.username);
                localStorage.setItem("categories", user.categories);
            })
            .catch((err) => {
                console.log(err);
                alert("Could not fetch user");
            });
    }, []);

    return (
        <>
            <video
                controls
                style={{ width: "1000px" }}
                src="http://localhost:8080/api/videos/stream"
            ></video>
            {/* <ThemeProvider theme={theme}>
        <TopAppBar
          setSharedPopupState={setSharedPopupState}
          openDrawer={setSharedDrawerState}
        />
        <SideDrawer
          open={sharedDrawerState}
          setOpen={setSharedDrawerState}
          setSharedCategoryState={setSharedCategoryState}
        />
        <GifNotesView
          sharedPopupState={sharedPopupState}
          setSharedPopupState={setSharedPopupState}
          sharedCategoryState={sharedCategoryState}
          sharedDrawerState={sharedDrawerState}
        />
      </ThemeProvider> */}
        </>
    );
}

export default App;
