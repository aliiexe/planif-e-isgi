<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filiere extends Model
{
    use HasFactory;

    protected $primaryKey = 'codeFiliere';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['codeFiliere', 'libelleFiliere'];
}

