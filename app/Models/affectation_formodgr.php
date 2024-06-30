<?php

namespace App\Models;

use App\Models\Module;
use App\Models\Formateur;
use App\Models\groupe_physique;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class affectation_formodgr extends Model
{
    use HasFactory;
    protected $table="affectations_formodgr";
    protected $fillable = [
        'semaineAnneeFormation',
        'matricule',
        'idModule',
        'idGroupePhysique',
        'dateEFMPre',
        'dateEFMReal',
        'matriculeprof',
        'heureSemaine'
    ];
    public function formateur(){
     return $this->belongsTo(Formateur::class,'matriculeprof'); 
    }
    public function module(){
        return $this->belongsTo(Module::class,'idModule'); 
       }
       public function groupe(){
        return $this->belongsTo(groupe_physique::class,'idGroupePhysique'); 
       }
       
       
}
