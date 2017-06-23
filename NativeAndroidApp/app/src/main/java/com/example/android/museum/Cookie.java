package com.example.android.museum;

import com.example.android.museum.data.NetworkUtils;

import java.io.Serializable;
import java.net.URL;
import java.util.ArrayList;

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
     * @param type the type of action
     * @param ts   the moment of action
     */
    public void set(String type, Long ts) {
        mData.add(new PreparedData(type, ts));
        if (mData.size() == 10) {
            send();
        }
    }

    /**
     * Method storing the data to be sent to the server.
     *
     * @param type       the type of action
     * @param ts         the moment of action
     * @param language   the language selected to display the sign
     * @param signNumber the number of the sign
     */
    public void set(String type, Long ts, String language, int signNumber) {
        mData.add(new PreparedData(type, ts, language, signNumber));
        if (mData.size() == 10) {
            send();
        }
    }

    /**
     * Method storing the data to be sent to the server.
     *
     * @param type  the type of action
     * @param ts    the moment of action
     * @param floor the number of the selected floor
     */
    public void set(String type, Long ts, int floor) {
        mData.add(new PreparedData(type, ts, floor));
        if (mData.size() == 10) {
            send();
        }
    }

    /**
     * Method that sends the data to the server.
     */
    private void send() {
        URL serverUrl = NetworkUtils.buildUrl();
        mData.clear();
    }
}
