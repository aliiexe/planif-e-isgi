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
        Schema::create('option_filieres', function (Blueprint $table) {
            $table->id();
            $table->string('codeOptionFiliere');
            $table->string('libelleOptionFiliere');
            $table->enum('annee', ['1A', '2A', '3A']);
            $table->string('codeFiliere');
            $table->timestamps();
            $table->foreign('codeFiliere')
                ->references('id')
                ->on('filieres')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->unique(['codeOptionFiliere', 'annee']); // Contrainte unique composite
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('option_filieres');
    }
};
