package com.instagramGame.InstagramGame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import spotify.GetSeveralArtistsExample;

@SpringBootApplication
public class InstagramGameApplication {


	public static void main(String[] args) {
		SpringApplication.run(InstagramGameApplication.class, args);

		GetSeveralArtistsExample.getListOfCategories_Sync();
	}
}
