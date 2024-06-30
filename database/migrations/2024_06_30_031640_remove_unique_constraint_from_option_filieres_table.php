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
        Schema::table('option_filieres', function (Blueprint $table) {
            $table->dropUnique(['codeOptionFiliere', 'annee']); // Supprimer la contrainte unique composite
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('option_filieres', function (Blueprint $table) {
            $table->unique(['codeOptionFiliere', 'annee']); // Restaurer la contrainte unique composite
        });
    }
};
