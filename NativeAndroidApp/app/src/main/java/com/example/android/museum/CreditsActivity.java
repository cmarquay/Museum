package com.example.android.museum;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;

/**
 * Activity class displaying the credits of the Museum app.
 *
 * @author Christian Marquay
 */
public class CreditsActivity extends AppCompatActivity {

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
        setContentView(R.layout.activity_credits);

        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setLogo(R.mipmap.logo);
        getSupportActionBar().setDisplayUseLogoEnabled(true);

        if (savedInstanceState != null) {
            cookie = (Cookie) savedInstanceState.getSerializable("cookie");
        } else {
            Intent intent = getIntent();
            if (intent != null) {
                cookie = (Cookie) intent.getSerializableExtra("cookie");
            }
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_museum, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        Intent intent;
        switch (item.getItemId()) {
            case R.id.action_help:
                cookie.set(this, "HELP", System.currentTimeMillis());
                intent = new Intent(this, MainActivity.class);
                intent.putExtra("cookie", cookie);
                startActivity(intent);
                return true;
            case R.id.action_map:
                cookie.set(this, "FLAYED", System.currentTimeMillis());
                intent = new Intent(this, FlayedActivity.class);
                intent.putExtra("cookie", cookie);
                startActivity(intent);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
