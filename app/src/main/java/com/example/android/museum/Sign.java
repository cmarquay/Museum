/* Class Sign representing a sign.
 * @author Christian Marquay
 */

package com.example.android.museum;

public class Sign {
    private int mLogo;
    private String mTitle;
    private String mContent;

    /* Constructor of the class.
     * @param logo the path for the logo of the sign
     * @param title the title of the sign
     * @param content the explanations given by the sign
     */
    public Sign(int logo, String title, String content) {
        mLogo = logo;
        mTitle = title;
        mContent = content;
    }

    /* Getter for the logo parameter.
     * @return the path for the logo of the sign
     */
    public int getLogo() {
        return mLogo;
    }

    /* Getter for the title parameter.
     * @return the title of the sign
     */
    public String getTitle() {
        return mTitle;
    }

    /* Getter for the content parameter.
     * @return the explanations given by the sign
     */
    public String getContent() {
        return mContent;
    }
}
