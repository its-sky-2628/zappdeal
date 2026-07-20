<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireSuperAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless($request->user()?->is_admin && $request->user()?->is_super, 403, 'Unauthorized. Only the Super Admin can perform this action.');

        return $next($request);
    }
}
