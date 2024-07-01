<?php

namespace App\Http\Controllers;

use App\Models\AnneeFormation;
use Illuminate\Http\Request;

class AnneeFormationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(AnneeFormation::all());
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
        $anneeFormation = new AnneeFormation();

        $dateDebut = new \DateTime($request->dateDebutAnneeFormation);
        $dateFin = new \DateTime($request->dateFinAnneeFormation);
        $dateDebut2Semestre = new \DateTime($request->dateDebut2Semestre);

        $anneeFormation->anneeFormation = $request->anneeFormation;
        $anneeFormation->dateDebutAnneeFormation = $dateDebut->format('Y-m-d H:i:s');
        $anneeFormation->dateFinAnneeFormation = $dateFin->format('Y-m-d H:i:s');
        $anneeFormation->dateDebut2Semestre = $dateDebut2Semestre->format('Y-m-d H:i:s');
        $anneeFormation->save();
        return response()->json($anneeFormation);
    }

    /**
     * Display the specified resource.
     */
    public function show(AnneeFormation $anneeFormation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AnneeFormation $anneeFormation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AnneeFormation $anneeFormation)
    {
        $anneeFormation = AnneeFormation::where('anneeFormation', $request->anneeFormation)->first();

        if($anneeFormation) {
            $anneeFormation->update($request->all());
            return response()->json($anneeFormation);
        }else {
            return response()->json(['message' => 'AnneeFormation not found'], 404);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AnneeFormation $anneeFormation)
    {
        $anneeFormation = AnneeFormation::where('anneeFormation', $anneeFormation->anneeFormation)->first();

        if($anneeFormation) {
            $anneeFormation->delete();
            return response()->json(['message' => 'AnneeFormation deleted successfully'], 200);
        }else {
            return response()->json(['message' => 'AnneeFormation not found'], 404);
        }
    }
}
