import './App.css';
import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

class Drumpad extends React.Component {
  constructor(props){
    super(props);

    this.play = this.play.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {this.play_key(e)});
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', (e) => {this.play_key(e)});
  }

  play(key) {
    let box_animate = () => {
      document.getElementById(key.id).classList.add("key-clicked");
      document.getElementById(key.id).classList.remove("key-clicked-after");
      setTimeout(function() {
        document.getElementById(key.id).classList.remove("key-clicked");
        document.getElementById(key.id).classList.add("key-clicked-after");
      }, 0);
    }

    box_animate();
    this.props.current_clip(key.id);
    var sound = document.getElementById(key.keyTrigger);
    sound.play();
    sound.currentTime=0;
  }

  handleHover(id) {
    document.getElementById(id).classList.remove("key-clicked-after");
  }

  play_key(e) {

    /*for (let i=0; i<bankOne.length; i++){
      if (e.keyCode === bankOne[i].keyCode){
        this.play(bankOne[i].url);
      }
    }*/

    switch(e.keyCode){
      case (bankOne[0].keyCode): 
        this.play(bankOne[0]);
        break;
      case (bankOne[1].keyCode): 
        this.play(bankOne[1]);
        break;
      case (bankOne[2].keyCode): 
        this.play(bankOne[2]);
        break;
      case (bankOne[3].keyCode): 
        this.play(bankOne[3]);
        break;
      case (bankOne[4].keyCode): 
        this.play(bankOne[4]);
        break;
      case (bankOne[5].keyCode): 
        this.play(bankOne[5]);
        break;
      case (bankOne[6].keyCode): 
        this.play(bankOne[6]);
        break;
      case (bankOne[7].keyCode): 
        this.play(bankOne[7]);
        break;
      case (bankOne[8].keyCode): 
        this.play(bankOne[8]);
        break;
      default: break;
    }
  }

  render() {
    let Eachkey = bankOne.map((key, index) => {
      return(
        <div id={key.id} key={key.id} className="drum-pad" onClick={() => this.play(bankOne[index])} onMouseEnter={() => {this.handleHover(key.id)}}>
          <a>{key.keyTrigger}</a>
          <audio id={key.keyTrigger} className="clip" src={key.url}></audio>
        </div>
      ) 
    });

    return(
      <div id="drum-pad-container">
        {Eachkey}
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      clip: "",
    }

    this.current_clip = this.current_clip.bind(this);
  }

  current_clip(text) {
    let text_animate = () => {
      document.getElementById("display_text").classList.remove("fadein");

      setTimeout(function() {
        document.getElementById("display_text").classList.add("fadein");
      }, 200);
    }

    text_animate();

    this.setState({
      clip: text
    })
  }

  render () {
    const {clip} = this.state;

    return (
      <div id="drum-machine">
        <Drumpad current_clip={(text) => {this.current_clip(text)}}/>
        <div id="display">
          <a id="display_text" className="text">{clip}</a>
        </div>
      </div>
    );
  }
}

export default App;