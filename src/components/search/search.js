import React, { useState } from 'react'
import {AsyncPaginate} from "react-select-async-paginate"
import { GEO_API_URL,geoApiOptions } from '../../api'

//1
const Search = ({onSearchChange}) => {

    //3
    const [search, setSearch] = useState(null);


  //6 - hodnota, ktorú zadávame do poľa
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };


    //5 -- tu drží tu zmenu, ktorá je v asyncpaginate
    const handleOnChange = (searchData) =>{
        setSearch(searchData);
        onSearchChange(searchData);
    }

    //2 -- tu sa nacházda to políčko pre zadanie miesta
    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}  
            onChange={handleOnChange}//4
            loadOptions={loadOptions}//6
        />
    )
}

export default Search





























