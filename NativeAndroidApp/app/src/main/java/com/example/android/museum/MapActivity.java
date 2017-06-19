package com.example.android.museum;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ImageView;

public class MapActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);

        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setLogo(R.mipmap.logo);
        getSupportActionBar().setDisplayUseLogoEnabled(true);

        Intent intent = getIntent();
        if (intent != null) {
            int floor = intent.getIntExtra("floor", 0);

            ImageView mapView = (ImageView) findViewById(R.id.map);
            if (mapView != null) {
                switch (floor) {
                    case -1:
                        mapView.setImageResource(R.drawable.basement);
                        mapView.setContentDescription(getString(R.string.basement));
                        break;
                    case 1:
                        mapView.setImageResource(R.drawable.first_floor);
                        mapView.setContentDescription(getString(R.string.first_floor));
                        break;
                    case 2:
                        mapView.setImageResource(R.drawable.second_floor);
                        mapView.setContentDescription(getString(R.string.second_floor));
                        break;
                    case 3:
                        mapView.setImageResource(R.drawable.third_floor);
                        mapView.setContentDescription(getString(R.string.third_floor));
                        break;
                    default:
                        mapView.setImageResource(R.drawable.ground_floor);
                        mapView.setContentDescription(getString(R.string.ground_floor));
                        break;
                }
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
                intent = new Intent(this, MainActivity.class);
                startActivity(intent);
                return true;
            case R.id.action_map:
                intent = new Intent(this, FlayedActivity.class);
                startActivity(intent);
                return true;
            case R.id.action_credits:
                intent = new Intent(this, CreditsActivity.class);
                startActivity(intent);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
