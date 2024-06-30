<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Filiere;
use App\Models\OptionFiliere;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Support\Facades\Log;

class OptionFiliereImportController extends Controller
{
    public function import(Request $request)
    {
        // Valider le fichier téléchargé
        $request->validate([
            'file' => 'required|file',
        ]);

        // Obtenir le fichier de la requête
        $file = $request->file('file');

        // Vérifier l'extension du fichier pour déterminer le format
        $extension = $file->getClientOriginalExtension();

        // Définir les extensions autorisées pour les fichiers Excel
        $allowedExtensions = ['xlsx', 'xls', 'csv'];

        // Vérifier si l'extension est autorisée
        if (!in_array($extension, $allowedExtensions)) {
            return redirect()->back()->with('error', 'Format de fichier non pris en charge. Les formats autorisés sont xlsx, xls et csv.');
        }

        try {
            // Charger la feuille de calcul depuis le fichier téléchargé
            $spreadsheet = IOFactory::load($file);

            // Obtenir la feuille active
            $sheet = $spreadsheet->getActiveSheet();

            // Obtenir les indices de la plus haute ligne et de la plus haute colonne
            $highestRow = $sheet->getHighestRow();

            // Itérer sur chaque ligne (en commençant par la deuxième ligne, en supposant que la première ligne contienne des en-têtes)
            for ($row = 2; $row <= $highestRow; $row++) {
                // Obtenir les valeurs de cellule pour chaque colonne
                $rowData = [
                    'codeOptionFiliere' => $sheet->getCell('A' . $row)->getValue(),
                    'libelleOptionFiliere' => $sheet->getCell('B' . $row)->getValue(),
                    'annee' => $sheet->getCell('C' . $row)->getValue(),
                    'libelleFiliere' => $sheet->getCell('D' . $row)->getValue(),
                ];

                // Journaliser les données de la ligne actuelle
                Log::info('Traitement de la ligne : ' . json_encode($rowData));

                // Recherche du code de la filière en fonction du libellé
                $filiere = Filiere::where('libelleFiliere', $rowData['libelleFiliere'])->first();

                // Vérification si la fili��re existe
                if ($filiere) {
                    // Créer une nouvelle instance d'OptionFiliere et la sauvegarder dans la base de données
                    OptionFiliere::create([
                        'codeOptionFiliere' => $rowData['codeOptionFiliere'],
                        'libelleOptionFiliere' => $rowData['libelleOptionFiliere'],
                        'annee' => $rowData['annee'],
                        'codeFiliere' => $filiere->codeFiliere,
                    ]);
                } else {
                    // Journaliser le cas où la filière n'est pas trouvée
                    Log::warning('Filière non trouvée pour le libellé : ' . $rowData['libelleFiliere']);
                }
            }

            // Rediriger avec un message de succès
            return redirect()->back()->with('success', 'Importation terminée avec succès !');
        } catch (\Exception $e) {
            // Journaliser l'erreur
            Log::error('Erreur lors de l\'importation : ' . $e->getMessage());

            // Rediriger avec un message d'erreur si l'importation échoue
            return redirect()->back()->with('error', 'Une erreur s\'est produite lors de l\'importation du fichier : ' . $e->getMessage());
        }
    }
}
