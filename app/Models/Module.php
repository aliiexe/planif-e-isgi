<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Module extends Model
{
    use HasFactory;

    protected $fillable = [
        'codeModule',
        'libelleModule',
        'ordreModule',
        'MHT',
        'Coef',
        'EFM_Regional',
        'option_filieres_id',
        'semestreModule',
    ];
    public function affectations(){
        return $this->hasMany(affectation_formodgr::class,"idModule");
    }
    /**
     * Get the option filiere that owns the module.
     */
    public function optionFiliere()
    {
        return $this->belongsTo(OptionFiliere::class);
    }
}

