package com.example.android.museum;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;

public class FlayedActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_flayed);

        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setLogo(R.mipmap.logo);
        getSupportActionBar().setDisplayUseLogoEnabled(true);

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

    public void displayFloor(int floor) {
        Intent intent = new Intent(FlayedActivity.this, MapActivity.class);
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
                intent = new Intent(this, MainActivity.class);
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
