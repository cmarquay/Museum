package com.example.android.museum;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

public class SignsActivity extends AppCompatActivity {

    private String language;
    private int signNumber;

    @Override
    public void onSaveInstanceState(Bundle savedInstanceState) {
        savedInstanceState.putString("language", language);
        savedInstanceState.putInt("signNumber", signNumber);
        super.onSaveInstanceState(savedInstanceState);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signs);

        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setLogo(R.mipmap.logo);
        getSupportActionBar().setDisplayUseLogoEnabled(true);

        if (savedInstanceState != null) {
            // Restore last state
            language = savedInstanceState.getString("language");
            signNumber = savedInstanceState.getInt("signNumber");
        } else {
            Intent intent = getIntent();
            if (intent != null) {
                language = intent.getStringExtra("language");
                signNumber = intent.getIntExtra("signNumber", 1);
            } else {
                language = "french";
                signNumber = 1;
            }
        }

        ImageView previousSignView = (ImageView) findViewById(R.id.previousSign);
        if (previousSignView != null) {
            previousSignView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    if (signNumber > 1) {
                        signNumber--;
                        displayPanel();
                    } else {
                        Toast.makeText(SignsActivity.this, R.string.first_sign, Toast.LENGTH_SHORT).show();
                    }
                }
            });
        }

        ImageView nextSignView = (ImageView) findViewById(R.id.nextSign);
        if (nextSignView != null) {
            nextSignView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    if (signNumber < 26) {
                        signNumber++;
                        displayPanel();
                    } else {
                        Toast.makeText(SignsActivity.this, R.string.last_sign, Toast.LENGTH_SHORT).show();
                    }
                }
            });
        }

        displayPanel();
    }

    private void displayPanel() {
        TextView signDescriptionView = (TextView) findViewById(R.id.sign_description);
        if (signDescriptionView != null) {
            signDescriptionView.setText("You are looking for\nthe sign n°" + signNumber + " in " + language);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_museum, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_credits:
                Intent intent = new Intent(this, CreditsActivity.class);
                startActivity(intent);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
