<?php

return [
    'user' => [
        'name' => env('ADMIN_USER_NAME', 'Administrator'),
        'email' => env('ADMIN_USER_EMAIL'),
        'password' => env('ADMIN_USER_PASSWORD'),
        'role' => env('ADMIN_USER_ROLE', 'admin'),
    ],
];
