import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = [];
        const humidities = [];
        const pressures = [];
        for (const weather of cityData.list) {
            const tempInK = weather.main.temp;
            const tempInF = _.round(((tempInK) * (9 / 5) - 459.67));
            temps.push(tempInF);
            humidities.push(weather.main.humidity);
            pressures.push(weather.main.pressure);
        }
        const {lon, lat} = cityData.city.coord;
        return (
            <tr key={name}>
                <td><GoogleMap lon={lon} lat={lat} /></td>
                <td><Chart data={temps} color="orange" units="F"/></td>
                <td><Chart data={pressures} color="green" units="hPA"/></td>
                <td><Chart data={humidities} color="black" units="%"/></td>
            </tr>
        );
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature (F)</th>
                    <th>Pressure (hPA)</th>
                    <th>Humidity (%)</th>
                </tr>
                </thead>
                <tbody>
                {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({weather}) {
    return {weather};
}

export default connect(mapStateToProps)(WeatherList);
