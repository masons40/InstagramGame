package com.instagramGame.InstagramGame.representation;

import org.checkerframework.checker.units.qual.A;

import java.util.ArrayList;

public class ArtistRep {

    private String name = "";
    private Integer populatriy = 0;
    private String profile_pic = "";
    private String id = "";

    public ArtistRep(){

    }

    public ArtistRep(String name, String profile_pic, int populatriy, String id){
        this.name = name;
        this.populatriy = populatriy;
        this.profile_pic = profile_pic;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void addProfilePic(String s){
        this.profile_pic = s;
    }

    public String getProfilePic(){
        return profile_pic;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getPopularity() {
        return populatriy;
    }

    public void setPopularity(int pop) {
        this.populatriy = pop;
    }

}
