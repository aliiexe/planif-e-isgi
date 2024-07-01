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
        Schema::create('previsions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("affecationid");
            $table->foreign('affectationid')->references('id')->on('affectations_FORMODGR')->onDelete('cascade')
            ->onUpdate('cascade');
            $table->date("datedebutmodule")->nullable();
            $table->date('datefinmodule')->nullable();
            $table->date('datecc1')->nullable();
            $table->date('datecc2')->nullable();
            $table->date('datecc3')->nullable();
            $table->date('dateefm')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('previsions');
    }
};
