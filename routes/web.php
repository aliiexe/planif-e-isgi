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
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// require __DIR__.'/auth.php';

use App\Http\Controllers\FiliereController;
use App\Http\Controllers\OptionFiliereController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\GroupePhysiqueController;
use App\Http\Controllers\ModuleController;

Route::post('/formateurs', [FormateurController::class, 'store']);
Route::resource('groupe',GroupePhysiqueController::class);
Route::resource('filieres', FiliereController::class);
Route::resource('option-filieres', OptionFiliereController::class);
Route::resource('modules', ModuleController::class);
