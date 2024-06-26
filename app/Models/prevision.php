<?php

namespace App\Models;

use App\Models\affectation_formodgr;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Prevision extends Model
{
    use HasFactory;
    protected $table="previsions";
    protected $fillable=[
        "affectationid",
        "datedebutmodule",
        "datefinmodule",
        "datecc1",
        "datecc2",
        "datecc3",
        "dateefm"
    ];
        
    public function affectation(){
        return $this->belongsTo(affectation_formodgr::class,"affectationid");
    }

}
