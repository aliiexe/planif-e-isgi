<?php

namespace App\Models;
use App\Models\OptionFiliere;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class groupe_physique extends Model
{
    use HasFactory;
    protected $table = 'groupe_physique';
    protected $fillable=['libelleGroupe','codeGroupePhysique', 'groupeCodeOptionFiliere',
    'option_filieres_id',];
    public function affectations(){
        return $this->hasMany(affectation_formodgr::class,"idGroupePhysique");
    }
  public function optionfilliere(){
    return $this->belongsTo(OptionFiliere::class,"option_filieres_id");
  }

}
