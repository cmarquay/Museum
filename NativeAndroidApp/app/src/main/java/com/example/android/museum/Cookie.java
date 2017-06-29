package com.example.android.museum;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;

import com.example.android.museum.data.NetworkUtils;

import java.io.IOException;
import java.io.Serializable;
import java.net.URL;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

/**
 * Class containing the data to be sent to the server.
 *
 * @author Christian Marquay
 */
public class Cookie implements Serializable {

    private String mId;
    private ArrayList<PreparedData> mData;

    /**
     * Constructor initializing a cookie.
     *
     * @param id the id of the device
     */
    public Cookie(String id) {
        mId = id;
        mData = new ArrayList<>();
    }

    /**
     * Method storing the data to be sent to the server.
     *
     * @param context the original activity
     * @param type    the type of action
     * @param ts      the moment of action
     */
    public void set(Context context, String type, Long ts) {
        mData.add(new PreparedData(type, ts));
        if (mData.size() >= 10) {
            send(context);
        }
    }

    /**
     * Method storing the data to be sent to the server.
     *
     * @param context    the original activity
     * @param type       the type of action
     * @param ts         the moment of action
     * @param language   the language selected to display the sign
     * @param signNumber the number of the sign
     */
    public void set(Context context, String type, Long ts, String language, int signNumber) {
        mData.add(new PreparedData(type, ts, language, signNumber));
        if (mData.size() >= 10) {
            send(context);
        }
    }

    /**
     * Method storing the data to be sent to the server.
     *
     * @param context the original activity
     * @param type    the type of action
     * @param ts      the moment of action
     * @param floor   the number of the selected floor
     */
    public void set(Context context, String type, Long ts, int floor) {
        mData.add(new PreparedData(type, ts, floor));
        if (mData.size() >= 10) {
            send(context);
        }
    }

    /**
     * Method that sends the data to the server.
     *
     * @param context the original activity
     */
    private void send(Context context) {
        ConnectivityManager connectivityManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
        if (networkInfo != null && networkInfo.isAvailable() && networkInfo.isConnected()) {
            URL serverUrl = NetworkUtils.buildUrl();
            int length = mData.size();
            try {
                if (new MuseumTask().execute(serverUrl).get()) {
                    mData.subList(0, length).clear();
                }
            } catch (ExecutionException | InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * Class allowing to make long spots in a thread parallel to the UI thread.
     */
    public class MuseumTask extends AsyncTask<URL, Void, Boolean> {
        @Override
        protected Boolean doInBackground(URL... urls) {
            URL searchUrl = urls[0];
            Boolean sent = false;
            try {
                sent = NetworkUtils.sendToHttpUrl(searchUrl, mData, mId);
            } catch (IOException e) {
                e.printStackTrace();
            }
            return sent;
        }
    }
}
