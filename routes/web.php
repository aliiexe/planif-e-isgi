
<?php

use App\Http\Controllers\AffectationFormodgrController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// require __DIR__.'/auth.php';
use App\Http\Controllers\EtablissementController;
use App\Http\Controllers\FiliereController;
use App\Http\Controllers\OptionFiliereController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\GroupePhysiqueController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ImportFiliereController;
use App\Http\Controllers\OptionFiliereImportController;
use App\Http\Controllers\ComplexeImportController;
use App\Http\Controllers\ImportEtablissementController;
use App\Http\Controllers\ModuleImportController;
use App\Http\Controllers\FormateurImportController; // Assurez-vous que cette ligne est présente
 // Assurez-vous que cette ligne est présente



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
Route::post('/import', [ImportFiliereController::class, 'import'])->name('import.filiere.action');
Route::post('/importop', [OptionFiliereImportController::class, 'import'])->name('import.optionfiliere.action');
Route::post('/importcomp', [ComplexeImportController::class, 'import'])->name('import.comp.action');
Route::post('/importetab', [ImportEtablissementController::class, 'import'])->name('import.etab.action');
Route::post('/importmod', [ModuleImportController::class, 'import'])->name('import.mod.action');
Route::post('/importform', [FormateurImportController::class, 'import'])->name('import.form.action');


