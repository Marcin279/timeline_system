<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'first_name',  // Imię
        'last_name',   // Nazwisko
        'username',    // Nazwa użytkownika
        'email',       // Email
        'password',    // Hasło
        'role',        // Rola użytkownika
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
