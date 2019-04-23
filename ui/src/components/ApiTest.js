import React, { Component } from 'react';

let delay = () => {
  let input = "Joanna Smith";
  return new Promise(
    (resolve, reject) => setTimeout(() => reject(input), 1500)
  );
};

let restCall = () => {
  let url = 'https://randomuser.me/api?results=1&nat=ca,us&inc=name,location';
  return fetch(url).then(data => {
    return data.json();
  }).then(data => {
    let name = data.results[0].name;
    let loc = data.results[0].location;
    return { name: name.first + ' ' + name.last, loc: loc.city + ', ' + loc.state };
  });
};

let ApiTestContainer = class ApiTestContainer extends Component {
  constructor() {
    super();
    // Initialize in the constructor
    this.reload();
  } // -----------  End of Constructor  ---------------

  reload() {
    this.state = {error: '', name: 'Unknown', loc: 'Unknown'};
    restCall().then(
      (result) => {
        this.setState({ name: result.name, loc: result.loc, error: 'Success!' });
      },
      (reject) => this.setState({ name: '', loc: '', error: 'Failed!' })
    )
  }

  render() {
    return (
      <div>
        <div>Welcome {this.state.name} from {this.state.loc}&#160;
          <button onClick={this.reload.bind(this)} className="btn btn-primary btn-raised"><span className="fa fa-refresh"></span>&#160;Reload</button>
        </div>
        <div>{this.state.error}</div>
      </div>
    );
  }
}

export default ApiTestContainer;