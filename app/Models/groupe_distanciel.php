<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class groupe_distanciel extends Model
{
    use HasFactory;
    protected $primaryKey = 'codeGroupeDS';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'codeGroupeDS',
        'libelleGroupeDS',
        'groupeCodeOptionFiliere',
        'option_filieres_id',
        'groupePres1',
        'groupePres2',
    ];
}
