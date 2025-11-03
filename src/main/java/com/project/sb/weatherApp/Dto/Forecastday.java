package com.project.sb.weatherApp.Dto;

import java.util.ArrayList;

public class Forecastday{
    public String date;
    public Day day;
    public Astro astro;

    public Forecastday() {
    }

    public Forecastday(String date, Day day, Astro astro) {
        this.date = date;
        this.day = day;
        this.astro = astro;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Day getDay() {
        return day;
    }

    public void setDay(Day day) {
        this.day = day;
    }

    public Astro getAstro() {
        return astro;
    }

    public void setAstro(Astro astro) {
        this.astro = astro;
    }

}
