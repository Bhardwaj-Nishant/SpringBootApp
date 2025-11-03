package com.project.sb.weatherApp.Controller;

import com.project.sb.weatherApp.Dto.Forecast;
import com.project.sb.weatherApp.Dto.WeatherForecast;
import com.project.sb.weatherApp.Dto.WeatherResponse;
import com.project.sb.weatherApp.Service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/weather")
@CrossOrigin
public class controller {

    @Autowired
    private WeatherService service;

    @GetMapping("/{city}")
    public WeatherResponse getWeather(@PathVariable String city){
        return service.getData(city);
    }

    @GetMapping("/{city}/{days}")
    public WeatherForecast getForecast(@PathVariable String city, @PathVariable int days) {
        return service.getForecastData(city, days);
    }

}
