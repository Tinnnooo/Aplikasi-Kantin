<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PendapatanTenantController;
use App\Http\Controllers\PenjualanController;
use App\Http\Controllers\StokController;
use App\Http\Controllers\TenantController;
use App\Http\Middleware\AuthenticateToken;
use App\Http\Middleware\OnlyAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(AuthenticateToken::class)->prefix('v1')->group(function () {

    // strukPDF
    Route::get('/penjualan/struk/{id}', [PenjualanController::class, 'strukPDF']);
    // kwitansi PDf
    Route::get('/pendapatantenant/kwitansi/{id}', [PendapatanTenantController::class, 'kwitansiPDF']);

    // get user
    Route::get('/me', [AuthController::class, 'me']);

    // stok
    Route::get('/stok/{id}', [StokController::class, 'getData']);
    Route::post('/stok', [StokController::class, 'addData']);
    Route::get('/stok', [StokController::class, 'allData']);

    // penjualan
    Route::get('/penjualan', [PenjualanController::class, 'allData']);
    Route::get('/penjualan/{id}', [PenjualanController::class, 'getData']);
    Route::post('/penjualan', [PenjualanController::class, 'addData']);


    // tenant
    Route::get('/tenant', [TenantController::class, 'allData']);
    Route::get('/tenant/{id}', [TenantController::class, 'getData']);

    // pendapatan tenant
    Route::get('/pendapatantenant', [PendapatanTenantController::class, 'allData']);
    Route::get('/pendapatantenant/{id}', [PendapatanTenantController::class, 'getData']);
    Route::post('/pendapatantenant', [PendapatanTenantController::class, 'addData']);

    // Admin only
    Route::middleware(OnlyAdmin::class)->group(function () {
        // Stok
        Route::delete('/stok/{id}', [StokController::class, 'deleteData']);
        Route::post('/stok/{id}', [StokController::class, 'updateData']);

        // Penjualan
        Route::delete('/penjualan/{id}', [PenjualanController::class, 'deleteData']);
        Route::post('/penjualan/{id}', [PenjualanController::class, 'updateData']);

        // Pendapatan tenant
        Route::delete('/pendapatantenant/{id}', [PendapatanTenantController::class, 'deleteData']);
        Route::post('/pendapatantenant/{id}', [PendapatanTenantController::class, 'updateData']);

        // Tenant
        Route::post('/tenant', [TenantController::class, 'addData']);
        Route::delete('/tenant/{id}', [TenantController::class, 'deleteData']);
        Route::post('/tenant/{id}', [TenantController::class, 'updateData']);
    });
});

Route::group(['prefix' => 'v1/auth'], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/logout', [AuthController::class, 'logout'])->middleware(AuthenticateToken::class);
});
