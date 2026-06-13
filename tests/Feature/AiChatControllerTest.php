<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class AiChatControllerTest extends TestCase
{
    public function test_it_requires_nvidia_api_key(): void
    {
        config()->set('services.nvidia.key', null);

        $response = $this->postJson('/api/ai-chat', [
            'messages' => [
                ['role' => 'user', 'content' => 'Apa itu Smart Rental?'],
            ],
        ]);

        $response->assertStatus(503);
    }

    public function test_it_sends_non_streaming_chat_completion_request_to_nvidia(): void
    {
        config()->set('services.nvidia.key', 'test-key');
        config()->set('services.nvidia.base_url', 'https://integrate.api.nvidia.com/v1');
        config()->set('services.nvidia.chat_model', 'stepfun-ai/step-3.7-flash');

        Http::fake([
            'https://integrate.api.nvidia.com/v1/chat/completions' => Http::response([
                'model' => 'stepfun-ai/step-3.7-flash',
                'choices' => [
                    [
                        'message' => [
                            'role' => 'assistant',
                            'content' => 'Smart Rental adalah sistem manajemen rental kendaraan.',
                        ],
                    ],
                ],
                'usage' => ['total_tokens' => 32],
            ]),
        ]);

        $response = $this->postJson('/api/ai-chat', [
            'messages' => [
                ['role' => 'user', 'content' => 'Jelaskan sistem ini.'],
            ],
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('message', 'Smart Rental adalah sistem manajemen rental kendaraan.')
            ->assertJsonPath('model', 'stepfun-ai/step-3.7-flash');

        Http::assertSent(function ($request) {
            $payload = $request->data();

            return $request->url() === 'https://integrate.api.nvidia.com/v1/chat/completions'
                && $request->hasHeader('Authorization', 'Bearer test-key')
                && $request->hasHeader('Accept', 'application/json')
                && $payload['model'] === 'stepfun-ai/step-3.7-flash'
                && $payload['stream'] === false
                && $payload['messages'][0]['role'] === 'system'
                && str_contains($payload['messages'][0]['content'], 'Smart Rental System')
                && $payload['messages'][1]['role'] === 'user';
        });
    }
}
