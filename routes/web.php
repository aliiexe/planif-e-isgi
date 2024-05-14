<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// require __DIR__.'/auth.php';


use App\Http\Controllers\FormateurController;
use App\Http\Controllers\GroupePhysiqueController;
Route::post('/formateurs', [FormateurController::class, 'store']);
Route::resource('groupe',GroupePhysiqueController::class);
