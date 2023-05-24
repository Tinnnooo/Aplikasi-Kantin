<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PendapatanTenantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "IDpendapatan" => $this->IDpendapatan,
            "tanggal" => $this->tanggal,
            "tenant" => $this->tenant,
            "totalPendapatan" => $this->totalPendapatan,
            "setoranTenant" => $this->setoranTenant,
        ];
    }
}
