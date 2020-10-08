import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Lämpömittari
const Mittari = (props) => {
  return (
    <div id="wrap">
      <div id="mittari-wrap">
        <div id="tausta1"></div>
      </div>
      <div id="mittari-wrap-2">
        <div id="nuppi"></div>
      </div>
      <div id="mittari">
	      <div id="viisari1"></div>
	      <div id="viisari2"></div>
	      <div id="viisari3"></div>
	      <div id="viisari4"></div>
	    </div>
    </div>
  );
}

// Paineventtiili
const Pyora = (props) => {
  return (
    <div id="pyora" onClick={props.onClick}>
       <div id="pyora1"></div><div id="pyora2"></div>
       <div id="pyora3"></div><div id="pyora4"></div>
    </div>
  );
}

const Rajahdysrivi = (props) => {
  return (
    <div className="rajahdysrivi">
        <div className="rajahdyspalkki"></div>
        <div className="rajahdyspalkki"></div>
        <div className="rajahdyspalkki"></div>
        <div className="rajahdyspalkki"></div>
        <div className="rajahdyspalkki"></div>
        <div className="rajahdyspalkki"></div>
        <div className="rajahdyspalkki"></div>
        <div className="rajahdyspalkki"></div>
    </div>
  );
}

const Resetoi = (props) => {
  return (
    <div id="restart" onClick={props.onClick}>
        <div className="rajahdyspalkki"></div>
        <div className="rajahdyspalkki"></div>
        <div className="rajahdyspalkki"><h1>G</h1></div>
        <div className="rajahdyspalkki"><h1>A</h1></div>
        <div className="rajahdyspalkki"><h1>M</h1></div>
        <div className="rajahdyspalkki"><h1>E</h1></div>
        <div className="rajahdyspalkki"></div>
        <div className="rajahdyspalkki"></div>
        <div className="rajahdyspalkki"></div>
        <div className="rajahdyspalkki"></div>
        <div className="rajahdyspalkki"><h1>O</h1></div>
        <div className="rajahdyspalkki"><h1>V</h1></div>
        <div className="rajahdyspalkki"><h1>E</h1></div>
        <div className="rajahdyspalkki"><h1>R</h1></div>
        <div className="rajahdyspalkki"></div>
        <div className="rajahdyspalkki"></div>
    </div>
  );
}


// Uunin ritilä
const Ritila = (props) => {
  return (
    <div id="ritila" onClick={props.onClick}>
      <div className="palkki palkki2"></div>
	    <div className="palkki palkki2"></div>
	    <div className="palkki palkki2"></div>
	    <div className="palkki palkki2"></div>
	    <div className="palkki palkki3"></div>
	    <div className="palkki palkki3"></div>
	    <div className="palkki palkki3"></div>
	    <div className="palkki palkki3"></div>
    </div>
  );
}

class Uuni extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    orientation: null,
    paine: 4,
    lampo: 4,
    hiili: 4,
    kierros: 0,
    kriittinen: 0,
    asteet: 45,
    uuni: null,
    palkit: null,
    rajahdyspalkit: null,
    chat: false,
    message1: "...",
    message2: "Hi...",
    saa: [],
    saa_nyt: ["Now here in Boulder, Colorado there is..."],
    saa_myoh: ["Later there will be..."],
    saa_huom: ["Tomorrow it will be..."],
    saa_ind: 0,
    mittari: null,
    vari_ind: 1,
    firecolors: [
      ["black","red"],
      ["yellow","red"],
      ["orange","yellow"],
      ],
    };
  }

