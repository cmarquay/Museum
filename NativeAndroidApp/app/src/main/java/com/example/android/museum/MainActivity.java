package com.example.android.museum;

import android.content.Intent;
import android.os.Bundle;
import android.provider.Settings.Secure;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

/**
 * Activity class displaying the help of the Museum app.
 *
 * @author Christian Marquay
 */
public class MainActivity extends AppCompatActivity {

    private Cookie cookie;

    @Override
    public void onSaveInstanceState(Bundle savedInstanceState) {
        savedInstanceState.putSerializable("cookie", cookie);
        super.onSaveInstanceState(savedInstanceState);
    }

    @Override
    public void onBackPressed() {
        cookie.set(this, "BACK_BUTTON", System.currentTimeMillis());
        Intent intent = new Intent(this, MenuActivity.class);
        intent.putExtra("cookie", cookie);
        startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setLogo(R.mipmap.logo);
        getSupportActionBar().setDisplayUseLogoEnabled(true);

        if (savedInstanceState != null) {
            cookie = (Cookie) savedInstanceState.getSerializable("cookie");
        } else {
            Intent intent = getIntent();
            if (!Intent.ACTION_MAIN.equals(intent.getAction())) {
                cookie = (Cookie) intent.getSerializableExtra("cookie");
            } else {
                cookie = new Cookie(Secure.getString(getContentResolver(), Secure.ANDROID_ID));
            }
        }

        Button menuView = (Button) findViewById(R.id.menu);
        if (menuView != null) {
            menuView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    cookie.set(MainActivity.this, "MENU", System.currentTimeMillis());
                    Intent intent = new Intent(MainActivity.this, MenuActivity.class);
                    intent.putExtra("cookie", cookie);
                    startActivity(intent);
                }
            });
        }
    }
}
