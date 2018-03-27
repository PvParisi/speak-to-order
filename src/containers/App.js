import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import './App.css';
import 'tachyons';
import Menu from '../components/Menu';
import Instructions from '../components/Instructions';
import Quantity from '../components/Quantity';
import GotIt from '../components/GotIt';
import {meals} from '../meals';
import {keywordsArray} from '../keywords';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

class App extends Component {
  constructor() {
    super()
    this.state = {
      meals: [],
      keywords: [],
      text: '',
      streamObj: null,
      found: false,
      foundIndex: -1,
      quantity: 0
    }
  }

  componentDidMount() {
    this.setState({meals});
    let keywords = meals.map(a => a.name);
    keywords = keywords.concat(keywordsArray);
    console.log(keywords);
    this.setState({ keywords });
    this.startListening();
  }

  componentDidUpdate() {
    const result = meals.map(val => val.name.toLowerCase());
    console.log(result);
    const resStr = this.state.text.toLowerCase().trim();
    console.log(resStr);

    if(resStr === 'start'){
      document.getElementsByClassName('App-content')[0].scrollIntoView({behavior: 'smooth'});
      return;
    }

    if(resStr === 'order') {
      this.placeOrder();
      return;
    }

    if(resStr === 'cancel') {
      // TODO questo porta in un loop infinito
      this.setState({ found: false, foundIndex: -1, quantity: 0 });
    }

    const resIndex = result.indexOf(resStr);
    if (resIndex >= 0 && !this.state.found) { // TODO CHECK serve la condizione !this.state.found?
      console.log('found in menu');
      this.setState({found: true, foundIndex: resIndex});
    }

    // console.log('not found in menu');
    
    if (this.state.found && this.state.quantity === 0) {
      // TODO
      const qty = parseInt(this.state.text, 10);
      if (qty === 0) {
        this.setState({found: false, foundIndex: -1});
        // return;
      }
      if (Number.isInteger(qty)) {
        console.log("qty is a number");
        this.setState({quantity: qty});
      }
    }
  }

  startListening() {
    fetch('https://speech-recognition-srv.herokuapp.com/api/speech-to-text/token')
      .then(function(response) {
          return response.text();
      }).then((token) => {
        console.log('token is', token)
        var stream = recognizeMic({
            token: token,
            objectMode: true, // send objects instead of text
            extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
            format: false, // optional - performs basic formatting on the results such as capitals an periods
            keywords: this.state.keywords,
            keywords_threshold: 0.6,
            smart_formatting: true
        });

        stream.on('data', (data) => {
          this.setState({
            text: data.alternatives[0].transcript,
            streamObj: stream
          });
        });

        stream.on('error', function(err) {
            console.log(err);
        });
      }).catch(function(error) {
          console.log(error);
      });
  }

  placeOrder() {
    if (this.state.streamObj != null) {
      this.state.streamObj.stop();
      this.setState({ streamObj: null });
    }
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <h1 className="App-title f1">Speech Recognition</h1>
        </header> */}
        <section className="App-content">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
            { !this.state.found && <Instructions /> }
            { this.state.found && (this.state.quantity <= 0 ) && <Quantity /> }
          </ReactCSSTransitionGroup>
          <Menu meals={meals} foundIndex={this.state.foundIndex} quantity={this.state.quantity} />
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
            { this.state.found && (this.state.quantity > 0) && <GotIt /> }
          </ReactCSSTransitionGroup>
          {/* <button className="float" onClick={this.onListenClick.bind(this)}><i className="fas fa-microphone" aria-hidden="true"></i></button> */}
          {/* <div style={{fontSize: '40px'}}>{this.state.text}</div> */}
        </section>
      </div>
    );
  }
}

export default App;
