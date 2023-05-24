<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PenjualanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->IDTrans,
            "produk" => $this->produk,
            "tanggal" => $this->tanggal,
            "qty" => $this->qty,
            "hargajual" => $this->hargajual,
            "total" => $this->total,
            "dibayar" => $this->dibayar,
            "kembali" => $this->kembali,
        ];
    }
}
