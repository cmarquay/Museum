package com.example.android.museum;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;

/**
 * Activity class displaying the flayed of the building in the Museum app.
 *
 * @author Christian Marquay
 */
public class FlayedActivity extends AppCompatActivity {

    private Cookie cookie;

    @Override
    public void onSaveInstanceState(Bundle savedInstanceState) {
        savedInstanceState.putSerializable("cookie", cookie);
        super.onSaveInstanceState(savedInstanceState);
    }

    @Override
    public void onBackPressed() {
        cookie.set("BACK_BUTTON", System.currentTimeMillis());
        Intent intent = new Intent(this, MenuActivity.class);
        intent.putExtra("cookie", cookie);
        startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_flayed);

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

        ImageView thirdFloorView = (ImageView) findViewById(R.id.third_floor);
        if (thirdFloorView != null) {
            thirdFloorView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    displayFloor(3);
                }
            });
        }

        ImageView secondFloorView = (ImageView) findViewById(R.id.second_floor);
        if (secondFloorView != null) {
            secondFloorView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    displayFloor(2);
                }
            });
        }

        ImageView firstFloorView = (ImageView) findViewById(R.id.first_floor);
        if (firstFloorView != null) {
            firstFloorView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    displayFloor(1);
                }
            });
        }

        ImageView groundFloorView = (ImageView) findViewById(R.id.ground_floor);
        if (groundFloorView != null) {
            groundFloorView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    displayFloor(0);
                }
            });
        }

        ImageView basementView = (ImageView) findViewById(R.id.basement);
        if (basementView != null) {
            basementView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    displayFloor(-1);
                }
            });
        }
    }

    /**
     * Method that displays the map of the selected floor.
     *
     * @param floor the number of the floor
     */
    public void displayFloor(int floor) {
        cookie.set("FLOOR", System.currentTimeMillis(), floor);
        Intent intent = new Intent(FlayedActivity.this, MapActivity.class);
        intent.putExtra("cookie", cookie);
        intent.putExtra("floor", floor);
        startActivity(intent);
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
                cookie.set("HELP", System.currentTimeMillis());
                intent = new Intent(this, MainActivity.class);
                intent.putExtra("cookie", cookie);
                startActivity(intent);
                return true;
            case R.id.action_credits:
                cookie.set("CREDITS", System.currentTimeMillis());
                intent = new Intent(this, CreditsActivity.class);
                intent.putExtra("cookie", cookie);
                startActivity(intent);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
