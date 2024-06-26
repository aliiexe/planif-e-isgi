<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('semestres', function (Blueprint $table) {
            $table->id();
            $table->string('codeSemestre',2);
            $table->date('dateDebutSemestre');
            $table->date('dateFinSemestre');
            $table->string('semestreAnneeFormation', 9);
            $table->timestamps();
            $table->foreign('semestreAnneeFormation')->references('anneeFormation')->on('annee_formations');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('semestres');
    }
};
