/* Activity class displaying the signs of the Museum app.
 * @author Christian Marquay
 */

package com.example.android.museum;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.android.museum.data.SignContent;

import java.util.ArrayList;

public class SignsActivity extends AppCompatActivity {

    private String language;
    private int signNumber;


    private ArrayList<Sign> signs;

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
            language = savedInstanceState.getString("language");
            signNumber = savedInstanceState.getInt("signNumber");
        } else {
            Intent intent = getIntent();
            if (intent != null) {
                language = intent.getStringExtra("language");
                signNumber = intent.getIntExtra("signNumber", 1);
            } else {
                language = "english";
                signNumber = 1;
            }
        }

        SignContent sc = new SignContent();
        this.signs = sc.getSigns();

        ImageView previousSignView = (ImageView) findViewById(R.id.previousSign);
        if (previousSignView != null) {
            previousSignView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    switch (signNumber) {
                        case 0:
                            signNumber = 24;
                            break;
                        case 9:
                            signNumber = 7;
                            break;
                        case 25:
                            signNumber = 0;
                            break;
                        default:
                            signNumber--;
                    }
                    refresh();
                }
            });
        }

        ImageView nextSignView = (ImageView) findViewById(R.id.nextSign);
        if (nextSignView != null) {
            nextSignView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    switch (signNumber) {
                        case 0:
                            signNumber = 25;
                            break;
                        case 7:
                            signNumber = 9;
                            break;
                        case 24:
                            signNumber = 0;
                            break;
                        default:
                            signNumber++;
                    }
                    refresh();
                }
            });
        }

        displaySign();
    }

    /* Method for refreshing the page with new data.
     */
    private void refresh() {
        Intent intent = getIntent();
        if (intent != null) {
            intent.putExtra("language", language);
            intent.putExtra("signNumber", signNumber);
            finish();
            startActivity(getIntent());
        }
    }

    /* Method for displaying the sign.
     */
    private void displaySign() {
        ImageView signLogoView = (ImageView) findViewById(R.id.sign_logo);
        if (signLogoView != null) {
            signLogoView.setImageResource(signs.get(signNumber).getLogo());
            ImageView secondLogoView = (ImageView) findViewById(R.id.second_logo);
            if (signNumber == 25) {
                secondLogoView.setImageResource(R.drawable.sign_25_2);
                secondLogoView.setVisibility(View.VISIBLE);
            } else {
                secondLogoView.setVisibility(View.GONE);
            }
        }
        String title;
        String content;
        switch (language) {
            case "french":
                title = signs.get(signNumber).getFrenchTitle();
                content = signs.get(signNumber).getFrenchContent();
                break;
            /*case "spanish":
                title = signs.get(signNumber).getSpanishTitle();
                content = signs.get(signNumber).getSpanishContent();
                break;
            case "german":
                title = signs.get(signNumber).getGermanTitle();
                content = signs.get(signNumber).getGermanContent();
                break;*/
            default:
                title = signs.get(signNumber).getEnglishTitle();
                content = signs.get(signNumber).getEnglishContent();
        }
        TextView signTitleView = (TextView) findViewById(R.id.sign_title);
        if (signTitleView != null) {
            signTitleView.setText(title);
        }
        TextView signContentView = (TextView) findViewById(R.id.sign_content);
        if (signContentView != null) {
            signContentView.setText(content);
        }
        TextView signNumberView = (TextView) findViewById(R.id.sign_number);
        if (signNumberView != null) {
            String number;
            if (signNumber == 0) {
                number = "24bis";
            } else {
                number = "" + signNumber;
            }
            signNumberView.setText(number);
        }
        ImageView previousSignView = (ImageView) findViewById(R.id.previousSign);
        if (previousSignView != null) {
            if (signNumber == 1) {
                previousSignView.setVisibility(View.INVISIBLE);
            } else {
                previousSignView.setVisibility(View.VISIBLE);
            }
        }
        ImageView nextSignView = (ImageView) findViewById(R.id.nextSign);
        if (nextSignView != null) {
            if (signNumber == 26) {
                nextSignView.setVisibility(View.GONE);
            } else {
                nextSignView.setVisibility(View.VISIBLE);
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
