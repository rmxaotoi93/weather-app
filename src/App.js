import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherResult: null
    }
  }
  getCurrentWeather = async (lon, lat) => {

    let apiKey = process.env.REACT_APP_APIKEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let data = await fetch(url)
    let result = await data.json()
    console.log('result ? ', result);
    this.setState({ weatherResult: result })

  }
  getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getCurrentWeather(post.coords.longitude, post.coords.latitude)
    })
  }


  componentDidMount() {
    console.log("open your app already")
    this.getLocation()
  }

  render() {
    if (this.state.weatherResult == null) {
      return (<div>Loading data</div>)
    }
    return (
      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather App
            </h1>
            <h2 className="col-12">{this.state.weatherResult.name}</h2>
            <h3 className="col-12 text-danger">{this.state.weatherResult.main.temp}</h3>
            <h3 className="col-12">{this.state.weatherResult.weather[0].description}</h3>
            <button type="button" class="btn btn-primary">Primary</button>
          </div>
        </div>
      </div>
      
    )
  }
}
