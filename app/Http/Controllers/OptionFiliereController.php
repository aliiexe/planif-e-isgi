<?php

namespace App\Http\Controllers;

use App\Models\OptionFiliere;
use Illuminate\Http\Request;

class OptionFiliereController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $optionsFilieres = OptionFiliere::all();

        return response()->json($optionsFilieres);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'codeOptionFiliere' => 'required',
            'libelleOptionFiliere' => 'required',
            'annee' => 'required',
            'codeFiliere' => 'required',
        ]);

        $optionFiliere = OptionFiliere::create($request->all());

        return response()->json($optionFiliere, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OptionFiliere  $optionFiliere
     * @return \Illuminate\Http\Response
     */
    public function show(OptionFiliere $optionFiliere)
    {
        return response()->json($optionFiliere);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\OptionFiliere  $optionFiliere
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OptionFiliere $optionFiliere)
    {
        $request->validate([
            'codeOptionFiliere' => 'required',
            'libelleOptionFiliere' => 'required',
            'annee' => 'required',
            'codeFiliere' => 'required',
        ]);

        $optionFiliere->update($request->all());

        return response()->json($optionFiliere, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OptionFiliere  $optionFiliere
     * @return \Illuminate\Http\Response
     */
    public function destroy(OptionFiliere $optionFiliere)
    {
        $optionFiliere->delete();

        return response()->json(null, 204);
    }
}
