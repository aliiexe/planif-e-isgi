<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ModuleController extends Controller
{
    /**
     * Afficher une liste des ressources.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $modules = Module::all();
        return response()->json($modules);
    }

    /**
     * Stocker une nouvelle ressource dans la base de données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'codeModule' => 'required|string|unique:modules,codeModule',
            'libelleModule' => 'required|string|max:100',
            'ordreModule' => 'required|integer',
            'MHT' => 'required|numeric',
            'Coef' => 'required|integer',
            'EFM_Regional' => 'boolean',
            'option_filieres_id' => 'required|exists:option_filieres,id',
            'semestreModule' => ['required', 'string', Rule::in(['S1', 'S2', 'S3','S4','S5'])],
        ]);

        $module = Module::create($validatedData);
        return response()->json($module, 201);
    }

    /**
     * Afficher la ressource spécifiée.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $module = Module::findOrFail($id);
        return response()->json($module);
    }

    /**
     * Mettre à jour la ressource spécifiée dans la base de données.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $module = Module::findOrFail($id);

        $validatedData = $request->validate([
            'codeModule' => ['required', 'string', Rule::unique('modules')->ignore($module->id)],
            'libelleModule' => 'required|string|max:100',
            'ordreModule' => 'required|integer',
            'MHT' => 'required|numeric',
            'Coef' => 'required|integer',
            'EFM_Regional' => 'boolean',
            'option_filieres_id' => 'required|exists:option_filieres,id',
            'semestreModule' => ['required', 'string', Rule::in(['S1', 'S2', 'S3','S4','S5'])],
        ]);

        $module->update($validatedData);

        return response()->json($module, 200);
    }

    /**
     * Supprimer la ressource spécifiée de la base de données.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $module = Module::findOrFail($id);
        $module->delete();

        return response()->json(null, 204);
    }
}
