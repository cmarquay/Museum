/* Activity class displaying the homepage of the Museum app.
 * @author Christian Marquay
 */

package com.example.android.museum;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    String language;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setLogo(R.mipmap.logo);
        getSupportActionBar().setDisplayUseLogoEnabled(true);

        language = "english";

        ImageView englishLanguageView = (ImageView) findViewById(R.id.englishLanguage);
        if (englishLanguageView != null) {
            englishLanguageView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    language = "english";
                }
            });
        }

        ImageView frenchLanguageView = (ImageView) findViewById(R.id.frenchLanguage);
        if (frenchLanguageView != null) {
            frenchLanguageView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    language = "french";
                }
            });
        }

        /*ImageView spanishLanguageView = (ImageView) findViewById(R.id.spanishLanguage);
        if (spanishLanguageView != null) {
            spanishLanguageView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    language = "spanish";
                }
            });
        }

        ImageView germanLanguageView = (ImageView) rootView.findViewById(R.id.germanLanguage);
        if (germanLanguageView != null) {
            germanLanguageView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    language = "german";
                }
            });
        }*/

        Button displaySignView = (Button) findViewById(R.id.displaySign);
        if (displaySignView != null) {
            displaySignView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    EditText signNumberView = (EditText) findViewById(R.id.sign_number);
                    String signNumber = signNumberView.getText().toString();
                    if (!signNumber.equals("")) {
                        int number = Integer.parseInt(signNumber);
                        if (number < 1 || number > 26) {
                            Toast.makeText(MainActivity.this, getString(R.string.error), Toast.LENGTH_SHORT).show();
                        } else {
                            Intent intent = new Intent(MainActivity.this, SignsActivity.class);
                            intent.putExtra("language", language);
                            intent.putExtra("signNumber", number);
                            startActivity(intent);
                        }
                    } else {
                        Toast.makeText(MainActivity.this, getString(R.string.error), Toast.LENGTH_SHORT).show();
                    }
                }
            });
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
