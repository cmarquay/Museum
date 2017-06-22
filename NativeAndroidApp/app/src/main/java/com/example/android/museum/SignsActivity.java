package com.example.android.museum;

import android.content.Intent;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.android.museum.data.SignContent;

import java.util.ArrayList;

/**
 * Activity class displaying the signs of the Museum app.
 *
 * @author Christian Marquay
 */
public class SignsActivity extends AppCompatActivity {

    private Cookie cookie;
    private String language;
    private int signNumber;
    private ArrayList<Sign> signs;
    private MediaPlayer mMediaPlayer;
    private AudioManager mAudioManager;
    private int length;
    private AudioManager.OnAudioFocusChangeListener mOnAudioFocusChangeListener = new AudioManager.OnAudioFocusChangeListener() {
        public void onAudioFocusChange(int focusChange) {
            if (focusChange == AudioManager.AUDIOFOCUS_LOSS_TRANSIENT || focusChange == AudioManager.AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK) {
                mMediaPlayer.pause();
                mMediaPlayer.seekTo(0);
            } else if (focusChange == AudioManager.AUDIOFOCUS_GAIN) {
                mMediaPlayer.start();
            } else if (focusChange == AudioManager.AUDIOFOCUS_LOSS) {
                releaseMediaPlayer();
            }
        }
    };
    private MediaPlayer.OnCompletionListener mCompletionListener = new MediaPlayer.OnCompletionListener() {
        @Override
        public void onCompletion(MediaPlayer mp) {
            ImageView playButtonView = (ImageView) findViewById(R.id.audio_button);
            if (playButtonView != null) {
                playButtonView.setImageResource(R.drawable.play_circle);
            }
            releaseMediaPlayer();
        }
    };

    @Override
    public void onSaveInstanceState(Bundle savedInstanceState) {
        savedInstanceState.putSerializable("cookie", cookie);
        savedInstanceState.putString("language", language);
        savedInstanceState.putInt("signNumber", signNumber);
        savedInstanceState.putInt("length", length);
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
        setContentView(R.layout.activity_signs);

        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setLogo(R.mipmap.logo);
        getSupportActionBar().setDisplayUseLogoEnabled(true);

        if (savedInstanceState != null) {
            cookie = (Cookie) savedInstanceState.getSerializable("cookie");
            language = savedInstanceState.getString("language");
            signNumber = savedInstanceState.getInt("signNumber");
            length = savedInstanceState.getInt("length");
        } else {
            Intent intent = getIntent();
            if (intent != null) {
                cookie = (Cookie) intent.getSerializableExtra("cookie");
                language = intent.getStringExtra("language");
                signNumber = intent.getIntExtra("signNumber", 1);
            } else {
                language = "english";
                signNumber = 1;
            }
        }

        mAudioManager = (AudioManager) getSystemService(AUDIO_SERVICE);

        SignContent sc = new SignContent();
        this.signs = sc.getSigns();

        final ImageView playButtonView = (ImageView) findViewById(R.id.audio_button);
        if (playButtonView != null) {
            playButtonView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    int result = mAudioManager.requestAudioFocus(mOnAudioFocusChangeListener, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN_TRANSIENT);
                    if (result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED) {
                        if (mMediaPlayer != null && mMediaPlayer.isPlaying()) {
                            releaseMediaPlayer();
                        } else {
                            mMediaPlayer = MediaPlayer.create(SignsActivity.this, signs.get(signNumber).getAudio());
                            if (length > 0) {
                                mMediaPlayer.seekTo(length);
                            }
                            mMediaPlayer.start();
                            playButtonView.setImageResource(R.drawable.pause_circle);
                            mMediaPlayer.setOnCompletionListener(mCompletionListener);
                        }
                    }
                }
            });
        }

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
                    refresh("PREVIOUS");
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
                    refresh("NEXT");
                }
            });
        }

        displaySign();
    }

    /**
     * Method for refreshing the page with new data.
     */
    private void refresh(String type) {
        Intent intent = getIntent();
        if (intent != null) {
            cookie.set(type, System.currentTimeMillis());
            intent.putExtra("cookie", cookie);
            intent.putExtra("language", language);
            intent.putExtra("signNumber", signNumber);
            finish();
            startActivity(getIntent());
        }
    }

    /**
     * Method for displaying the sign.
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

        ImageView playButtonView = (ImageView) findViewById(R.id.audio_button);
        if (playButtonView != null) {
            if (signs.get(signNumber).hasAudio() && language.equals("french")) {
                playButtonView.setImageResource(R.drawable.play_circle);
                playButtonView.setVisibility(View.VISIBLE);
            } else {
                playButtonView.setVisibility(View.GONE);
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
    protected void onPause() {
        super.onPause();
        releaseMediaPlayer();
    }

    @Override
    public void onStop() {
        super.onStop();
        releaseMediaPlayer();
    }

    /**
     * Clean up the media player by releasing its resources.
     */
    private void releaseMediaPlayer() {
        // If the media player is not null, then it may be currently playing a sound.
        if (mMediaPlayer != null) {
            length = mMediaPlayer.getCurrentPosition();
            ImageView playButtonView = (ImageView) findViewById(R.id.audio_button);
            if (playButtonView != null) {
                playButtonView.setImageResource(R.drawable.play_circle);
            }
            // Regardless of the current state of the media player, release its resources
            // because we no longer need it.
            mMediaPlayer.release();

            // Set the media player back to null. For our code, we've decided that
            // setting the media player to null is an easy way to tell that the media player
            // is not configured to play an audio file at the moment.
            mMediaPlayer = null;

            mAudioManager.abandonAudioFocus(mOnAudioFocusChangeListener);
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
                cookie.set("HELP", System.currentTimeMillis());
                intent = new Intent(this, MainActivity.class);
                intent.putExtra("cookie", cookie);
                startActivity(intent);
                return true;
            case R.id.action_map:
                cookie.set("FLAYED", System.currentTimeMillis());
                intent = new Intent(this, FlayedActivity.class);
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
