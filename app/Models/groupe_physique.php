<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class groupe_physique extends Model
{
    use HasFactory;
    protected $table = 'groupe_physique';
    protected $fillable=['libelleGroupe','codeGroupePhysique'];
}