async getWeather(){

  let saa = this.state.saa;
  let saa_nyt = this.state.saa_nyt;

  const getWeatherFromApi = async (geodata) => {

    const appId = process.env.APPID || 'a3ab4029f49f1344f0cbb6ed38c7c742';
    const mapURI = process.env.MAP_ENDPOINT || "https://api.openweathermap.org/data/2.5";
    //const targetCity = process.env.TARGET_CITY || "Helsinki,fi";

    try {
      const endpoint = `${mapURI}/weather?q=Boulder,us&appid=${appId}&`;
      //const response = await fetch(`${baseURL}/weather?lat=${geodata.lat}&lon=${geodata.lon}`);
      const response = await fetch(endpoint);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  
    return {};
  };

  const weather = await getWeatherFromApi();
  console.log("w "+weather.weather[0].description);
  saa_nyt.push(weather.weather[0].description);
  saa.push(saa_nyt);
  this.setState( {saa} );

}

//"lon":-105.35,"lat":40.08}

async getForecast(){

  let saa = this.state.saa;
  let saa_myoh = this.state.saa_myoh;
  let saa_huom = this.state.saa_huom;

  const getForecastFromApi = async (geodata) => {

    const appId = process.env.APPID || 'a3ab4029f49f1344f0cbb6ed38c7c742';
    const mapURI = process.env.MAP_ENDPOINT || "https://api.openweathermap.org/data/2.5";

    try {
      const endpoint = `${mapURI}/forecast?q=Boulder,us&appid=${appId}&`;
      //const response = await fetch(`${baseURL}/weather?lat=${geodata.lat}&lon=${geodata.lon}`);
      const response = await fetch(endpoint);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  
    return {};
  };

  const weather = await getForecastFromApi();
  console.log("w "+weather.list[0].weather[0].description);
  console.log("w "+weather.list[24].weather[0].description);

  saa_myoh.push(weather.list[0].weather[0].description);
  saa_huom.push(weather.list[24].weather[0].description);

  saa.push(saa_myoh);
  saa.push(saa_huom);

  this.setState( {saa} );

}

  // Läsää hiiltä, click-event ritilälle
  lisaa(){
    let hiili = this.state.hiili;
    let asteet = this.state.asteet;
    let mittari = this.state.mittari;
    console.log("lisaa");
    if (hiili < 10){
      hiili = hiili + 1;
      asteet = asteet + 10;
      mittari.style.transform = 'rotate('+asteet+'deg)';
      this.setState({ hiili });
      this.setState({ asteet });
    }
  }

  vahenna(){
    let paine = this.state.paine;
    console.log("vahenna");
    if (paine > 0){
        paine = paine - 1;
        this.setState({ paine });
        console.log("paine "+paine);
    }  
  }

  puhe2(event){
      event.stopPropagation();
      console.log("puhe");
  }



  puhe_reset(){
    
    let chat = this.state.chat;
    let saa_ind = this.state.saa_ind;
  
    saa_ind = 0;
    chat = false;
    this.setState({saa_ind});
    this.setState({chat});

  }


  puhe(){
    
    let chat = this.state.chat;
    let message1 = this.state.message1;
    let message2 = this.state.message2;
    let saa = this.state.saa;
    let saa_ind = this.state.saa_ind;

    if (chat) {

      if (saa_ind < saa.length) {
        console.log(saa_ind);

        let temp_msg = saa[saa_ind];
        console.log(temp_msg);

        message1 = temp_msg[0];
        message2 = temp_msg[1];

        /*message1 = saa[saa_ind][0];
        message2 = saa[saa_ind][1];*/

        saa_ind = saa_ind +1;

      }
      else{
        message1 = "yeah";
      }


      console.log(saa);

      chat = false;
      //message1 = "yeah";
      this.setState({ message1 });
      this.setState({ message2 });
    }
    else {
      chat = true;
    }
    this.setState({ chat });
    this.setState({ saa_ind });

  }

  resetoi(){
    let rajahdys = this.state.rajahdys;
    let paine = this.state.paine;
    let lampo = this.state.lampo;
    let hiili = this.state.hiili;
    let kierros = this.state.kierros;
    let asteet = this.state.asteet;
    let kriittinen = this.state.kriittinen;

    console.log("resetoi");
    rajahdys.style.visibility  = 'hidden';
    clearInterval(this.intervalId3);

    paine = 4
    lampo = 4
    hiili = 4
    kierros = 0
    kriittinen = 0
    asteet = 45

    this.setState({ paine });
    this.setState({ lampo });
    this.setState({ hiili });
    this.setState({ kierros });
    this.setState({ kriittinen });
    this.setState({ asteet }); 
  }

  renderPyora(i) {
    return (
      <Pyora
      onClick={() => this.vahenna()}
      />
    );
  }

  renderMittari(i) {
    return (
      <Mittari
      />
    );
  }

  renderRitila() {
    return (
      <Ritila
      onClick={() => this.lisaa()}
      />
    );
  }

  renderRestart(i) {
    return (
      <Resetoi
      onClick={() => this.resetoi()}
      />
    );
  }

  renderRajahdysrivi(i) {
    return (
      <Rajahdysrivi/>
    );
  }

  renderUuni(i) {
    return (
      <div>
      <div id="uuni" className={`${this.state.kriittinen > 0? 'kriittinen': 'sopiva'}`}>
        <div id="harvelit" onClick={() => this.puhe_reset()}>
          {this.renderPyora(1)}
          {this.renderMittari(2)}
          <p id="chat1" className={`${this.state.chat? 'pois': 'paalla'}`}>{this.state.message1}</p>
          <p id="chat2" className={`${this.state.chat? 'paalla': 'pois'}`}>{this.state.message2}</p>
        </div>
        {this.renderRitila(2)}
      </div>
      <div id="rajahdys">
      {this.renderRajahdysrivi(3)}
      {this.renderRajahdysrivi(3)}
      {this.renderRajahdysrivi(3)}
      {this.renderRajahdysrivi(3)}
      {this.renderRestart(3)}
      {this.renderRajahdysrivi(3)}
      {this.renderRajahdysrivi(3)}
      {this.renderRajahdysrivi(3)}
      {this.renderRajahdysrivi(3)}
      
      </div>
      </div>
    );
  }

  handleClick(i) {
    const lampo = this.state.lampo;
    console.log("joo "+lampo);
  }

palo(){
  let lampo = this.state.lampo;
  let kierros = this.state.kierros;
  let kriittinen = this.state.kriittinen;
  let asteet = this.state.asteet;
  let paine = this.state.paine;
  let hiili = this.state.hiili;
  let mittari = this.state.mittari;
  let uuni = this.state.uuni;
  let rajahdys = this.state.rajahdys;

  //console.log(window.screen.orientation);

  kierros = kierros+1;
  this.setState({ kierros });
  console.log("kierros "+kierros);
    
  if (hiili > 3) {
    lampo = lampo +1;
    asteet = asteet + 10;
    mittari.style.transform = 'rotate('+asteet+'deg)'; 
    
    if (hiili > 6){
      lampo = lampo + 1
      asteet = asteet + 10;
      mittari.style.transform = 'rotate('+asteet+'deg)';

    }
    console.log("lampo: "+lampo);
  }
  else {
    if(lampo > 0){
      lampo = lampo -1;
      paine = paine -1;
      asteet = asteet - 10;
      mittari.style.transform = 'rotate('+asteet+'deg)'; 
      console.log("LP: "+lampo +" "+paine);
    }
  }
    
  if (lampo > 5){
    
    if (paine < 8) {
      paine = paine + 1;
      console.log("paine: "+paine);
      if (kriittinen > 0) {
        kriittinen = kriittinen - 1;
      }
    }
    else {
      console.log("liikaa");
      kriittinen = kriittinen + 1;
      console.log("krii "+kriittinen)

    }
    uuni.style.backgroundColor  = 'red';
  }
  else{
    uuni.style.backgroundColor  = 'grey';
  }
  
  if (hiili > 0) {
    hiili = hiili - 1;
    console.log("hiili: "+hiili);
  }
    
  this.setState({ hiili });
  this.setState({ kriittinen });
  this.setState({ paine });
  this.setState({ asteet });
  this.setState({ lampo });

  if (kriittinen > 4) {
    console.log("pam");
    this.intervalId3 = setInterval(this.rajahdys.bind(this), 150);
    rajahdys.style.visibility  = 'visible';
  }

} //palo

tuli(){
  const lampo = this.state.lampo;
  const firecolors = this.state.firecolors;
  let vari_ind = this.state.vari_ind;
  let palkit = this.state.palkit;
  let mittari = this.state.mittari;
  let asteet = this.state.asteet;
  //console.log("tuli "+ lampo+" "+firecolors);
  
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))
 
  if(lampo < 3){
    vari_ind = 0;
  }

  if(lampo > 2 && lampo < 7){
    vari_ind = 1;
  }
  if(lampo > 6){
    vari_ind = 2;
  }

asteet = asteet+vari_ind*getRandomInt(4);
mittari.style.transform = 'rotate('+asteet+'deg)';

[...palkit].forEach((palkki) => {
  palkki.style.backgroundColor = firecolors[vari_ind][getRandomInt(2)];
});

} // tuli

