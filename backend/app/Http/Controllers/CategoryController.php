<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{

    public function __construct()
    {
        $this->middleware('admin')->only(['store', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     * GET /categories
     */
    public function index()
    {
        // Pobierz wszystkie kategorie z bazy danych
        try {
            $categories = Category::all();
            Log::info($categories);
            // Zwróć widok z listą kategorii
            return response()->json($categories);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }

    // /**
    //  * Show the form for creating a new resource.
    //  * GET /categories/create
    //  */
    // public function create()
    // {
 
    // }

    /**
     * Store a newly created resource in storage.
     * POST /categories
     */
    public function store(Request $request)
    {
        // Walidacja danych wejściowych
        $validated = $request->validate([
            'name' => 'required|max:255',
            'color' => 'nullable|string|max:7', // kolor w formacie hex
            'icon' => 'nullable|string|max:255', // np. klasa ikony z font-awesome
        ]);

        // Utworzenie nowej kategorii
        $category = Category::create($validated);

        // Zwrócenie odpowiedzi JSON z nową kategorią
        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Pobieranie kategorii lub zwrócenie błędu 404, jeśli nie istnieje
        $category = Category::findOrFail($id);

        // Zwrócenie danych kategorii w formacie JSON
        return response()->json($category, 200);
    }

    // /**      
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(string $id)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Walidacja danych wejściowych
        $validated = $request->validate([
            'name' => 'required|max|255',
            'color' => 'nullable|string|max:7',
            'icon' => 'nullable|string|max:255',
        ]);

        // Zaktualizowanie istniejącej kategorii
        $category = Category::findOrFail($id);
        $category ->update($validated);

        // Zwrócenie zaktualizowanych danych kategorii
        return response()->json($category, 200);
    }

    /**
     * Remove the specified resource from storage.
     * DELETE /categories/{id}
     */
    public function destroy(string $id)
    {
        // Pobranie kategorii lub zwrócenie błędu 404
        $category = Category::findOrFail($id);

        // Usunięcie kategorii
        $category->delete();

        // Zwrócenie pustej odpowiedzi z kodem 204
        return response()->json(null, 204);
    }
}
