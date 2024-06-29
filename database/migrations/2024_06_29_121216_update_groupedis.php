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
        Schema::table('groupe_distanciels',function(Blueprint $table){
          $table->unsignedBigInteger('groupePres1');
          $table->foreign('groupePres1')->references('id')->on('groupe_physique')->onDelete('cascade')->onUpdate('cascade');
          $table->unsignedBigInteger('groupePres2');
          $table->foreign('groupePres2')->references('id')->on('groupe_physique')->onDelete('cascade')->onUpdate('cascade');
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
