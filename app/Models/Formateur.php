<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Formateur extends Model
{
    use HasFactory;    
    protected $primaryKey = 'matricule';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'matricule',
        'password',
        'nom',
        'prenom',
        'numTel',
        'civilite',
        'Echelle',
        'Echelon',
        'Date_Recrutement',
        'Date_Depart_Retrait',
        'dateNaissance',
        'Adresse',
        'Grade',
        'Diplome',
        'situationFamiliale',
        'MasseHoaraireHeb',
        'massHorRealiseeAnnuel',
        'Filiere',
        'Categorie',
        'idEtablissement',
        'MasseHoaraireHebinit'
    ];

    public function etablissement()
    {
        return $this->belongsTo(Etablissement::class,"idEtablissement");
    }
    public function affectations(){
        return $this->hasMany(affectation_formodgr::class,"matriculeprof");
    }


    public $timestamps = false;


    
}
