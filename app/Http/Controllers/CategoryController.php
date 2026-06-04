<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Category::query()->withCount('vehicles')->orderBy('name')->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'alpha_dash', 'unique:categories,slug'],
            'icon' => ['required', 'string', 'max:255'],
        ]);

        $category = Category::query()->create($validated);

        return response()->json($category->loadCount('vehicles'), 201);
    }

    public function update(Request $request, Category $category): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique('categories', 'slug')->ignore($category->id),
            ],
            'icon' => ['required', 'string', 'max:255'],
        ]);

        $category->update($validated);

        return response()->json($category->loadCount('vehicles'));
    }

    public function destroy(Category $category): JsonResponse
    {
        if ($category->vehicles()->exists()) {
            return response()->json([
                'message' => 'Kategori masih digunakan oleh kendaraan.',
            ], 422);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
