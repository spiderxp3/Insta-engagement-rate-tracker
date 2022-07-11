import "./App.css";
import React from "react";
// import NavBar from "./Cards/NavBar";
import { FetchData } from "./Instagram.js";

// import Charts from "./Routes/Charts";
// import Content from "./Routes/Content";
// import Download from "./Routes/Download";
// import Diagnoses from "./Routes/Diagnoses";
// import Analogize from "./Routes/Analogize";
// import Fingerprint from "./Routes/Fingerprint";

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.usernametextInput = React.createRef();
  }

  handleClick(event) {
    this.setState({ InAppisLoading: true });
    FetchData(String(this.usernametextInput.current.value)).then((x) => {
      this.setState({ InAppisLoading: false, Result: x });
    });
  }


  handleRequest = async function (request) {
    console.log("here")
    const url = new URL(request.url);
    let image_url = url.searchParams.get("image_url");

    if (!image_url)
      return new Response("Error. No image_url URL param detected", {
        status: 500,
      });

    // Rewrite request to point to API url. This also makes the request mutable
    // so we can add the correct Origin header to make the API server think
    // that this request isn't cross-site.
    request = new Request(image_url, request);
    request.headers.set("Origin", new URL(image_url).origin);
    let response = await fetch(request);

    // Recreate the response so we can modify the headers
    response = new Response(response.body, response);

    // Set CORS headers
    response.headers.set("Cross-Origin-Resource-Policy", "cross-origin");

    // Append to/Add Vary header so browser will cache response correctly
    response.headers.append("Vary", "Origin");

    return response;
  };

  componentDidMount() {
    window.addEventListener("fetch", async (event) => {
      event.respondWith(this.handleRequest(event.request));
    });

    FetchData("microsoft").then((x) => {
      this.setState({ isLoading: false, Result: x }, function () {});
    });


  }


  render() {
    if (this.state.isLoading) {
      // if (true) {
      // if (false) {
      return (
        <div
          style={{ backgroundColor: "#e3e3e3" }}
          className="h-100 container-fluid text-center align-content-center"
        >
          <br />
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <br />
          {/* <h1 className="text-left">Loading</h1> */}
          <img
            className="img-fluid mx-auto align-self-center col-md-5"
            alt="loading"
            src="./loading.png"
          />
        </div>
      );
    }
    return (


      // <div className="col-12 col-sm-12 col-md-11 mx-auto">
      <div
        className="container"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(64,93,230,1) 23%, rgba(88,81,219,1) 29%, rgba(131,58,180,1) 35%, rgba(193,53,132,1) 41%, rgba(225,48,108,1) 47%, rgba(253,29,29,1) 53%, rgba(245,96,64,1) 59%, rgba(247,119,55,1) 65%, rgba(252,175,69,1) 71%, rgba(255,220,128,1) 77%, rgba(255,255,255,1) 100%)",
          backgroundSize: "100% 40px",
          backgroundRepeat: "no-repeat",
        }}
      >
      <iframe src="https://www.instagram.com/" width="420px" height="1024" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>

        {/* <NavBar /> */}
        <nav
          style={{ zIndex: 2000 }}
          className="p-3 scrolling-navbar fixed-top navbar-style text-center"
        >
          <ul className="nav justify-content-center text-center Righteous">
            <li className="nav-item">
              <a
                className="nav-link"
                style={{ color: "#545b62" }}
                href="https://github.com/ashalogic"
              >
                About
              </a>
            </li>
            <span
              className="h3 Lobster text-center"
              style={{ color: "#E1306C" }}
            >
            Insta-engagement rate
            </span>
            <li className="nav-item">
              <a
                alt="source"
                className="nav-link"
                style={{ color: "#545b62" }}
                href=""
              >
                Source
              </a>
            </li>
          </ul>
          <div className="input-group col-md-6 mx-auto">
            <div className="input-group-prepend">
              <span
                className="input-group-text border-0"
                style={{
                  backgroundColor: "unset",
                  color: "#000",
                }}
              >
                <i className="fas fa-at"></i>
              </span>
            </div>
            <input
              // name="username"
              type="text"
              // value={this.state.username}
              className="form-control"
              placeholder="Username"
              // onChange={this.handleInputChange}
              style={{
                backgroundColor: "transparent",
                borderColor: "#000",
                color: "#000",
                border: "none",
                borderRadius: "0",
                borderBottom: "#000 solid 1px",
              }}
              ref={this.usernametextInput}
            />
            <div className="input-group-append">
              <button
                onClick={this.handleClick}
                className="btn btn-outline-dark"
                type="button"
              >
                <span
                  style={{
                    display: this.state.InAppisLoading ? "" : "none",
                  }}
                  className="spinner-border spinner-border-sm mr-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Fetch
              </button>
            </div>
          </div>
        </nav>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Router>
          <div>
            <div
              id="notificationmsg"
              style={{ display: "none" }}
              class="alert alert-info text-center"
              role="alert"
            >
              New Update available! Reload the webapp to see the latest juicy
              changes.
            </div>
            <div className="row nav-scroller">
              <div className="col-md-12 mx-auto">
                <ul className="nav nav-tabs nav-fill nav-igs-pills rounded border-0 Righteous">
                  <li className="nav-item">
                    <NavLink exact className="igs-nav-link" to="/">
                      <i className="fas fa-fingerprint"></i>
                      <br />
                      Bio
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="igs-nav-link" to="/content">
                      <i className="fas fa-hashtag"></i>
                      <br />
                      Content
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="igs-nav-link" to="/charts">
                      <i className="fas fa-chart-pie"></i>
                      <br />
                      Analysis
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="igs-nav-link" to="/diagnoses">
                      <i className="fas fa-diagnoses"></i>
                      <br />
                      Diagnoses
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="igs-nav-link" to="/analogize">
                      <i className="fas fa-not-equal"></i>
                      <br />
                      Analyze
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 mx-auto text-center align-self-center mt-2">

                <img className="w-25"src="https://www.citypng.com/public/uploads/preview/-51608567124pc1rh9q9pw.png"  />

              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}
