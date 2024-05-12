<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormateurPermanent extends Model
{
    use HasFactory;

    protected $table = 'formateurs__permanents';


    protected $fillable = [
        'Date_Recrutement',
        'Date_Depart_Retrait',
        'Echelle',
        'Echelon',
        'Grade',
        'matriculeFm'
    ];

    public function formateur()
    {
        return $this->belongsTo(Formateur::class);
    }

    
}
