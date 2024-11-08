<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

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
                    'username' => $user->username,
                    'email' => $user->email,
                    'role' => $user->role, // Zwracamy rolę użytkownika
                ]
            ]);
        }

        // Obsługa błędnych danych logowania
        Log::warning('Unauthorized login attempt', $credentials);
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'remember_token' => Str::random(10),
        ]);

        return response()->json(['message' => 'Rejestracja zakończona sukcesem'], 201);
    }

    public function logout(Request $request)
    {
        // Usunięcie tokenu autoryzacyjnego użytkownika
        $request->user()->currentAccessToken()->delete();

        // Zwrócenie odpowiedzi
        return response()->json(['message' => 'Logout successful'], 200);
    }
}
