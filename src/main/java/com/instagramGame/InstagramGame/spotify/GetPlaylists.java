package com.instagramGame.InstagramGame.spotify;


import com.instagramGame.InstagramGame.representation.ArtistRep;
import com.instagramGame.InstagramGame.representation.PlaylistRep;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.special.FeaturedPlaylists;
import com.wrapper.spotify.model_objects.specification.*;
import com.wrapper.spotify.requests.data.artists.GetArtistRequest;
import com.wrapper.spotify.requests.data.browse.GetListOfFeaturedPlaylistsRequest;
import com.wrapper.spotify.requests.data.playlists.GetPlaylistRequest;
import com.wrapper.spotify.requests.data.playlists.GetPlaylistsTracksRequest;
import org.checkerframework.checker.units.qual.A;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Objects;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;

public class GetPlaylists {
    private static final String accessToken = Objects.requireNonNull(ClientCredentialsExample.getClientCredentialsToken()).getAccessToken();


    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setAccessToken(accessToken)
            .build();

    private static final GetListOfFeaturedPlaylistsRequest getListOfFeaturedPlaylistsRequest = spotifyApi
            .getListOfFeaturedPlaylists()
            .build();

    public static ArrayList<PlaylistRep> getListOfFeaturedPlaylists_Sync() {
        ArrayList<PlaylistRep> listOfPlaylists = new ArrayList<>();
        try {
            final FeaturedPlaylists featuredPlaylists = getListOfFeaturedPlaylistsRequest.execute();


            for (PlaylistSimplified fp : featuredPlaylists.getPlaylists().getItems()) {
                PlaylistRep pr = new PlaylistRep(fp.getName(), fp.getId());
                for(Image i: fp.getImages()){
                    pr.addPic(i.getUrl());
                }

                listOfPlaylists.add(pr);
            }

        } catch (IOException | SpotifyWebApiException e) {
            System.out.println("Error: " + e.getMessage());
        }

        return listOfPlaylists;
    }

    public static void getListOfFeaturedPlaylists_Async() {
        try {
            final CompletableFuture<FeaturedPlaylists> featuredPlaylistsFuture = getListOfFeaturedPlaylistsRequest.executeAsync();

            // Thread free to do other tasks...

            // Example Only. Never block in production code.
            final FeaturedPlaylists featuredPlaylists = featuredPlaylistsFuture.join();

            System.out.println("Message: " + featuredPlaylists.getMessage());
        } catch (CompletionException e) {
            System.out.println("Error: " + e.getCause().getMessage());
        } catch (CancellationException e) {
            System.out.println("Async operation cancelled.");
        }
    }


    public static ArrayList<String> getPlaylistsTracks_Sync(String playlistID) {
        GetPlaylistsTracksRequest getPlaylistsTracksRequest = spotifyApi.getPlaylistsTracks(playlistID).build();
        ArrayList<String> artistList = new ArrayList<>();
        try {
            final Paging<PlaylistTrack> playlistTrackPaging = getPlaylistsTracksRequest.execute();

            for(PlaylistTrack pt: playlistTrackPaging.getItems()){
                for(ArtistSimplified a : pt.getTrack().getArtists()){
                    artistList.add(a.getId());
                }
            }
        } catch (IOException | SpotifyWebApiException e) {
            System.out.println("Error: " + e.getMessage());
        }

        return artistList;
    }

    public static ArtistRep getArtistInfo_Sync(String artist) {
        Artist artistInfo = null;
        try {
            GetArtistRequest getArtistRequest = spotifyApi.getArtist(artist).build();
            artistInfo = getArtistRequest.execute();

        } catch (IOException | SpotifyWebApiException e) {
            System.out.println("Error: " + e.getMessage());
        }

        return new ArtistRep(artistInfo.getName(), artistInfo.getImages()[0].getUrl(), artistInfo.getPopularity(), artistInfo.getId());
    }

}