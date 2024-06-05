<?php

namespace App\Http\Controllers;

use App\Models\groupe_physique;
use App\Http\Requests\Storegroupe_physiqueRequest;
use Illuminate\Http\Request;
use App\Models\groupe_distanciel;
use App\Models\groupe_presentiel;
class GroupePhysiqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(groupe_physique::all());
    }
    public function choose(Request $request){
        if($request->type=="presentiel"){
            return response()->json(groupe_presentiel::all());
        }else{
            return response()->json(groupe_distanciel::all());
        }
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
        if($request->typegroupe=="distanciel"){
            $data = $request->only([
                'codeGroupeDS',
                'libelleGroupeDS',
                'groupeCodeOptionFiliere',
                'option_filieres_id',
            ]);
            $groupe_dis=new groupe_distanciel($data);
            $groupe_dis->save();
        }else{ 
            $data = $request->only([
                'codeGroupePR',
                'libelleGroupePR',
                'groupeCodeOptionFiliere',
                'option_filieres_id',
            ]);
            $groupe_pre=new groupe_presentiel($data);
            $groupe_pre->save();
            
            groupe_physique::create(["libelleGroupe"=>$request->libelleGroupePR,"codeGroupePhysique"=>$request->codeGroupePR]);
        }
        
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
    public function update(Request $request, $id)
    {
        
        $groupe_physique=groupe_physique::find($id);
        if ($groupe_physique) {
            $groupe_physique->update($request->all());
            return response()->json(['message' => 'groupe updated successfully', 'groupe' => $groupe_physique], 200);
        } else {
            return response()->json(['message' => 'groupe not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $groupe_physique=groupe_physique::find($id);
        $groupe_physique->delete();
        return response()->json("dlee");
    }
}
