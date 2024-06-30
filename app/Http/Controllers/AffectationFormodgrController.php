<?php

namespace App\Http\Controllers;

use App\Models\Formateur;
use Illuminate\Http\Request;
use App\Models\affectation_formodgr;

class AffectationFormodgrController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        return response()->json(affectation_formodgr::with(['module','formateur','groupe'])->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
        $formateur=Formateur::where("matricule","=",$request->matriculeprof)->first();
        if($formateur->MasseHoaraireHeb>2.5){
            $formateur->MasseHoaraireHeb=$formateur->MasseHoaraireHeb/2;
            $heureprof=$formateur->MasseHoaraireHebinit;
            $countaffec=affectation_formodgr::where('matriculeprof',$request->matriculeprof)
            ->where('idModule',$request->idModule)->count()+1;
            $heure=$heureprof/$countaffec;
            affectation_formodgr::create(["semaineAnneeFormation"=>"20222023",
        "dateEFMPre"=>date('Y-m-d'),'dateEFMReal'=>date('Y-m-d'),'matriculeprof'=>$request->matriculeprof,
        "idGroupePhysique"=>$request->idGroupePhysique,"matricule"=>$request->matriculeprof,"idModule"=>$request->idModule
        ,"heureSemaine"=>$heure]);
            $formateur->save();
            affectation_formodgr::where('matriculeprof',$request->matriculeprof)
            ->where('idModule',$request->idModule)->update(["heureSemaine"=>$heure]);
        }elseif($formateur->MasseHoaraireHeb<=2.5){
            $formateur->MasseHoaraireHeb=0;
            $heureprof=$formateur->MasseHoaraireHebinit;
            $countaffec=affectation_formodgr::where('matriculeprof',$request->matriculeprof)
            ->where('idModule',$request->idModule)->count()+1;
            $heure=$heureprof/$countaffec+1;
            affectation_formodgr::create(["semaineAnneeFormation"=>"20222023",
            "dateEFMPre"=>date('Y-m-d'),'dateEFMReal'=>date('Y-m-d'),'matriculeprof'=>$request->matriculeprof,
            "idGroupePhysique"=>$request->idGroupePhysique,
             "heureSemaine"=>$heure,"matricule"=>$request->matriculeprof,"idModule"=>$request->idModule]);
            $formateur->save();
            affectation_formodgr::where('matriculeprof',$request->matriculeprof)
            ->where('idModule',$request->idModule)->update(["heureSemaine"=>$heure]);
        }else{
            return response()->json("formateur a arriver au maximum des affectations par rapport a ses masse horaire hebdomadaire",500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(affectation_formodgr $affectation_formodgr)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(affectation_formodgr $affectation_formodgr)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, affectation_formodgr $affectation_formodgr)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $affectation = affectation_formodgr::find($id);
        $affectation->delete();
        return response()->json("affectation supprimée avec succès");
    }
}
