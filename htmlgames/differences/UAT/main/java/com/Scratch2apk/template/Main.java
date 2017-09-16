package com.Scratch2apk.template;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class Main extends Activity {
    WebView webView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        webView = (WebView)findViewById(R.id.fullscreen_content);
        webView.loadUrl("file:///android_asset/www/webview.html#zip");
        webView.setWebChromeClient(new WebChromeClient());
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setMediaPlaybackRequiresUserGesture(false);
        webSettings.setDomStorageEnabled(true);
        webSettings.setTextZoom(100);
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadWithOverviewMode(true);
        webSettings.setSupportZoom(false);
        webSettings.setMinimumFontSize(1);
        webSettings.setMinimumLogicalFontSize(1);
    }

    @Override
    public void onBackPressed() {super.onBackPressed();}

    @Override
    protected void onPostCreate(Bundle savedInstanceState) {super.onPostCreate(savedInstanceState);}
}
