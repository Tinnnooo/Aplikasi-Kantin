<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStokRequest;
use App\Http\Requests\UpdateStokRequest;
use App\Http\Resources\StokCollection;
use App\Http\Resources\StokResource;
use App\Models\Stok;
use Illuminate\Http\Request;

class StokController extends Controller
{
    public function allData()
    {
        return response()->json(new StokCollection(Stok::all()));
    }

    public function getData($id)
    {
        $stok = Stok::find($id);

        if (!$stok) {
            return response()->json([
                'message' => "No Stok Found",
            ], 404);
        }

        return response()->json(new StokResource($stok));
    }

    public function addData(StoreStokRequest $request)
    {
        $data = $request->validated();

        Stok::create($data);

        return response()->json([
            'message' => "create success",
        ], 200);
    }

    public function deleteData($id)
    {
        $stok = Stok::find($id);

        if (!$stok) {
            return response()->json([
                'message' => "Data cannot be deleted",
            ], 400);
        }

        $stok->delete();

        return response()->json([
            'message' => 'delete succes',
        ], 200);
    }

    public function updateData($id, UpdateStokRequest $request)
    {
        $data = $request->validated();

        $stok = Stok::find($id);

        if (!$stok) {
            return response()->json([
                'message' => 'Data cannot be updated',
            ], 400);
        }

        $stok->update($data);

        return response()->json([
            "message" => 'update success',
        ], 200);
    }
}
