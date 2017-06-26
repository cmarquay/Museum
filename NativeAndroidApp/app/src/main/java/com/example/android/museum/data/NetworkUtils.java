package com.example.android.museum.data;

import android.net.Uri;

import com.example.android.museum.PreparedData;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

import static android.net.Uri.parse;

/**
 * Class containing the data to communicate with the network.
 *
 * @author Christian Marquay
 */
public class NetworkUtils {
    private final static String SERVER_BASE_URL = "http://127.0.0.1";
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

    /**
     * Method that sends the data to the server.
     *
     * @param url  the url used to connect to the server
     * @param data the data to send
     * @param id   the id of the device
     * @return whether or not the data was sent with a response code 200
     */
    public static Boolean sendToHttpUrl(URL url, ArrayList<PreparedData> data, String id) throws IOException {
        HttpURLConnection urlConnection = null;
        int response = -1;

        try {
            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("POST");
            urlConnection.setRequestProperty("Content-Type", "application/json");
            urlConnection.setUseCaches(false);
            urlConnection.setDoOutput(true);
            urlConnection.connect();

            JSONObject jsonParam = new JSONObject();
            JSONArray dataParam = new JSONArray();
            for (PreparedData d : data) {
                JSONObject itemParam = new JSONObject();
                itemParam.put("id", id);
                itemParam.put("type", d.getType());
                itemParam.put("ts", d.getTs());
                if (d.hasSign()) {
                    JSONObject signParam = new JSONObject();
                    signParam.put("language", d.getLanguage());
                    signParam.put("signNumber", d.getSignNumber());
                    itemParam.put("sign", signParam);
                } else if (d.hasFloor()) {
                    JSONObject floorParam = new JSONObject();
                    floorParam.put("floorNumber", d.getFloor());
                    itemParam.put("floor", floorParam);
                }
                dataParam.put(itemParam);
            }

            jsonParam.put("data", dataParam);

            DataOutputStream printout = new DataOutputStream(urlConnection.getOutputStream());
            printout.writeBytes(jsonParam.toString());
            printout.flush();
            printout.close();

            response = urlConnection.getResponseCode();
        } catch (JSONException e) {
            e.printStackTrace();
            return Boolean.FALSE;
        } finally {
            if (urlConnection != null) {
                urlConnection.disconnect();
            }
        }
        return response == 200;
    }
}
