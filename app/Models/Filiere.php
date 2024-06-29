<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filiere extends Model
{
    use HasFactory;

    protected $primaryKey = 'id'; // Clé primaire par défaut est 'id'

    protected $fillable = ['codeFiliere', 'libelleFiliere'];
}
