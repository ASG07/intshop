<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if ($request->user()) {
            return [
                ...parent::share($request),
                'auth.user' => [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'roles' => $request->user()->getRoleNames(), // Collection of role names
                    'permissions' => $request->user()->getAllPermissions()->pluck('name'), // Collection of permission names
                ],
                'cartCount' => $request->user()->cart?->items()->count(),
            ];
        } else {
            return [
                ...parent::share($request),
                'auth' => [
                    'user' => $request->user(),
                ],
                'cartCount' => \App\Models\Cart::firstOrCreate(['session_id' => $request->session()->getId()])->items()->count(),
            ];
        }
    }
}
