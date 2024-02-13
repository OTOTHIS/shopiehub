<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'price',
        'image',
        'magazin_id',
        'category_id',
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function magazins()
    {
        return $this->belongsTo(magazin::class);
    }
}
