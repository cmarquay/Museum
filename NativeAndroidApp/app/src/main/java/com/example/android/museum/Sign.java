/* Class Sign representing a sign.
 * @author Christian Marquay
 */

package com.example.android.museum;

public class Sign {
    private int mLogo;
    private String mEnglishTitle;
    private String mEnglishContent;
    private String mFrenchTitle;
    private String mFrenchContent;

    /* Constructor of the class.
     * @param the path for the logo of the sign
     * @param the english title of the sign
     * @param the explanations given by the sign in english
     * @param the french title of the sign
     * @param the explanations given by the sign in french
     */
    public Sign(int logo, String englishTitle, String englishContent, String frenchTitle, String frenchContent) {
        mLogo = logo;
        mEnglishTitle = englishTitle;
        mEnglishContent = englishContent;
        mFrenchTitle = frenchTitle;
        mFrenchContent = frenchContent;
    }

    /* Getter for the logo parameter.
     * @return the path for the logo of the sign
     */
    public int getLogo() {
        return mLogo;
    }

    /* Getter for the englishTitle parameter.
     * @return the english title of the sign
     */
    public String getEnglishTitle() {
        return mEnglishTitle;
    }

    /* Getter for the englishContent parameter.
     * @return the explanations in english given by the sign
     */
    public String getEnglishContent() {
        return mEnglishContent;
    }

    /* Getter for the frenchTitle parameter.
     * @return the french title of the sign
     */
    public String getFrenchTitle() {
        return mFrenchTitle;
    }

    /* Getter for the frenchContent parameter.
     * @return the explanations in frenh given by the sign
     */
    public String getFrenchContent() {
        return mFrenchContent;
    }
}