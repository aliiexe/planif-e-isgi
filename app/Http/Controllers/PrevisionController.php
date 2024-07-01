<?php

namespace App\Http\Controllers;

use App\Models\prevision;
use Illuminate\Http\Request;
use App\Models\AnneeFormation;
use App\Models\affectation_formodgr;
use App\Models\groupe_physique;
use App\Models\Module;
use DateInterval;
use DateTime;
use Illuminate\Support\Facades\Log;

class PrevisionController extends Controller
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
        $dateDebutFirstModule = clone $dateDebutAnnee;
        $var = 2;

        // Initialize preceding module's dateFinModule
        $precedingDateFinModule = null;

        while ($var <= $maxOrdreModule) {
            $modulesArray = $affect->module()->where('ordreModule', $var)->orderBy('MHT', 'ASC')->get();

            foreach ($modulesArray as $index => $module) {
                $MHTmodule = $module->MHT;
                $NbrSeanceSemaine = (int)($MHTmodule / $heuresSemaine);

                // Calculate the dateDebutModule
                if ($index == 0 && $module->ordreModule == $var) {
                    $dateDebutModule = clone $dateDebutAnnee;
                } else {
                    $dateDebutModule = clone $precedingDateFinModule;
                }

                // Calculate the dateFinModule
                $dateFinModule = clone $dateDebutFirstModule;
                $dateFinModule->modify('+' . ($NbrSeanceSemaine * 7) . ' days');

                // Create prevision entry
                prevision::create([
                    "affectationid" => $id,
                    "datedebutmodule" => $dateDebutFirstModule->format('Y-m-d'),
                    "datefinmodule" => $dateFinModule->format('Y-m-d')
                ]);

                // Handle CC dates
                $dateCC1 = clone $dateDebutModule;
                $heure = 0;
                while ($heure <= 25) {
                    $dateCC1->modify('+1 week');
                    $heure += $heuresSemaine;
                }
                prevision::where('affectationid', $id)->update([
                    "datecc1" => $dateCC1->format('Y-m-d')
                ]);

                $dateCC2 = clone $dateCC1;
                $heure = 0;
                while ($heure <= 25) {
                    $dateCC2->modify('+1 week');
                    $heure += $heuresSemaine;
                }
                prevision::where('affectationid', $id)->update([
                    "datecc2" => $dateCC2->format('Y-m-d')
                ]);

                $dateCC3 = clone $dateCC2;
                if ($dateCC3 <= $dateFinModule) {
                    $heure = 0;
                    while ($heure <= 25) {
                        $dateCC3->modify('+1 week');
                        $heure += $heuresSemaine;
                    }
                    prevision::where('affectationid', $id)->update([
                        "datecc3" => $dateCC3->format('Y-m-d')
                    ]);
                }

                // Calculate and update dateEFM (Examen Fin Module)
                $dateEFM = clone $dateFinModule;
                $dateEFM->modify('+1 week');
                $dateEFMFormatted = $dateEFM->format('Y-m-d');

                prevision::where('affectationid', $id)->update([
                    "dateEFM" => $dateEFMFormatted
                ]);

                // Update precedingDateFinModule for the next iteration
                $precedingDateFinModule = clone $dateFinModule;

                // Debugging statements to check date values
                Log::debug("ID: $id, dateDebutModule: " . $dateDebutModule->format('Y-m-d'));
                Log::debug("ID: $id, dateFinModule: " . $dateFinModule->format('Y-m-d'));
                Log::debug("ID: $id, dateCC1: " . $dateCC1->format('Y-m-d'));
                Log::debug("ID: $id, dateCC2: " . $dateCC2->format('Y-m-d'));
                Log::debug("ID: $id, dateCC3: " . $dateCC3->format('Y-m-d'));
                Log::debug("ID: $id, dateEFM: " . $dateEFMFormatted);
            }
            $dateDebutFirstModule = $dateFinModule;
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
