<?php

namespace App\Models;
use App\Models\groupe_physique;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OptionFiliere extends Model
{
    use HasFactory;

    protected $table = 'option_filieres';

    protected $fillable = [
        'codeOptionFiliere',
        'libelleOptionFiliere',
        'annee',
        'codeFiliere',
    ];

    public function filiere()
    {
        return $this->belongsTo(Filiere::class, 'codeFiliere', 'codeFiliere');
    }
    public function modules()
    {
        return $this->hasMany(Module::class);
    }
    public function groupes(){
        return $this->hasMany(groupe_physique::class,"option_filieres_id");
    }
}
