<?php

namespace App\Http\Controllers;

use App\Models\Formateur;
use App\Models\FormateurPermanent;
use Illuminate\Http\Request;

class FormateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $formateurs = Formateur::all();
        return view('formateurs.index', compact('formateurs'));
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
        $formateur = new Formateur();
        $formateur->matricule = $request->matricule;
        $formateur->password = $request->password;
        $formateur->nom = $request->nom;
        $formateur->prenom = $request->prenom;
        $formateur->numTel = $request->numTel;
        $formateur->civilite = $request->civilite;
        $formateur->Echelle = $request->Echelle;
        $formateur->Echelon = $request->Echelon;
        $formateur->Date_Recrutement = $request->Date_Recrutement;
        $formateur->Date_Depart_Retrait = $request->Date_Depart_Retrait;
        $formateur->dateNaissance = $request->dateNaissance;
        $formateur->Adresse = $request->Adresse;
        $formateur->Grade = $request->Grade;
        $formateur->Diplome = $request->Diplome;
        $formateur->situationFamiliale = $request->situationFamiliale;
        $formateur->MasseHoaraireHeb = $request->MasseHoaraireHeb;
        $formateur->Filiere = $request->Filiere;
        $formateur->Categorie = $request->Categorie;
        $formateur->idEtablissement = $request->idEtablissement;
        $formateur->save();

        if($request->input('is_permanent')) {
            $formateurPermanent = new FormateurPermanent();
            $formateurPermanent->Date_Recrutement = $request->Date_Recrutement;
            $formateurPermanent->Date_Depart_Retrait = $request->Date_Depart_Retrait;
            $formateurPermanent->Echelle = $request->Echelle;
            $formateurPermanent->Echelon = $request->Echelon;
            $formateurPermanent->Grade = $request->Grade;
            $formateurPermanent->matriculeFm = $formateur->matricule;
            $formateurPermanent->save();
        }

        return response()->json(['message' => 'Formateur created successfully', 'formateur' => $formateur], 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Formateur $formateur)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Formateur $formateur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Formateur $formateur)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Formateur $formateur)
    {
        //
    }
}
