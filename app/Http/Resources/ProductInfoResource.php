<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductInfoResource extends JsonResource
{

    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'stock' => $this->stock,
            'image' => $this->image_path && !(str_starts_with($this->image_path, 'http')) ? Storage::url($this->image_path) : '',
            'createdBy' => $this->createdBy?->name ?? 'Unknown',
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
