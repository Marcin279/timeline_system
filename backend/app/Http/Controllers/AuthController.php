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
            'password' => 'required|string|min:8',
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
            'role' => 'admin',
            'remember_token' => null,
        ]);
        
        // Generowanie Personal Access Token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Rejestracja zakończona sukcesem',
            'token' => $token,  // Zwracamy token w odpowiedzi
            'role' => $user->role, // Zwracamy rolę użytkownika
        ], 201);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        
        if (!$user) {
            \Log::error('Brak zalogowanego użytkownika.');
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        \Log::info('Wylogowanie użytkownika: ' . $user->id);
    
        $user->currentAccessToken()->delete(); // Usuń aktywny token
    
        $cookie = \Cookie::forget('remembered_token'); // Usunięcie tokenu z ciasteczek
    
        return response()->json(['message' => 'Logout successful'])->withCookie($cookie);
    }
    
    public function changePassword(Request $request)
    {
        // Pobranie aktualnie zalogowanego użytkownika
        $user = Auth::user();
    
        // Walidacja danych wejściowych
        $request->validate([
            'current_password' => 'required|string|min:8',
            'new_password' => 'required|string|min:8|confirmed', // Potwierdzenie nowego hasła
        ]);
    
        // Sprawdzanie, czy stare hasło jest poprawne
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Błędne obecne hasło.'], 400);
        }
    
        // Zmiana hasła
        $user->update([
            'password' => Hash::make($request->new_password),
        ]);
    
        return response()->json(['message' => 'Hasło zostało zmienione pomyślnie.']);
    }
    
}
