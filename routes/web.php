<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// require __DIR__.'/auth.php';


use App\Http\Controllers\FormateurController;
use App\Http\Controllers\GroupePhysiqueController;
use App\Http\Controllers\EtablissementController;
Route::resource('etablissement',EtablissementController::class);
Route::resource('groupe',GroupePhysiqueController::class);
Route::resource('formateur',FormateurController::class);
