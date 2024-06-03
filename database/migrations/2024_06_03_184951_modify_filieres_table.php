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
        Schema::table('filieres', function (Blueprint $table) {
            $table->dropPrimary('codeFiliere');
        });

        Schema::table('filieres', function (Blueprint $table) {
            $table->bigIncrements('id')->first();

            $table->unique('codeFiliere');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('filieres', function (Blueprint $table) {
            $table->dropUnique('filieres_codeFiliere_unique');

            $table->dropColumn('id');

            $table->primary('codeFiliere');
        });
    }
};
