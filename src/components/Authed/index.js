import React, { Component } from "react";
// import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import css from "./Authed.module.css";

const url = process.env.REACT_APP_API_URL;
console.log(url);

class Authed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: Boolean(localStorage.getItem("token")),
      email: "",
      password: "",
      secret: "",
      isLoading: false
    };
  }

  onChange = event => {
    const { value, name } = event.target;
    this.setState(() => ({
      [name]: value
    }));
  };

  login = async event => {
    this.setState(() => ({ isLoading: true }));
    event.preventDefault();
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    });
    const { token, message } = await response.json();
    //   .then(res =>
    //     res.json().then(({ token, message }) => {
    if (token) {
      localStorage.setItem("token", token);
      this.setState(() => ({
        secret: "",
        isLoggedIn: true,
        isLoading: false
      }));
    }
    console.log(message);
    // this.setState(() => ({ email: "", password: "" }));
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState(() => ({ secret: "", isLoggedIn: false }));
  };

  showSecret = async () => {
    const token = localStorage.getItem("token");
    this.setState(() => ({ isLoading: true }));
    const response = await fetch(`${url}/private?token=${token}`);
    const { message } = await response.json();
    this.setState(() => ({ secret: message, isLoading: false }));
  };

  render() {
    return (
      <Paper className={css.container}>
        {this.state.isLoading
          ? "Loading..."
          : this.state.isLoggedIn
          ? "Welcome Home"
          : "Please Log In"}
        {!this.state.isLoggedIn ? (
          <form onSubmit={this.login}>
            <TextField
              onChange={this.onChange}
              value={this.state.email}
              variant="filled"
              name="email"
              type="email"
              placeholder="email"
            />
            <TextField
              onChange={this.onChange}
              value={this.state.password}
              variant="filled"
              name="password"
              type="password"
              placeholder="password"
            />
            <Button
              className={css.button1}
              variant="contained"
              size="small"
              type="submit"
            >
              Log In
            </Button>
          </form>
        ) : (
          <div>
            {this.state.secret || (
              <Button
                className={css.button2}
                variant="contained"
                size="small"
                onClick={this.showSecret}
              >
                Reveal Message
              </Button>
            )}
            <br />
            <Button
              className={css.button3}
              variant="contained"
              size="small"
              onClick={this.logout}
            >
              Log Out
            </Button>
          </div>
        )}
      </Paper>
    );
  }
}
export default Authed;
