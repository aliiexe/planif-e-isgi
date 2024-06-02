<?php

namespace App\Http\Controllers;

use App\Models\Filiere;
use Illuminate\Http\Request;

class FiliereController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filieres = Filiere::all();
        return response()->json($filieres);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'codeFiliere' => 'required|string|unique:filieres,codeFiliere',
            'libelleFiliere' => 'required|string|max:255',
        ]);

        $filiere = Filiere::create($validatedData);
        return response()->json($filiere, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $filiere = Filiere::findOrFail($id);
        return response()->json($filiere);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $codeFiliere)
    {
        $filiere = Filiere::where('codeFiliere', $codeFiliere)->firstOrFail();

        $validatedData = $request->validate([
            'codeFiliere' => 'sometimes|required|string|unique:filieres,codeFiliere,' . $filiere->codeFiliere,
            'libelleFiliere' => 'sometimes|required|string|max:255',
        ]);

        $filiere->fill($validatedData)->save();

        return response()->json($filiere);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $filiere = Filiere::findOrFail($id);
        $filiere->delete();

        return response()->json(null, 204);
    }
}
