package com.example.android.museum.data;

import android.net.Uri;

import java.net.MalformedURLException;
import java.net.URL;

import static android.net.Uri.parse;

/**
 * Class containing the data to communicate with the network.
 *
 * @author Christian Marquay
 */
public class NetworkUtils {
    private final static String SERVER_BASE_URL = "http://192.168.42.104";
    private final static String PARAM_PORT = "8085";
    private final static String PARAM_ROUTE = "trace";


    /**
     * Method that builds the url for connecting to the server.
     *
     * @return the url used to connect to the server
     */
    public static URL buildUrl() {
        Uri builtUri = parse(SERVER_BASE_URL + ":" + PARAM_PORT + "/" + PARAM_ROUTE).buildUpon().build();
        URL url = null;
        try {
            url = new URL(builtUri.toString());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return url;
    }
}
