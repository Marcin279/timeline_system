<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Migrations\Migrator;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class CreateEventsCategoriesUsersTables extends Migration 
{
    /**
     * Run the migrations
     * 
     * @return void
     */

    public function up()
    {
        if (!Schema::hasTable('categories')) {
            Schema::create('categories', function(Blueprint $table) {
                $table->id(); // Auto-incrementing primary key
                $table->string('name'); // Column for category name
                $table->string('color'); // Column for color
                $table->string('icon'); // Column for icon
                $table->timestamps(); // Columns for created_at and updated_at
            });
        }

        if (!Schema::hasTable('events')) {
            Schema::create('events', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('category_id')->nullable();
                $table->date('start_date');
                $table->date('end_date');
                $table->text('descripion')->nullable();
                $table->string('image')->nullable();
                $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->string('username')->unique();
                $table->string('password_hash');
                $table->enum('role', ['admin', 'reader'])->default('reader');
                $table->timestamps();
            });
        }

    }

    public function down() {
        Schema::dropIfExists('events');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('users');
    }
}