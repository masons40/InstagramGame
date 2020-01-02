package com.instagramGame.InstagramGame.representation;

import com.instagramGame.InstagramGame.spotify.GetPlaylists;
import com.wrapper.spotify.model_objects.specification.Artist;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

@Controller
public class MyController {

    @RequestMapping(value = "/getPlaylist", produces = "application/json; charset=UTF-8")
    public ResponseEntity<ArrayList<PlaylistRep>> getPlaylist() {

        ArrayList<PlaylistRep> pr = GetPlaylists.getListOfFeaturedPlaylists_Sync();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Responded", "MyController");

        return ResponseEntity.accepted().headers(headers).body(pr);
    }

    @RequestMapping(value = "/getArtists/{number}", produces = "application/json; charset=UTF-8")
    @ResponseBody
    public ResponseEntity<ArrayList<String>> getArtist(@PathVariable String number, HttpServletResponse httpServletResponse) {
        ArrayList<String> pr = GetPlaylists.getPlaylistsTracks_Sync(number);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Responded", "MyController");

        httpServletResponse.setHeader("Location", "index.html");
        return ResponseEntity.accepted().headers(headers).body(pr);
    }

    @RequestMapping(value = "/getArtistValues/{number}", produces = "application/json; charset=UTF-8")
    @ResponseBody
    public ResponseEntity<ArtistRep> getArtistValues(@PathVariable String number, HttpServletResponse httpServletResponse) {
        ArtistRep pr = GetPlaylists.getArtistInfo_Sync(number);


        HttpHeaders headers = new HttpHeaders();
        headers.add("Responded", "MyController");

        httpServletResponse.setHeader("Location", "index.html");
        return ResponseEntity.accepted().headers(headers).body(pr);
    }
}

