<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiChatController extends Controller
{
    public function chat(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'messages' => ['required', 'array', 'min:1', 'max:12'],
            'messages.*.role' => ['required', 'in:user,assistant'],
            'messages.*.content' => ['required', 'string', 'max:4000'],
        ]);

        $apiKey = $this->nvidiaApiKey();

        if (blank($apiKey)) {
            return response()->json([
                'message' => 'AI assistant is not configured. Set NVIDIA_API_KEY in the environment.',
            ], 503);
        }

        $baseUrl = rtrim((string) config('services.nvidia.base_url'), '/');
        $model = (string) config('services.nvidia.chat_model');
        $messages = array_slice($validated['messages'], -10);

        $payload = [
            'model' => $model,
            'messages' => [
                [
                    'role' => 'system',
                    'content' => $this->systemPrompt(),
                ],
                ...$messages,
            ],
            'max_tokens' => 16384,
            'temperature' => 1.00,
            'top_p' => 0.95,
            'stream' => false,
        ];

        $response = Http::withToken($apiKey)
            ->acceptJson()
            ->asJson()
            ->timeout(60)
            ->post("{$baseUrl}/chat/completions", $payload);

        if ($response->failed()) {
            return response()->json([
                'message' => 'AI assistant failed to respond. Please try again later.',
            ], 502);
        }

        return response()->json([
            'message' => data_get($response->json(), 'choices.0.message.content', 'Maaf, saya belum bisa menjawab saat ini.'),
            'model' => data_get($response->json(), 'model', $model),
            'usage' => data_get($response->json(), 'usage'),
        ]);
    }

    private function systemPrompt(): string
    {
        return <<<'PROMPT'
You are the Smart Rental System AI assistant.

Explain and help users understand this web application:
- Smart Rental System is a Laravel + React vehicle rental management app.
- Public users can browse the landing page and fleet catalog.
- Staff/admin users can log in to manage dashboard stats, rental desk checkout, fleet vehicles, customers, rentals, and master data.
- Main entities are categories, vehicles, customers, and rentals.
- Vehicle statuses are Available, Rented, and Maintenance.
- Rental flow: choose an available vehicle, choose a customer, select pickup/return dates, calculate total price, checkout, then return the vehicle when finished.

Rules:
- Answer in Indonesian by default, unless the user asks for English.
- Be concise, friendly, and practical.
- If asked about app features, explain based on the system above.
- If asked for operational steps, provide clear step-by-step instructions.
- If asked about unavailable data, say you cannot see live private database records unless they are shown in the app.
- Do not invent prices, customers, rental records, or credentials.
- Do not ask for passwords, API keys, or other secrets.
PROMPT;
    }

    private function nvidiaApiKey(): string
    {
        return preg_replace('/^Bearer\s+/i', '', trim((string) config('services.nvidia.key'))) ?? '';
    }
}
