<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (Request $request) {
    $userAgent = strtolower($request->userAgent() ?? '');
    $isMobile = str_contains($userAgent, 'iphone')
        || str_contains($userAgent, 'android')
        || str_contains($userAgent, 'mobile')
        || str_contains($userAgent, 'ipad');

    return $isMobile
        ? to_route('mobile.home')
        : to_route('desktop.home');
})->name('home');

Route::get('/mobile', function () {
    return Inertia::render('Mobile/Home', [
        'appName' => config('app.name'),
        'laravelVersion' => app()->version(),
        'phpVersion' => PHP_VERSION,
    ]);
})->name('mobile.home');

Route::get('/desktop', function () {
    return Inertia::render('Desktop/Home', [
        'appName' => config('app.name'),
        'laravelVersion' => app()->version(),
        'phpVersion' => PHP_VERSION,
    ]);
})->name('desktop.home');
