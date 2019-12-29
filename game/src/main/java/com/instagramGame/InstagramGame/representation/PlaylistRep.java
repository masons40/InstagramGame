package com.instagramGame.InstagramGame.representation;

import org.checkerframework.checker.units.qual.A;

import java.util.ArrayList;

public class PlaylistRep {

    private String name = "";
    private String id = "";
    private ArrayList<String> artistId = new ArrayList<>();
    private ArrayList<String> playlistPics = new ArrayList<>();

    public PlaylistRep(String name, String id){
        this.name = name;
        this.id= id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void addPic(String s){
        playlistPics.add(s);
    }

    public ArrayList<String> getPics(){
        return playlistPics;
    }

    public void addArtist(String s){
        artistId.add(s);
    }

    public ArrayList<String> getArtists(){
        return artistId;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
