import React, {useEffect, useState} from 'react';
import './App.css'
import { Cards, Chart, CountryPicker} from './components';
import { Container, Box } from '@material-ui/core';
import covidImg from './images/heading.jpg';
import axios from './axios';

function App() {

  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [loading, setLoading] = useState(false);
  const [covidSummary, setCovidSummary] = useState({});
  const [days, setDays] = useState(7);
  const [country, setCountry] = useState('');
  const [confirmedCountAr, setConfirmedCountAr] = useState([]);
  const [deathsCountAr, setDeathsCountAr] = useState([]);
  const [recoveredCountAr, setRecoveredCountAr] = useState([]);
  const [label, setLabel] = useState([]);

  useEffect(() => {

    setLoading(true);
    axios.get('/summary')
    .then(res => {
      setLoading(false);
      
      if(res.status === 200){
        setTotalConfirmed(res.data.Global.TotalConfirmed);
        setTotalRecovered(res.data.Global.TotalRecovered);
        setTotalDeaths(res.data.Global.TotalDeaths);
        setCovidSummary(res.data);
      }
    })
    .catch(error => {
      console.log(error);
    })

  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth()+1}`.slice(-2);
    const _date = d.getDate();

    return `${year}-${month}-${_date}`;
  }

  const handleCountryChange = (country) => {
    setCountry(country);

    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - days));

    getCoronaReportByDateRange(country, from, to);
  }

  const daysHandler = (day) => {
    setDays(day);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - day));

    getCoronaReportByDateRange(country, from, to);
  }

  //Confirmed Graph
  const getCoronaReportByDateRange = (countrySlug, from, to) => {
    axios.get(`/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
    .then(res => {
      
      const yAxisConfirmedCount = res.data.map(d => d.Cases);
      const xAxisLabel = res.data.map(d => d.Date)

      const covidDetails = covidSummary.Countries.find(country => country.Slug === countrySlug);

      setTotalConfirmed(covidDetails.TotalConfirmed);
      setTotalRecovered(covidDetails.TotalRecovered);
      setTotalDeaths(covidDetails.TotalDeaths);
      setLabel(xAxisLabel);

      setConfirmedCountAr(yAxisConfirmedCount);
    })
    .catch(error => {console.error(error)})

  //Deaths Graph
    axios.get(`/country/${countrySlug}/status/deaths?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
    .then(res => {
      const yAxisDeathsCount = res.data.map(d => d.Cases);
      setDeathsCountAr(yAxisDeathsCount);
    })
    .catch(error => {console.log(error)})

  //Recovered Graph
    axios.get(`/country/${countrySlug}/status/recovered?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
    .then(res => {
      const yAxisRecoveredCount = res.data.map(d => d.Cases);
      console.log(yAxisRecoveredCount);
      setRecoveredCountAr(yAxisRecoveredCount);
    })
    .catch(error => {console.log(error)})

        axios.get(`/country/${countrySlug}/status/newcases?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
    .then(res => {
      const yAxisNewcasesCount = res.data.map(d => d.Cases);
      console.log(yAxisNewcasesCount);
    })
    .catch(error => {console.log(error)})


  }

  if(loading){
    return <p>Fetching data...</p>
  }
    
    return(
      <div className='container'>
        <img className='image' src={covidImg}/>
        <Cards 
          totalConfirmed={totalConfirmed}
          totalRecovered={totalRecovered}  
          totalDeaths={totalDeaths}
          country={country}
        />
        <CountryPicker 
          covidSummary={covidSummary}
          days={days}
          country={country}
          handleCountryChange={handleCountryChange}
          daysHandler={daysHandler}
        />
        <Chart 
          yAxisConfirmed={confirmedCountAr}
          label={label}
          yAxisDeaths={deathsCountAr}
          yAxisRecovered={recoveredCountAr}
        />
      </div>
    )
}

export default App;