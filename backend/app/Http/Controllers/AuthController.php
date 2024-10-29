<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {   

        Log::info('Attempting login', $request->all());

        // Walidacja danych wejściowych
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:3',
        ]);

        // Pobieranie danych logowania
        $credentials = $request->only('email', 'password');

        // Sprawdzenie poprawności danych logowania
        if (Auth::attempt($credentials)) {
            Log::info('Login successful', ['user' => Auth::user()]);
            $user = Auth::user();

            // Tworzenie tokenu dostępu
            $token = $user->createToken('auth_token')->plainTextToken;

            // Zwrot danych użytkownika wraz z tokenem
            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role, // Zwracamy rolę użytkownika
                ]
            ]);
        }

        // Obsługa błędnych danych logowania
        Log::warning('Unauthorized login attempt', $credentials);
        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
