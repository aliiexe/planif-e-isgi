<?php

namespace App\Http\Controllers;

use DateTime;
use DateInterval;
use App\Models\Module;
use App\Models\prevision;

use Illuminate\Http\Request;
use App\Models\AnneeFormation;
use App\Models\groupe_physique;
use Illuminate\Support\Facades\DB;
use App\Models\affectation_formodgr;

class previsionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(prevision::all());
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
        $groupe = groupe_physique::where('id', $request->idGroupePhysique)->get();
        $affectation = affectation_formodgr::where('idGroupePhysique', $request->idGroupePhysique)->get();
        $annee = AnneeFormation::where('anneeFormation', $request->anneeFormation)->first();
        $maxOrdreModule = Module::max('ordreModule');
        foreach ($affectation as $affect) {
            $id = $affect->id;
            $heuresSemaine = $affect->heureSemaine;
            $dateDebutAnnee = new DateTime($annee->dateDebutAnneeFormation);
            $dateFinAnnee = new DateTime($annee->dateFinAnneeFormation);
            $dateDebut2Semestre = new DateTime($annee->dateDebut2Semestre);
            $dateDebutFirstModule = $dateDebutAnnee;
            $dateDebutModule = null;
            $var = 2;
            while ($var < $maxOrdreModule) {
                $modulesArray = $affect->module()->where('ordreModule', '=', $var)->orderBy('MHT', 'ASC')->get();
                foreach ($modulesArray as $module) {
                    $MHTmodule = $module->MHT;
                    $ordreModule = $module->ordreModule;
                    $NbrSeanceSemaine = $MHTmodule / $heuresSemaine;
                    $dateDebutModule = $dateDebutFirstModule;
                    $NbrSeanceSemaine = $MHTmodule / $heuresSemaine;
                    $dateDebutModule = $dateDebutFirstModule;
                    $dateFinModule =$dateDebutModule;
                    $dateCC1 = $dateDebutModule;
                    $prevision=new prevision([
                        "affectationid" => $id,
                   
                    ]);
                    $prevision->save();
              // Import DB facade if not already imported

                    $prevision1=prevision::find($prevision->id);
                    $prevision1->update([
                        "datedebutmodule" => $dateDebutFirstModule,
                        "datefinmodule" => DB::raw("DATE_ADD('$dateFinModule', INTERVAL $NbrSeanceSemaine WEEK)")
                    ]);
                    
                    $heure = 0;
                    while ($heure <= 25) {
                        if(prevision::where('affectationid', $id)->whereNull("datecc1")){
                            prevision::where('affectationid', $id)->update([
                                'datecc1' => DB::raw("$dateDebutModule")
                            ]);
                        }
                        prevision::where('affectationid', $id)->update([
                            'datecc1' => DB::raw("DATE_ADD(datecc2, INTERVAL 1 WEEK)")
                        ]);
                        $heure += $affect->heureAffectationParSemaine;
                    }
                    $dateCC1 = $dateCC1->format('Y-m-d');
                    $dateCC2 = new DateTime($dateCC1);
                    $heure = 0;
                    while ($heure <= 25) {
                        if(prevision::where('affectationid', $id)->whereNull("datecc2")){
                            prevision::where('affectationid', $id)->update([
                                'datecc1' => DB::raw("datecc1")
                            ]);
                        }
                        prevision::where('affectationid', $id)->update([
                            'datecc1' => DB::raw("DATE_ADD(datecc2, INTERVAL 1 WEEK)")
                        ]);
                        $heure += $affect->heureAffectationParSemaine;
                    }
                    $dateCC2 = $dateCC2->format('Y-m-d');
                    $dateCC3 = new DateTime($dateCC2);
                    if ($dateCC3 <= $dateFinModule) {
                        $heure = 0;
                        if(prevision::where('affectationid', $id)->whereNull("datecc3")){
                            prevision::where('affectationid', $id)->update([
                                'datecc1' => DB::raw("datecc2")
                            ]);
                        }
                        prevision::where('affectationid', $id)->update([
                            'datecc1' => DB::raw("DATE_ADD(datecc3, INTERVAL 1 WEEK)")
                        ]);
                        $heure += $affect->heureAffectationParSemaine;
                    }
              
                    $dateDebutFirstModule = $dateFinModule;
                }
                $var++;
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(prevision $prevision)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(prevision $prevision)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, prevision $prevision)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(prevision $prevision)
    {
        //
    }
}
