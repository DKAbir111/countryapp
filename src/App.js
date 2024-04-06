import React, { useState,useEffect } from 'react'
import './App.css'

import Countries from './Components/Countryapp/Countries'
import Search from './Components/Countryapp/Search'

const url="https://restcountries.com/v3.1/all"
const App = () => {

    const[isLoading,setIsLoading]=useState(true);
    const [error,setError]=useState(null);
    const [countries,setCountries]=useState([]);
    const [filterCountries,setFilerCountries]=useState(countries);

    const fetchData=async (url)=>{
        setIsLoading(true);

        try{
            const response = await fetch(url);
        const data = await response.json();
        setCountries(data);
        setFilerCountries(data);
        setIsLoading(false);
        setError(null);
        
        }catch(error){
            setIsLoading(false);
            setError(error);

        }
    }

    useEffect(()=>{
        fetchData(url);
       
    

    },[])

    const handleRemoveCountry=(name)=>{
      const filter= filterCountries.filter((country)=>
      country.name.common!==name);
      setFilerCountries(filter);


    }
    const handleSerach = (searchValue) => {
      let value = searchValue.toLowerCase();
      const newCountries = countries.filter((country) => {
        const countryName = country.name.common.toLowerCase();
        return countryName.startsWith(value);
      })
      setFilerCountries(newCountries);
    };
    

  return (
    <>
      <h1>Country App</h1>
      <Search onSearch={handleSerach}/>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error.message}</h2>}
      {countries && <Countries countries={filterCountries} onRemoveCountry={handleRemoveCountry}/>}
    </>
  )
}
export default App;
