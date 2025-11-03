package com.project.sb.weatherApp.Dto;

import java.util.ArrayList;

public class Forecast {
    private ArrayList<Forecastday> forecastday;

    // getters and setters
    public ArrayList<Forecastday> getForecastday() {
        return forecastday;
    }

    public void setForecastday(ArrayList<Forecastday> forecastday) {
        this.forecastday = forecastday;
    }
}
