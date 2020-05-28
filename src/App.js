import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {cities} from './components/cities'
import "./App.css"
import AwesomeComponent from './Spinner'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import spinner from 'react-spinkit';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


export default class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      location:"",
      temperature:"",
      isLoading: true,
      
    }
  }
  
  getCurrentWeather = async (lon, lat) => {

    let apiKey = process.env.REACT_APP_APIKEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    let data = await fetch(url)
    let result = await data.json()
    console.log('result ? ', result);
    
    this.setState(
      { 
        isLoading: false,
        location: result.name,
        country: result.sys.country,
        temperature: result.main.temp,
        description: result.weather[0].description,
      }
        )

  }
  getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getCurrentWeather(post.coords.longitude, post.coords.latitude)
    })
  }


  componentDidMount() {
    console.log("open your app already")
    setTimeout(()=>this.getLocation(), 3000);
    
  }
  Cities() {
    return cities.map(city => {
      return (
        <button
          key={city.lat}
          variation="primary"
          className="city btn-primary"
          onClick={() => this.getCurrentWeather(city.lon, city.lat)}
        >
          {city.name}
        </button>
      );
    });
  }
 

  render() {
    const {
      location,
      temperature,
      description,
      country
    } = this.state
    if (this.state.isLoading == true) {
      return <AwesomeComponent/>
    }
    else{return (
      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather App
            </h1>
            <h2 className="col-12">{location} , {country}</h2>
            <h3 className="col-12 text-danger">{temperature}°C</h3>
            <h3 className="col-12">{description}</h3>
            {/* <button className="btn btn-primary">Primary</button> */}
            <div >{this.Cities()}</div>

          </div>
        </div>
      </div>
      
    )}
  }
}
