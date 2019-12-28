package com.instagramGame.InstagramGame.representation;

import java.util.ArrayList;

public class ArtistRep {

    private String name = "";
    private int populatriy = 0;
    private String profile_pic = "";
    private String id = "";

    public ArtistRep(String name, String profile_pic, int populatriy){
        this.name = name;
        this.populatriy = populatriy;
        this.profile_pic = profile_pic;
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
