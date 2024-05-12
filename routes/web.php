<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// require __DIR__.'/auth.php';


use App\Http\Controllers\FormateurController;
Route::post('/formateurs', [FormateurController::class, 'store']);
