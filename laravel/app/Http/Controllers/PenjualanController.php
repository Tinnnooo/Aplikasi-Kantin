<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePenjualanRequest;
use App\Http\Requests\UpdatePenjualanRequest;
use App\Http\Resources\PenjualanCollection;
use App\Http\Resources\PenjualanResource;
use App\Models\Penjualan;
use Illuminate\Http\Request;
use PDF;

class PenjualanController extends Controller
{
    public function allData()
    {
        return response()->json(new PenjualanCollection(Penjualan::all()));
    }

    public function getData($id)
    {
        $penjualan = Penjualan::find($id);

        if (!$penjualan) {
            return response()->json([
                'message' => 'No Data Found',
            ], 404);
        }

        return response()->json(new PenjualanResource($penjualan));
    }

    public function addData(StorePenjualanRequest $request)
    {
        $data = $request->validated();

        $penjualan = Penjualan::create($data);

        return response()->json([
            'message' => "create success",
            "id" => $penjualan->IDTrans,
        ], 200);
    }

    public function deleteData($id)
    {
        $penjualan = Penjualan::find($id);

        if (!$penjualan) {
            return response()->json([
                'message' => 'Data cannot be deleted',
            ], 400);
        }

        $penjualan->delete();

        return response()->json([
            'message' => 'delete success',
        ], 200);
    }

    public function updateData($id, UpdatePenjualanRequest $request)
    {
        $data = $request->validated();
        $penjualan = Penjualan::find($id);

        if (!$penjualan) {
            return response()->json([
                'message' => 'Data cannot be updated',
            ], 400);
        }

        $penjualan->update($data);

        return response()->json([
            "message" => 'update success',
        ], 200);
    }

    public function strukPDF($id)
    {
        $penjualan = Penjualan::find($id);

        $pdf = PDF::loadView('strukPDF', ["penjualan" => $penjualan]);

        return $pdf->download('struk.pdf');
    }
}
