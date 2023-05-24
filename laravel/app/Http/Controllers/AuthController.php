<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = [
            "username" => $request->username,
            "password" => $request->password,
        ];

        if (!Auth::attempt($data)) {
            return response()->json([
                'message' => 'invalid login',
            ], 401);
        };

        $user = Auth::user();
        $token = md5($user->username);
        $user->remember_token = $token;
        $user->save();

        return response()->json([
            'token' => $token,
            'role' => $user->role
        ]);
    }

    public function logout()
    {
        $user = Auth::user();
        $user->remember_token = null;
        $user->save();

        Auth::logout();
        return response()->json([
            'message' => 'logout success',
        ], 200);
    }

    public function me()
    {
        return response()->json(new UserResource(auth()->user()));
    }
}
