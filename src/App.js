import React, { Component } from 'react';
import './App.css';
import 'tachyons';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  onListenClick() {
    fetch('http://localhost:3002/api/speech-to-text/token')
      .then(function(response) {
          return response.text();
      }).then((token) => {
        console.log('token is', token)
        var stream = recognizeMic({
            token: token,
            objectMode: true, // send objects instead of text
            extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
            format: false // optional - performs basic formatting on the results such as capitals an periods
        });
        stream.on('data', (data) => {
          this.setState({
            text: data.alternatives[0].transcript
          })
        });
        stream.on('error', function(err) {
            console.log(err);
        });
        document.querySelector('#stop').onclick = stream.stop.bind(stream);
      }).catch(function(error) {
          console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <h1 className="App-title f1">Speech Recognition</h1>
        </header> */}
        <section className="App-content">
          <p>App content goes here</p>
          <button onClick={this.onListenClick.bind(this)}>Listen to microphone</button>
          <div style={{fontSize: '40px'}}>{this.state.text}</div>
        </section>
      </div>
    );
  }
}

export default App;