rajahdys(){
  const firecolors = this.state.firecolors;
  let vari_ind = this.state.vari_ind;
  let rajahdyspalkit = this.state.rajahdyspalkit;
  
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))
  vari_ind = 1;

[...rajahdyspalkit].forEach((palkki) => {
  palkki.style.backgroundColor = firecolors[vari_ind][getRandomInt(2)];
});

} // rajahdys

componentDidMount() {
  let palkit = this.state.palkit;
  let rajahdyspalkit = this.state.rajahdyspalkit;
  let rajahdys = this.state.rajahdys;
  let mittari = this.state.mittari;
  let uuni = this.state.uuni;
  palkit = document.getElementsByClassName('palkki');
  rajahdys = document.getElementById('rajahdys');
  rajahdyspalkit = document.getElementsByClassName('rajahdyspalkki');
  mittari = document.getElementById('mittari');
  uuni = document.getElementById('uuni');
  this.setState({ palkit });
  this.setState({ rajahdyspalkit });
  this.setState({ rajahdys });
  this.setState({ mittari });
  this.setState({ uuni });
  this.intervalId1 = setInterval(this.tuli.bind(this), 300);
  this.intervalId2 = setInterval(this.palo.bind(this), 10000);
  //this.intervalId3 = setInterval(this.rajahdys.bind(this), 150);
  this.chatInterval = setInterval(this.puhe.bind(this), 8000);
  
  var mediaQueryPort = window.matchMedia("(orientation: portrait)");
  var mediaQueryLand = window.matchMedia("(orientation: landscape)");
  var mediaQueryHeight = window.matchMedia('(min-height: 500px)');

  if (mediaQueryPort.matches){
    console.log("PORT "+window.screen.width+" "+window.screen.height);
    uuni.style.width  = '300px';
    rajahdys.style.width  = '340px';
  }

  if (mediaQueryLand.matches && window.screen.width > 599 && window.screen.height < 599){
    console.log("SMALLLANDSCAPE "+window.screen.width+" "+window.screen.height);
    uuni.style.width  = '600px';
  }

  if (mediaQueryLand.matches && window.screen.width > 599 && window.screen.height > 599){
    console.log("BIGLANDSCAPE "+window.screen.width+" "+window.screen.height);
    uuni.style.width  = '300px';
    rajahdys.style.width  = '340px';
  }

  const handleOrientationChangeLand = (mediaQueryLand) => {

    if (mediaQueryLand.matches && window.screen.width > 599 && window.screen.height < 599){
      console.log("LANDLAND "+window.screen.width+" "+window.screen.height);
      uuni.style.width  = '600px';
      rajahdys.style.width  = '600px';
    }
    console.log("MQL"+mediaQueryPort);
  }

  
const handleOrientationChange = (mediaQueryPort) => {

  console.log("MQL"+mediaQueryPort);

  if (mediaQueryPort.matches) {
    console.log("PORT");
    uuni.style.width = '300px';
    rajahdys.style.width = '340px';
  }
  else
  if (window.screen.width > 599 && window.screen.height < 599) {
    console.log("LAND");
    uuni.style.width = '600px';
    rajahdys.style.width = '600px';
  }
}

const handleHeight = (mediaQueryHeight) => {

  if (mediaQueryHeight.matches){
    uuni.style.width = '300px';
    rajahdys.style.width = '340px';
    console.log("MQLHEIGHT");
  }
  else {
    uuni.style.width = '600px';
    rajahdys.style.width = '600px';
  }
  
}

mediaQueryPort.addListener(handleOrientationChange);
mediaQueryLand.addListener(handleOrientationChangeLand);
mediaQueryHeight.addListener(handleHeight);

this.getWeather()
this.getForecast()

} // componentdidmount

  render() {
    return (
      <div>
        {this.renderUuni()}
      </div>
    );
  }

} // Uuni

ReactDOM.render(
  <Uuni />,
  document.getElementById('root')
);