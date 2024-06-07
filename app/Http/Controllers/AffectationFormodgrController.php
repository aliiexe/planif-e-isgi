<?php

namespace App\Http\Controllers;

use App\Models\affectation_formodgr;
use App\Models\Formateur;
use Illuminate\Http\Request;

class AffectationFormodgrController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        return response()->json(affectation_formodgr::all());
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
            affectation_formodgr::create($request->all());
            $formateur->save();
        }elseif($formateur->MasseHoaraireHeb==2.5){
            $formateur->MasseHoaraireHeb=0;
            affectation_formodgr::create($request->all());
            $formateur->save();
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
    public function destroy(affectation_formodgr $affectation_formodgr)
    {
        //
    }
}
