import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";

//add Config folder to src one and pull in env like in the server
//make sure to install env

class Energiser extends Component {
  constructor(props) {
    super(props);
    this.state = { energisers: [], current: 0 };
  }

  //ComponentDidMount
  //fetch.then res.json.then payload => setState = energisers:payload.energisers
  //make a fn called randomise where the state is updated to be a random number
  render() {
    return <Paper />;
  }
}
export default Energiser;
