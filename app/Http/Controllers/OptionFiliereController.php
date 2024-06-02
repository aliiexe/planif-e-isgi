<?php
namespace App\Http\Controllers;

use App\Models\OptionFiliere;
use Illuminate\Http\Request;

class OptionFiliereController extends Controller
{
    public function index()
    {
        return OptionFiliere::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'codeOptionFiliere' => 'required|unique:option_filieres',
            'libelleOptionFiliere' => 'required',
            'annee' => 'required',
            'codeFiliere' => 'required|exists:filieres,codeFiliere',
        ]);

        return OptionFiliere::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'libelleOptionFiliere' => 'required',
            'annee' => 'required',
            'codeFiliere' => 'required|exists:filieres,codeFiliere',
        ]);

        $optionFiliere = OptionFiliere::findOrFail($id);
        $optionFiliere->update($request->all());

        return $optionFiliere;
    }

    public function destroy($id)
    {
        $optionFiliere = OptionFiliere::findOrFail($id);
        $optionFiliere->delete();

        return response()->noContent();
    }
}
