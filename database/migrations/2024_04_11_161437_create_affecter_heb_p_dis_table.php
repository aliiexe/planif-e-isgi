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
        Schema::create('affecter_heb_p_dis', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idSemaine');
            $table->string('matricule', 100); // Limitez la longueur si possible
            $table->unsignedBigInteger('idModule');
            $table->string('codeGroupeDS', 50); // Limitez la longueur si possible
            $table->decimal('MHHD', 3, 2);
            $table->decimal('CumuleHeureDist', 10, 2);

            // Utilisez un index partiel si nécessaire
            $table->unique(['idSemaine', 'matricule', 'idModule', 'codeGroupeDS'], 'unique_affecter_heb_p_dis');

            $table->foreign('matricule')->references('matricule')->on('formateurs');
            $table->foreign('idModule')->references('id')->on('modules');
            $table->foreign('codeGroupeDS')->references('codeGroupeDS')->on('groupe_distanciels');
            $table->foreign('idSemaine')->references('id')->on('semaines');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affecter_heb_p_dis');
    }
};
?>