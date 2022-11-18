import React from "react";

export default class App extends React.Component {
  //Classes have constructors anyway
  constructor(props) {
    super(props);

    //Initialize State
    this.state = {
      list: ["ready", "set", "GO"],
      text: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();
    this.setState({
      list: [...this.state.list, this.state.text]
    })
  }

  render() {
    return (
      <div>
        <h1 >Hello World</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.text}
            onChange={(event)=>{
              this.setState({text: event.target.value})
            }}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {this.state.list.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}
