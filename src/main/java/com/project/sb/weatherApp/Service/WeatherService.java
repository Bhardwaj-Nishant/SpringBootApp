package com.project.sb.weatherApp.Service;

import com.project.sb.weatherApp.Dto.Forecast;
import com.project.sb.weatherApp.Dto.Root;
import com.project.sb.weatherApp.Dto.WeatherForecast;
import com.project.sb.weatherApp.Dto.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    @Value("${weather.api.forecast.url}")
    private String forecastUrl;

    public RestTemplate template = new RestTemplate();

    public WeatherResponse getData(String city) {
        String url = apiUrl + "?key=" + apiKey + "&q=" + city;
        Root response = template.getForObject(url, Root.class);
        WeatherResponse weatherResponse = new WeatherResponse();

        weatherResponse.setCity(response.getLocation().getName());
        weatherResponse.setRegion(response.getLocation().getRegion());
        weatherResponse.setCountry(response.getLocation().getCountry());
        weatherResponse.setLatitude(response.getLocation().getLat());
        weatherResponse.setLongitude(response.getLocation().getLon());
        weatherResponse.setLocalTime(response.getLocation().getLocaltime());

        weatherResponse.setTemperatureC(response.getCurrent().getTemp_c());
        weatherResponse.setTemperatureF(response.getCurrent().getTemp_f());
        weatherResponse.setConditionText(response.getCurrent().getCondition().getText());
        weatherResponse.setConditionIcon(response.getCurrent().getCondition().getIcon());
        weatherResponse.setWindKph(response.getCurrent().getWind_kph());
        weatherResponse.setHumidity(response.getCurrent().getHumidity());
        weatherResponse.setCloud(response.getCurrent().getCloud());
        weatherResponse.setFeelsLikeC(response.getCurrent().getFeelslike_c());
        weatherResponse.setFeelsLikeF(response.getCurrent().getFeelslike_f());
        weatherResponse.setWindChillC(response.getCurrent().getWindchill_c());
        weatherResponse.setWindChillF(response.getCurrent().getWindchill_f());
        weatherResponse.setHeatIndexC(response.getCurrent().getHeatindex_c());
        weatherResponse.setHeatIndexF(response.getCurrent().getHeatindex_f());

        return weatherResponse;
    }

    public WeatherForecast getForecastData(String city, int days) {
        String url = forecastUrl + "?key=" + apiKey + "&q=" + city + "&days=" + days;
        Root response = template.getForObject(url, Root.class);
        WeatherForecast forecast = new WeatherForecast();

        forecast.setCity(response.getLocation().getName());
        forecast.setRegion(response.getLocation().getRegion());
        forecast.setCountry(response.getLocation().getCountry());
        forecast.setLatitude(response.getLocation().getLat());
        forecast.setLongitude(response.getLocation().getLon());
        forecast.setLocalTime(response.getLocation().getLocaltime());

        forecast.setTemperatureC(response.getCurrent().getTemp_c());
        forecast.setTemperatureF(response.getCurrent().getTemp_f());
        forecast.setConditionText(response.getCurrent().getCondition().getText());
        forecast.setConditionIcon(response.getCurrent().getCondition().getIcon());
        forecast.setWindKph(response.getCurrent().getWind_kph());
        forecast.setHumidity(response.getCurrent().getHumidity());
        forecast.setCloud(response.getCurrent().getCloud());
        forecast.setFeelsLikeC(response.getCurrent().getFeelslike_c());
        forecast.setFeelsLikeF(response.getCurrent().getFeelslike_f());
        forecast.setWindChillC(response.getCurrent().getWindchill_c());
        forecast.setWindChillF(response.getCurrent().getWindchill_f());
        forecast.setHeatIndexC(response.getCurrent().getHeatindex_c());
        forecast.setHeatIndexF(response.getCurrent().getHeatindex_f());

        if (response.getForecast() != null && response.getForecast().getForecastday() != null) {
            forecast.setForecastdays(response.getForecast().getForecastday());
        }

        return forecast;
    }

}
