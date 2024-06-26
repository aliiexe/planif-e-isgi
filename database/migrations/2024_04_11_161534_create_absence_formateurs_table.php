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
        Schema::create('absence_formateurs', function (Blueprint $table) {
            $table->id();
            $table->UnsignedBigInteger('idAffectJrSnPr');
            $table->UnsignedBigInteger('idAffectJrSnDs');
            $table->decimal('HeuresAbsentees',2,2);
            $table->UnsignedBigInteger('idJustificationAFM');
            $table->foreign('idJustificationAFM')->references('id')->on('justification_abs_f_r_m_s');
            $table->foreign('idAffectJrSnPr')->references('id')->on('affecter_realjour_p_r');
            $table->foreign('idAffectJrSnDs')->references('id')->on('affecter_realjour_d_s');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absence_formateurs');
    }
};
