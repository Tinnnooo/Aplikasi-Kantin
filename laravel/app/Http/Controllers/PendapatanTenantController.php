<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePendapatanTenantRequest;
use App\Http\Requests\UpdatePendapatanTenantRequest;
use App\Http\Resources\PendapatanTenantCollection;
use App\Http\Resources\PendapatanTenantResource;
use App\Models\PendapatanTenant;
use Illuminate\Http\Request;
use PDF;

class PendapatanTenantController extends Controller
{
    public function allData()
    {
        return response()->json(new PendapatanTenantCollection(PendapatanTenant::all()));
    }

    public function getData($id)
    {
        $pendapatanTenant = PendapatanTenant::find($id);

        if (!$pendapatanTenant) {
            return response()->json([
                'message' => 'No Data Found',
            ], 404);
        }

        return response()->json(new PendapatanTenantResource($pendapatanTenant));
    }

    public function addData(StorePendapatanTenantRequest $request)
    {
        $data = $request->validated();

        $pendapatan = PendapatanTenant::create($data);

        return response()->json([
            'message' => "create success",
            "id" => $pendapatan->IDpendapatan
        ], 200);
    }

    public function deleteData($id)
    {
        $pendapatanTenant = PendapatanTenant::find($id);

        if (!$pendapatanTenant) {
            return response()->json([
                'message' => "Data cannot be deleted",
            ], 400);
        }

        $pendapatanTenant->delete();

        return response()->json([
            'message' => 'delete succes',
        ], 200);
    }

    public function updateData($id, UpdatePendapatanTenantRequest $request)
    {
        $data = $request->validated();

        $pendaptanTenant = PendapatanTenant::find($id);

        if (!$pendaptanTenant) {
            return response()->json([
                'message' => 'Data cannot be updated',
            ], 400);
        }

        $pendaptanTenant->update($data);

        return response()->json([
            "message" => 'update success',
        ], 200);
    }

    public function kwitansiPDF($id)
    {
        $pendapatan = PendapatanTenant::find($id);
        $pdf = PDF::loadView("kwitansiPDF", ['pendapatan' => $pendapatan]);
        return $pdf->download('kwitansi.pdf');
    }
}
