package spotify;

import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.miscellaneous.PlaylistTracksInformation;
import com.wrapper.spotify.model_objects.special.FeaturedPlaylists;
import com.wrapper.spotify.model_objects.special.PlaylistTrackPosition;
import com.wrapper.spotify.model_objects.specification.*;
import com.wrapper.spotify.requests.data.artists.GetSeveralArtistsRequest;
import com.wrapper.spotify.requests.data.browse.GetCategorysPlaylistsRequest;
import com.wrapper.spotify.requests.data.browse.GetListOfCategoriesRequest;
import com.wrapper.spotify.requests.data.browse.GetListOfFeaturedPlaylistsRequest;
import com.wrapper.spotify.requests.data.browse.GetListOfNewReleasesRequest;
import com.wrapper.spotify.requests.data.users_profile.GetUsersProfileRequest;
import spotify.ClientCredentialsExample;

import java.io.IOException;
import java.util.Objects;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;

public class GetSeveralArtistsExample {
    private static final String accessToken = Objects.requireNonNull(ClientCredentialsExample.getClientCredentialsToken()).getAccessToken();
    private static final String[] ids = new String[]{"0LcJLqbBmaGUft1e9Mm8HV"};

    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setAccessToken(accessToken)
            .build();
    private static final GetSeveralArtistsRequest getSeveralArtistsRequest = spotifyApi.getSeveralArtists(ids)
            .build();

    private static final GetListOfFeaturedPlaylistsRequest getListOfFeaturedPlaylistsRequest = spotifyApi
            .getListOfFeaturedPlaylists()
//          .country(CountryCode.SE)
//          .limit(10)
//          .offset(0)
//          .timestamp(new Date(1414054800000L))
            .build();

    private static final GetListOfCategoriesRequest getListOfCategoriesRequest = spotifyApi.getListOfCategories()
//          .country(CountryCode.SE)
//          .limit(10)
//          .offset(0)
//          .locale("sv_SE")
            .build();


    public static void getSeveralArtists_Sync() {
        try {
            final Artist[] artists = getSeveralArtistsRequest.execute();

            System.out.println("Length: " + artists.length);

            for (Artist a : artists){
                System.out.println(a.getName());
                System.out.println(a.getPopularity());
                System.out.println(a.getFollowers().getTotal());

                for (Image i: a.getImages()){
                    System.out.println(i.getUrl());
                }
            }
        } catch (IOException | SpotifyWebApiException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public static void getSeveralArtists_Async() {
        try {
            final CompletableFuture<Artist[]> artistFuture = getSeveralArtistsRequest.executeAsync();

            // Thread free to do other tasks...

            // Example Only. Never block in production code.
            final Artist[] artists = artistFuture.join();

            System.out.println("Length: " + artists.length);
        } catch (CompletionException e) {
            System.out.println("Error: " + e.getCause().getMessage());
        } catch (CancellationException e) {
            System.out.println("Async operation cancelled.");
        }
    }

    public static void getListOfFeaturedPlaylists_Sync() {
        try {
            final FeaturedPlaylists featuredPlaylists = getListOfFeaturedPlaylistsRequest.execute();

            System.out.println("Message: " + featuredPlaylists.getMessage());
            for(PlaylistSimplified fp:featuredPlaylists.getPlaylists().getItems()){
                System.out.println(fp.getName());
            }
        } catch (IOException | SpotifyWebApiException e) {
            System.out.println("Error: " + e.getMessage());
        }
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

    public static void getListOfCategories_Sync() {
        try {
            final Paging<Category> categoryPaging = getListOfCategoriesRequest.execute();

            System.out.println("Total: " + categoryPaging.getTotal());
            for(Category c: categoryPaging.getItems()){
                getTracks(c.getName().toLowerCase());
                System.out.println(c.getName());
                System.out.println();
            }
        } catch (IOException | SpotifyWebApiException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public static void getListOfCategories_Async() {
        try {
            final CompletableFuture<Paging<Category>> pagingFuture = getListOfCategoriesRequest.executeAsync();

            // Thread free to do other tasks...

            // Example Only. Never block in production code.
            final Paging<Category> categoryPaging = pagingFuture.join();

            System.out.println("Total: " + categoryPaging.getTotal());
        } catch (CompletionException e) {
            System.out.println("Error: " + e.getCause().getMessage());
        } catch (CancellationException e) {
            System.out.println("Async operation cancelled.");
        }
    }

    private static void getTracks(String s){
        final GetCategorysPlaylistsRequest getCategoryRequest = spotifyApi.getCategorysPlaylists(s)
//          .country(CountryCode.SE)
//          .limit(10)
//          .offset(0)
                .build();

        try {
            final Paging<PlaylistSimplified> playlistSimplifiedPaging = getCategoryRequest.execute();

            System.out.println("Total: " + playlistSimplifiedPaging.getTotal());
            for(PlaylistSimplified p: playlistSimplifiedPaging.getItems()){
                System.out.println(p.getName());
            }
        } catch (IOException | SpotifyWebApiException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }



}