<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class groupe_presentiel extends Model
{
    use HasFactory;
    protected $fillable = [
        'codeGroupePR',
        'libelleGroupePR',
        'groupeCodeOptionFiliere',
        'option_filieres_id',
    ];
}
