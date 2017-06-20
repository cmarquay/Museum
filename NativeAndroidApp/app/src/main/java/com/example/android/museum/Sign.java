/* Class Sign representing a sign.
 * @author Christian Marquay
 */

package com.example.android.museum;

/**
 * Class containing the structure of the signs.
 *
 * @author Christian Marquay
 */
public class Sign {
    private static final int NO_AUDIO_PROVIDED = -1;

    private int mLogo;
    private int mAudio = NO_AUDIO_PROVIDED;
    private String mEnglishTitle;
    private String mEnglishContent;
    private String mFrenchTitle;
    private String mFrenchContent;

    /**
     * Constructor initializing all the data of a sign.
     *
     * @param logo           the path for the logo of the sign
     * @param audio          the path for the audio of the sign
     * @param englishTitle   the english title of the sign
     * @param englishContent the explanations given by the sign in english
     * @param frenchTitle    the french title of the sign
     * @param frenchContent  the explanations given by the sign in french
     */
    public Sign(int logo, int audio, String englishTitle, String englishContent, String frenchTitle, String frenchContent) {
        mLogo = logo;
        mAudio = audio;
        mEnglishTitle = englishTitle;
        mEnglishContent = englishContent;
        mFrenchTitle = frenchTitle;
        mFrenchContent = frenchContent;
    }

    /**
     * Constructor for signs that do not have audio.
     *
     * @param logo           the path for the logo of the sign
     * @param englishTitle   the english title of the sign
     * @param englishContent the explanations given by the sign in english
     * @param frenchTitle    the french title of the sign
     * @param frenchContent  the explanations given by the sign in french
     */
    public Sign(int logo, String englishTitle, String englishContent, String frenchTitle, String frenchContent) {
        mLogo = logo;
        mEnglishTitle = englishTitle;
        mEnglishContent = englishContent;
        mFrenchTitle = frenchTitle;
        mFrenchContent = frenchContent;
    }

    /**
     * Getter for the logo parameter.
     *
     * @return the path for the logo of the sign
     */
    public int getLogo() {
        return mLogo;
    }

    /**
     * Getter for the audio paramter.
     *
     * @return the path for the audio of the sign
     */
    public int getAudio() {
        return mAudio;
    }

    /**
     * Getter for the englishTitle parameter.
     *
     * @return the english title of the sign
     */
    public String getEnglishTitle() {
        return mEnglishTitle;
    }

    /**
     * Getter for the englishContent parameter.
     *
     * @return the explanations in english given by the sign
     */
    public String getEnglishContent() {
        return mEnglishContent;
    }

    /**
     * Getter for the frenchTitle parameter.
     *
     * @return the french title of the sign
     */
    public String getFrenchTitle() {
        return mFrenchTitle;
    }

    /**
     * Getter for the frenchContent parameter.
     *
     * @return the explanations in frenh given by the sign
     */
    public String getFrenchContent() {
        return mFrenchContent;
    }

    /**
     * Method indicating whether the sign has an audio.
     *
     * @return whether or not there is an audio for this Sign
     */
    public boolean hasAudio() {
        return mAudio != NO_AUDIO_PROVIDED;
    }
}