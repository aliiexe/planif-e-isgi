<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
    Schema::table('groupe_physique',function(Blueprint $table){
        $table->string('groupeCodeOptionFiliere');
        $table->unsignedBigInteger('option_filieres_id');
        $table->foreign('option_filieres_id')->references('id')->on('option_filieres')->onDelete('cascade')->onUpdate('cascade');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
