import React, { Component } from "react";

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
    const response = await fetch("http://localhost:5000/login", {
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
    const response = await fetch(
      `http://localhost:5000/private?token=${token}`
    );
    const { message } = await response.json();
    this.setState(() => ({ secret: message, isLoading: false }));
  };

  render() {
    return (
      <div>
        {this.state.isLoading
          ? "Loading..."
          : this.state.isLoggedIn
          ? "Welcome Home"
          : "Go away"}

        {!this.state.isLoggedIn ? (
          <form onSubmit={this.login}>
            <input
              onChange={this.onChange}
              value={this.state.email}
              name="email"
              type="email"
              placeholder="email"
            />
            <input
              onChange={this.onChange}
              value={this.state.password}
              name="password"
              type="password"
              placeholder="password"
            />
            <button type="submit">Log In</button>
          </form>
        ) : (
          <div>
            {this.state.secret || (
              <button onClick={this.showSecret}>Show Secret</button>
            )}
            <button onClick={this.logout}>Log Out</button>
          </div>
        )}
      </div>
    );
  }
}
export default Authed;
