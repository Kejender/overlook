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
    <div id="pyora" onClick={props.onClick} ontouchstart="" style="-webkit-transform: rotate(45deg);">
       <div id="pyora1"></div><div id="pyora2"></div>
       <div id="pyora3"></div><div id="pyora4"></div>
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
    asteet: 45,
    uuni: null,
    palkit: null,
    mittari: null,
    vari_ind: 1,
    firecolors: [
      ["black","red"],
      ["yellow","red"],
      ["orange","yellow"],
      ],
    };
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

  renderUuni(i) {
    return (
      <div id="uuni">
        <div id="harvelit">
          {this.renderPyora(1)}
          {this.renderMittari(2)}
          <p id="chat"></p>
        </div>
        {this.renderRitila(2)}
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
  let asteet = this.state.asteet;
  let paine = this.state.paine;
  let hiili = this.state.hiili;
  let mittari = this.state.mittari;
  let uuni = this.state.uuni;

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
    
    if (paine < 10) {
      paine = paine + 1;
      console.log("paine: "+paine);
    }
    else {
      console.log("liikaa");
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
  this.setState({ paine });
  this.setState({ asteet });
  this.setState({ lampo });

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

componentDidMount() {
  let palkit = this.state.palkit;
  let mittari = this.state.mittari;
  let uuni = this.state.uuni;
  palkit = document.getElementsByClassName('palkki');
  mittari = document.getElementById('mittari');
  uuni = document.getElementById('uuni');
  this.setState({ palkit });
  this.setState({ mittari });
  this.setState({ uuni });
  this.intervalId1 = setInterval(this.tuli.bind(this), 300);
  this.intervalId2 = setInterval(this.palo.bind(this), 10000);
  
  var mediaQueryPort = window.matchMedia("(orientation: portrait)");
  var mediaQueryLand = window.matchMedia("(orientation: landscape)");
  var mediaQueryHeight = window.matchMedia('(min-height: 500px)');

  if (mediaQueryPort.matches){
    console.log("PORT "+window.screen.width+" "+window.screen.height);
    uuni.style.width  = '300px';
  }

  if (mediaQueryLand.matches && window.screen.width > 599 && window.screen.height < 599){
    console.log("SMALLLANDSCAPE "+window.screen.width+" "+window.screen.height);
    uuni.style.width  = '600px';
  }

  if (mediaQueryLand.matches && window.screen.width > 599 && window.screen.height > 599){
    console.log("BIGLANDSCAPE "+window.screen.width+" "+window.screen.height);
    uuni.style.width  = '300px';
  }


  const handleOrientationChangeLand = (mediaQueryLand) => {

    if (mediaQueryLand.matches && window.screen.width > 599 && window.screen.height < 599){
      console.log("LANDLAND "+window.screen.width+" "+window.screen.height);
      uuni.style.width  = '600px';
    }
    console.log("MQL"+mediaQueryPort);
  }

  
const handleOrientationChange = (mediaQueryPort) => {

  console.log("MQL"+mediaQueryPort);

  if (mediaQueryPort.matches) {
    console.log("PORT");
    uuni.style.width = '300px';
  }
  else
  if (window.screen.width > 599 && window.screen.height < 599) {
    console.log("LAND");
    uuni.style.width = '600px';
  }
}

const handleHeight = (mediaQueryHeight) => {

  if (mediaQueryHeight.matches){
    uuni.style.width = '300px';
    console.log("MQLHEIGHT");
  }
  else {
    uuni.style.width = '600px';
  }
  
}

mediaQueryPort.addListener(handleOrientationChange);
mediaQueryLand.addListener(handleOrientationChangeLand);
mediaQueryHeight.addListener(handleHeight);

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