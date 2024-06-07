<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    ];
    
}
