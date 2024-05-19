<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('affecter_realjour_d_s', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idSemaine');
            $table->unsignedBigInteger('idJour');
            $table->unsignedBigInteger('idSalle');
            $table->unsignedInteger('idSeance');
            $table->string('matricule', 100); // Limitez la longueur si possible
            $table->unsignedBigInteger('idModule');
            $table->string('codeGroupeDS', 50); // Limitez la longueur si possible
            $table->decimal('MHRD', 2, 2);

            // Définir les clés étrangères
            $table->foreign('idJour')->references('id')->on('jours');
            $table->foreign('matricule')->references('matricule')->on('formateurs');
            $table->foreign('idSeance')->references('ordreSeance')->on('seances');
            $table->foreign('idModule')->references('id')->on('modules');
            $table->foreign('codeGroupeDS')->references('codeGroupeDS')->on('groupe_distanciels');
            $table->foreign('idSalle')->references('id')->on('salles');
            $table->foreign('idSemaine')->references('id')->on('semaines');
            $table->timestamps();
        });

        // Ajouter l'index unique avec des longueurs de préfixe
        DB::statement('ALTER TABLE affecter_realjour_d_s ADD UNIQUE unique_affecter_realjour_d_s (idSemaine, idJour, idSalle, idSeance, matricule(50), idModule, codeGroupeDS(50));');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affecter_realjour_d_s');
    }
};
