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
    public static function getPaginatedProducts($perPage = 5)
    {
        return self::with('category', 'magazins')
            ->has('category')
            ->has('magazins')
            ->paginate($perPage);
    }
    public function magazins()
    {
        return $this->belongsTo(Magazin::class, 'magazin_id');
    }
}
