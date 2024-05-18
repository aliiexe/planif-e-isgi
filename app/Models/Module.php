<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    /**
     * Get the option filiere that owns the module.
     */
    public function optionFiliere()
    {
        return $this->belongsTo(OptionFiliere::class);
    }
}

