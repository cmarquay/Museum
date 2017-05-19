package com.example.android.museum;

public class Sign {
    private int mLogo;
    private String mTitle;
    private String mContent;

    public Sign(int logo, String title, String content) {
        mLogo = logo;
        mTitle = title;
        mContent = content;
    }

    public int getLogo() {
        return mLogo;
    }

    public String getTitle() {
        return mTitle;
    }

    public String getContent() {
        return mContent;
    }
}
