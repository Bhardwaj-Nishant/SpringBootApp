package com.project.sb.weatherApp.Dto;

import java.util.List;

public class WeatherForecast {

    private String city;
    private String region;
    private String country;
    private double latitude;
    private double longitude;
    private String localTime;

    private double temperatureC;
    private double temperatureF;
    private String conditionText;
    private String conditionIcon;
    private double windKph;
    private int humidity;
    private int cloud;
    private double feelsLikeC;
    private double feelsLikeF;
    private double windChillC;
    private double windChillF;
    private double heatIndexC;
    private double heatIndexF;

    private List<Forecastday> forecastdays;

    public WeatherForecast() {}

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public String getLocalTime() { return localTime; }
    public void setLocalTime(String localTime) { this.localTime = localTime; }

    public double getTemperatureC() { return temperatureC; }
    public void setTemperatureC(double temperatureC) { this.temperatureC = temperatureC; }

    public double getTemperatureF() { return temperatureF; }
    public void setTemperatureF(double temperatureF) { this.temperatureF = temperatureF; }

    public String getConditionText() { return conditionText; }
    public void setConditionText(String conditionText) { this.conditionText = conditionText; }

    public String getConditionIcon() { return conditionIcon; }
    public void setConditionIcon(String conditionIcon) { this.conditionIcon = conditionIcon; }

    public double getWindKph() { return windKph; }
    public void setWindKph(double windKph) { this.windKph = windKph; }

    public int getHumidity() { return humidity; }
    public void setHumidity(int humidity) { this.humidity = humidity; }

    public int getCloud() { return cloud; }
    public void setCloud(int cloud) { this.cloud = cloud; }

    public double getFeelsLikeC() { return feelsLikeC; }
    public void setFeelsLikeC(double feelsLikeC) { this.feelsLikeC = feelsLikeC; }

    public double getFeelsLikeF() { return feelsLikeF; }
    public void setFeelsLikeF(double feelsLikeF) { this.feelsLikeF = feelsLikeF; }

    public double getWindChillC() { return windChillC; }
    public void setWindChillC(double windChillC) { this.windChillC = windChillC; }

    public double getWindChillF() { return windChillF; }
    public void setWindChillF(double windChillF) { this.windChillF = windChillF; }

    public double getHeatIndexC() { return heatIndexC; }
    public void setHeatIndexC(double heatIndexC) { this.heatIndexC = heatIndexC; }

    public double getHeatIndexF() { return heatIndexF; }
    public void setHeatIndexF(double heatIndexF) { this.heatIndexF = heatIndexF; }

    public List<Forecastday> getForecastdays() { return forecastdays; }
    public void setForecastdays(List<Forecastday> forecastdays) { this.forecastdays = forecastdays; }

}
