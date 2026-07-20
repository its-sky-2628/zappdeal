<?php

use App\Http\Middleware\RequireAdmin;
use App\Http\Middleware\RequireSuperAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias(['admin' => RequireAdmin::class, 'super' => RequireSuperAdmin::class]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(fn ($request) => $request->is('api/*') || $request->expectsJson());
        $exceptions->render(function (ValidationException $exception, Request $request) {
            if (! $request->is('api/mobile/v1/*')) {
                return null;
            }

            return response()->json(['success' => false, 'message' => 'Validation failed', 'data' => null, 'errors' => $exception->errors()], 422);
        });
        $exceptions->render(function (HttpExceptionInterface $exception, Request $request) {
            if (! $request->is('api/mobile/v1/*')) {
                return null;
            }

            return response()->json(['success' => false, 'message' => $exception->getMessage() ?: 'Request failed', 'data' => null, 'errors' => null], $exception->getStatusCode());
        });
    })->create();
