<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$dashboardStats = [
    'totalLine' => 8,
    'totalOperator' => 126,
    'totalGudang' => 4,
    'totalSku' => 218,
    'produksiHariIni' => [
        'total' => 30,
        'byStatus' => [
            'terjadwal' => 6,
            'selesai' => 18,
            'proses' => 3,
            'tunda' => 2,
            'batal' => 1,
        ],
    ],
    'pengirimanHariIni' => [
        'total' => 24,
        'byCategory' => [
            'terkirim' => 14,
            'loading' => 5,
            'picking' => 3,
            'pending' => 2,
        ],
    ],
    'trendProduksi' => [
        ['date' => '2026-03-19', 'total' => 64],
        ['date' => '2026-03-20', 'total' => 71],
        ['date' => '2026-03-21', 'total' => 69],
        ['date' => '2026-03-22', 'total' => 78],
        ['date' => '2026-03-23', 'total' => 82],
        ['date' => '2026-03-24', 'total' => 80],
        ['date' => '2026-03-25', 'total' => 88],
    ],
];

$underDevelopment = fn () => Inertia::render('UnderDevelopment');

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

Route::get('/desktop', fn () => to_route('dashboard'))->name('desktop.home');
Route::get('/dashboard', fn () => Inertia::render('Dashboard', ['stats' => $dashboardStats]))->name('dashboard');
Route::get('/profile', $underDevelopment)->name('profile.show');
Route::get('/operasional/produksi', $underDevelopment)->name('operasional.produksi.index');
Route::get('/operasional/pengiriman', $underDevelopment)->name('operasional.pengiriman.index');
Route::get('/operasional/persediaan', $underDevelopment)->name('operasional.persediaan.index');
Route::get('/analitik/laporan-operasional', $underDevelopment)->name('analitik.laporan-operasional');
Route::get('/master/supplier', $underDevelopment)->name('master.supplier.index');
Route::get('/master/bahan-baku', $underDevelopment)->name('master.bahan-baku.index');
Route::get('/master/lokasi-gudang', $underDevelopment)->name('master.lokasi-gudang.index');
Route::get('/master/tim', $underDevelopment)->name('master.tim.index');
Route::get('/sistem/pengaturan/alur-persetujuan', $underDevelopment)->name('sistem.pengaturan.alur-persetujuan');
