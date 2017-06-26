package com.example.android.museum;

import java.io.Serializable;

/**
 * Class containing the data of one action.
 *
 * @author Christian Marquay
 */
public class PreparedData implements Serializable {
    private static final int NO_SIGN_PROVIDED = -1;
    private static final int NO_FLOOR_PROVIDED = -1;

    private String mType;
    private Long mTs;
    private String mLanguage = String.valueOf(NO_SIGN_PROVIDED);
    private int mSignNumber = NO_SIGN_PROVIDED;
    private int mFloor = NO_FLOOR_PROVIDED;

    /**
     * Constructor initializing a preparedData for a standard screen.
     *
     * @param type the type of action
     * @param ts   the moment of action
     */
    public PreparedData(String type, Long ts) {
        mType = type;
        mTs = ts;
    }

    /**
     * Constructor initializing a preparedData when a sign is selected.
     *
     * @param type       the type of action
     * @param ts         the moment of action
     * @param language   the language selected to display the sign
     * @param signNumber the number of the sign
     */
    public PreparedData(String type, Long ts, String language, int signNumber) {
        mType = type;
        mTs = ts;
        mLanguage = language;
        mSignNumber = signNumber;
    }

    /**
     * Constructor initializing a preparedData when a sign is selected.
     *
     * @param type  the type of action
     * @param ts    the moment of action
     * @param floor the number of the selected floor
     */
    public PreparedData(String type, Long ts, int floor) {
        mType = type;
        mTs = ts;
        mFloor = floor;
    }

    /**
     * Method that returns whether or not the data relates to a sign.
     *
     * @return whether or not the data relates to a sign
     */
    public boolean hasSign() {
        return mSignNumber != NO_SIGN_PROVIDED;
    }

    /**
     * Method that returns whether or not the data relates to a floor.
     *
     * @return whether or not the data relates to a floor
     */
    public boolean hasFloor() {
        return mFloor != NO_FLOOR_PROVIDED;
    }

    /**
     * Method that returns the type of action.
     *
     * @return the type of action
     */
    public String getType() {
        return mType;
    }

    /**
     * Method that returns the moment of action.
     *
     * @return the moment of action
     */
    public Long getTs() {
        return mTs;
    }

    /**
     * Method that returns the language selected to display the sign.
     *
     * @return the language selected to display the sign
     */
    public String getLanguage() {
        return mLanguage;
    }

    /**
     * Method that returns the number of the sign.
     *
     * @return the number of the sign
     */
    public int getSignNumber() {
        return mSignNumber;
    }

    /**
     * Method that returns the number of the floor.
     *
     * @return the number of the floor
     */
    public int getFloor() {
        return mFloor;
    }
}
