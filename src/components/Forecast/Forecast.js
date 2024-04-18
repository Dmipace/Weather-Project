import React from 'react'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion"
import "./Forecast.css"

//2
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {

  //3   
  const dayInAWeek = new Date().getDay(); //ziskanie datumu  a z toho den
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));    //a tu priradenie toho dna pre dany real time den

  ////1 acordion je component reactu
  return (
    <>
      <label className='title'>Daily</label>
      <Accordion allowZeroExpanded>
        {
          data.list.splice(0, 7).map((item, idx) => (         // toto 0,7 znamenaju dni pondelok,utorok....//toto -    <AccordionItemButton> //tu sa budu staviať normalne veci pre udaje pre každy den v tyždni 
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className='daily-item'>
                    <img src={`icons/${item.weather[0].icon}.png`} alt="wheater" className='icon-small' />
                    <label className='day'>{forecastDays[idx]}</label>       {/*4 //vypíše to daný deň */}
                    <label className='description'>{item.weather[0].description}</label>{/* 4 //vypíše to info o počasí pre dany den */}
                    <label className="min-max">{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Pressure:</label>
                    <label>{item.main.pressure}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity:</label>
                    <label>{item.main.humidity}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Clouds:</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Wind speed:</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Sea level:</label>
                    <label>{item.main.sea_level}m</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Feels like:</label>
                    <label>{item.main.feels_like}°C</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
     
      </Accordion>

    </>
  )
}


export default Forecast

























