<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTenantRequest;
use App\Http\Requests\UpdateTenantRequest;
use App\Models\Tenant;
use Illuminate\Http\Request;
use App\Http\Resources\TenantResource;
use App\Http\Resources\TenantCollection;

class TenantController extends Controller
{
    public function allData()
    {
        return response()->json(new TenantCollection(Tenant::all()));
    }

    public function getData($id)
    {
        $tenant = Tenant::find($id);

        if (!$tenant) {
            return response()->json([
                'message' => 'No Data Found',
            ], 404);
        }

        return response()->json(new TenantResource($tenant));
    }

    public function addData(StoreTenantRequest $request)
    {
        $data = $request->validated();

        Tenant::create($data);

        return response()->json([
            'message' => "create success",
        ], 200);
    }

    public function deleteData($id)
    {
        $tenant = Tenant::find($id);

        if (!$tenant) {
            return response()->json([
                'message' => "Data cannot be deleted",
            ], 400);
        }

        $tenant->delete();

        return response()->json([
            'message' => 'delete succes',
        ], 200);
    }

    public function updateData($id, UpdateTenantRequest $request)
    {
        $data = $request->validated();

        $tenant = Tenant::find($id);

        if (!$tenant) {
            return response()->json([
                'message' => 'Data cannot be updated',
            ], 400);
        }

        $tenant->update($data);

        return response()->json([
            "message" => 'update success',
        ], 200);
    }
}
