<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePenjualanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'IDproduk' => "nullable",
            'tanggal' => "nullable",
            'qty' => "nullable",
            'hargajual' => "nullable",
            'total' => "nullable",
            'dibayar' => "nullable",
            'kembali' => "nullable",
        ];
    }
}
