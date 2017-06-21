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

/**
 * Activity class displaying the map of a floor in the Museum app.
 *
 * @author Christian Marquay
 */
public class MapActivity extends AppCompatActivity {
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
        savedInstanceState.putInt("length", length);
        super.onSaveInstanceState(savedInstanceState);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);

        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setLogo(R.mipmap.logo);
        getSupportActionBar().setDisplayUseLogoEnabled(true);

        if (savedInstanceState != null) {
            length = savedInstanceState.getInt("length");
        }

        Intent intent = getIntent();
        if (intent != null) {
            int floor = intent.getIntExtra("floor", 0);

            ImageView mapView = (ImageView) findViewById(R.id.map);
            ImageView playButtonView = (ImageView) findViewById(R.id.audio_button);
            if (mapView != null) {
                switch (floor) {
                    case -1:
                        mapView.setImageResource(R.drawable.basement);
                        mapView.setContentDescription(getString(R.string.basement));
                        playButtonView.setVisibility(View.GONE);
                        break;
                    case 1:
                        mapView.setImageResource(R.drawable.first_floor);
                        mapView.setContentDescription(getString(R.string.first_floor));
                        playButtonView.setVisibility(View.GONE);
                        break;
                    case 2:
                        mapView.setImageResource(R.drawable.second_floor);
                        mapView.setContentDescription(getString(R.string.second_floor));
                        playButtonView.setVisibility(View.GONE);
                        break;
                    case 3:
                        mapView.setImageResource(R.drawable.third_floor);
                        mapView.setContentDescription(getString(R.string.third_floor));
                        playButtonView.setVisibility(View.GONE);
                        break;
                    default:
                        mapView.setImageResource(R.drawable.ground_floor);
                        mapView.setContentDescription(getString(R.string.ground_floor));
                        playButtonView.setImageResource(R.drawable.play_circle);
                        playButtonView.setContentDescription(getString(R.string.audio));
                        playButtonView.setVisibility(View.VISIBLE);
                        break;
                }
            }
        }

        mAudioManager = (AudioManager) getSystemService(AUDIO_SERVICE);

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
                            mMediaPlayer = MediaPlayer.create(MapActivity.this, R.raw.ground_floor);
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
