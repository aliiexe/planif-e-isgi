<?php

namespace App\Http\Controllers;

use App\Models\groupe_physique;
use App\Http\Requests\Storegroupe_physiqueRequest;
use Illuminate\Http\Request;

class GroupePhysiqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(groupe_physique::all());
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
        groupe_physique::create($request->all());
        return response()->json("created");
    }

    /**
     * Display the specified resource.
     */
    public function show(groupe_physique $groupe_physique)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(groupe_physique $groupe_physique)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, groupe_physique $groupe_physique)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(groupe_physique $groupe_physique)
    {
        //
    }
}
