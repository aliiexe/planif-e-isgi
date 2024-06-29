
<?php

use App\Models\Formateur;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// require __DIR__.'/auth.php';
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\FiliereController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\EtablissementController;
use App\Http\Controllers\OptionFiliereController;
use App\Http\Controllers\GroupePhysiqueController;
use App\Http\Controllers\AffectationFormodgrController;

Route::resource('etablissement',EtablissementController::class);
Route::resource('groupe',GroupePhysiqueController::class);
Route::resource('formateur',FormateurController::class);
Route::resource('filieres', FiliereController::class);
Route::resource('option-filieres', OptionFiliereController::class);
Route::resource('modules', ModuleController::class);
Route::resource('affectation', AffectationFormodgrController::class);
Route::post('/choose',[GroupePhysiqueController::class,"choose"]);
Route::post('/editgroupe',[GroupePhysiqueController::class,"editgroupe"]);
Route::post('/groupedel',[GroupePhysiqueController::class,"groupedel"]);
Route::post('/countaffect',[FormateurController::class,'countaffect']);