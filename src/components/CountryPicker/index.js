import React from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import './style.css';


const CountryPicker = (props) => {

    const {
        covidSummary,
        country,
        days,
        handleCountryChange,
        daysHandler,
    } = props;

    return (
        <div className="container countrySelector">
        <FormControl className="formControl">

            <NativeSelect value={country} onChange={(e) => handleCountryChange(e.target.value)}>
            <option>Select Country</option>
                {
                    covidSummary.Countries && covidSummary.Countries.map(country =>
                        <option key={country.Slug} value={country.Slug}>{country.Country}</option>
                    )
                }
            </NativeSelect>

        </FormControl>

        <FormControl className="formControl">

            
            <NativeSelect value={days} onChange={(e) => daysHandler(e.target.value)}>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
            </NativeSelect>
        

        </FormControl>

        </div>
    )
}

export default CountryPicker;